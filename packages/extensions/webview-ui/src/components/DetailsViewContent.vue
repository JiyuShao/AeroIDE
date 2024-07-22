<script setup lang="ts">
import { View } from "../enums";
import { computed } from "vue";
import { useStore } from "../lib/store";
import ArrowLeftIcon from "./ArrowLeftIcon.vue";
import { useQuery } from "vue-query";
import { formatSize, withUpdate } from "../lib/utils";
import { API } from "../lib/api";
import coerce from "semver/functions/coerce";
import VSelect from "./VSelect.vue";
import minSatisfying from "semver/ranges/min-satisfying";

const store = useStore();
const pkg = computed(() =>
  store.getters.getPackageByName(store.state.selectedPackage)
);
const name = computed(() => pkg.value?.name);
const version = computed(() => pkg.value?.version);
const navigateTo = (view: View) => {
  store.commit("setSelectedPackage", null);
  store.commit("navigate", view);
};
const enableDetailsQuery = computed(() => !!name.value);
const enableExportsQuery = computed(() => !!name.value && !!version.value);
const { data: packageExports, isLoading: isLoadingExports } = useQuery(
  ["exports", name, version],
  () => API.getExportSizes(pkg?.value.name, pkg?.value.version),
  { enabled: enableExportsQuery, retry: false }
);
const { data: details, isLoading: isLoadingDetails } = useQuery(
  ["details", name],
  () => API.getPackageDetails(pkg.value.name),
  { enabled: enableDetailsQuery, retry: false }
);
const versions = computed(() =>
  Object.entries(details.value?.versions || {})
    .sort((a, b) => {
      const aVersion = coerce(a[0]);
      const bVersion = coerce(b[0]);
      if (!aVersion || !bVersion) {
        return a[0].localeCompare(b[0]);
      }
      return bVersion.compare(aVersion);
    })
    .map((item) => item[0])
);
const coercedVersion = computed(() => {
  return (
    minSatisfying(versions.value, pkg?.value.version) ||
    coerce(pkg?.value.version)?.raw ||
    "0.0.0"
  );
  // const version = pkg.value?.version;
  // if (!version) return "0.0.0";
  // const coerced = coerce(version, { loose: true })?.raw;
  // if (!coerced) return "0.0.0";
  // return coerced;
});
const handleVersionChange = (nextVersion: string) => {
  if (!nextVersion) return;
  withUpdate(name.value, async () => {
    await API.changeVersion({
      name: name.value,
      version: nextVersion,
      originalVersion: version.value,
    });
    store.commit("changeVersion", {
      item: pkg.value,
      version: nextVersion,
    });
  });
};
</script>

<template>
  <div v-if="pkg" class="pb-3">
    <div
      v-if="store.state.view === View.Details"
      class="grid grid-cols-[32px_1fr_32px] justify-items-center items-center px-3 border-b border-b-[color:var(--vscode-panel-border)] sticky top-0 bg-[color:var(--vscode-sideBar-background)] z-30"
    >
      <a
        class="flex items-center h-8 w-8"
        @click="navigateTo(View.Manage)"
        role="button"
        aria-label="Go back"
      >
        <ArrowLeftIcon />
      </a>
      <div class="uppercase tracking-wider text-xs font-bold">Details</div>
    </div>
    <div class="grid gap-y-2 px-3 mt-3 grid-cols-2">
      <div class="col-span-2">
        <div class="title">Name</div>
        <div>{{ pkg.name }}</div>
      </div>
      <template v-if="!isLoadingDetails && details">
        <div class="col-span-2" v-if="details.repository?.url">
          <div class="title">Repository</div>
          <a :href="details.repository.url">{{ details.repository.url }}</a>
        </div>
        <div class="col-span-2" v-if="details.homepage">
          <div class="title">Homepage</div>
          <a :href="details.homepage"> {{ details.homepage }}</a>
        </div>
        <div>
          <div class="title">License</div>
          <div>{{ details.license }}</div>
        </div>
        <div>
          <div class="title">Downloads(30d)</div>
          <div>{{ details.humanDownloadsLast30Days }}</div>
        </div>
        <div>
          <div class="title">Current Version</div>
          <div>{{ pkg.version }}</div>
        </div>
        <div>
          <div class="title">Latest Version</div>
          <div>{{ details.version }}</div>
        </div>
        <div>
          <div class="title">Created</div>
          <div>{{ new Date(details.created).toLocaleDateString() }}</div>
        </div>
        <div>
          <div class="title">Updated</div>
          <div>{{ new Date(details.modified).toLocaleDateString() }}</div>
        </div>
      </template>
    </div>

    <div class="px-3 mt-4">
      <div class="title">Change version</div>
      <VSelect
        class="mt-1"
        :model-value="coercedVersion"
        :options="versions"
        placeholder="Select version"
        @update:model-value="handleVersionChange"
      />
    </div>

    <div
      v-if="!isLoadingExports && packageExports?.assets?.length"
      class="px-3 mt-4"
    >
      <h2 class="title mb-2">Exports</h2>
      <div
        v-for="asset in packageExports.assets"
        :key="asset.name"
        class="grid grid-cols-[1fr_auto] text-[13px] leading-[20px]"
      >
        <div class="truncate">{{ asset.name }}</div>
        <div>{{ formatSize(asset.size) }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  @apply text-xs font-medium tracking-wide opacity-75;
}
</style>
