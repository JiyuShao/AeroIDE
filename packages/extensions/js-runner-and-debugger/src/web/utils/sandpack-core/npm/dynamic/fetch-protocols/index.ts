/**
 * Copyright 2024 Jiyu Shao
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Modifications:
 * - remove GistFetcher/CsbFetcher/JSDelivrNPMFetcher/TarFetcher protocols
 */
import { UnpkgFetcher } from './unpkg';
import { JSDelivrNPMFetcher } from './jsdelivr/jsdelivr-npm';
import { FetchProtocol } from '../fetch-npm-module';

let contributedProtocols: ProtocolDefinition[] = [];

export const preloadedProtocols = {
  jsdelivr: new JSDelivrNPMFetcher(),
  unpkg: new UnpkgFetcher(),
};

const protocols: ProtocolDefinition[] = [
  {
    protocol: preloadedProtocols.unpkg,
    condition: (_name, _version, useFallback) => useFallback,
  },
  { protocol: preloadedProtocols.jsdelivr, condition: () => true },
];

export type ProtocolDefinition = {
  protocol: FetchProtocol;
  condition: ProtocolCondition;
};

export type ProtocolCondition = (
  version: string,
  name: string,
  useFallback: boolean
) => boolean;

export function setContributedProtocols(newProtocols: ProtocolDefinition[]) {
  contributedProtocols = newProtocols;
  return contributedProtocols;
}

export function prependToContributedProtocols(
  newProtocols: ProtocolDefinition[]
) {
  contributedProtocols.unshift(...newProtocols);
  return contributedProtocols;
}

export function getFetchProtocol(
  depName: string,
  depVersion: string,
  useFallback = false
) {
  const runCondition = (p: ProtocolDefinition) =>
    p.condition(depName, depVersion, useFallback);

  return (
    contributedProtocols.find(runCondition)?.protocol ||
    protocols.find(runCondition)!.protocol
  );
}
