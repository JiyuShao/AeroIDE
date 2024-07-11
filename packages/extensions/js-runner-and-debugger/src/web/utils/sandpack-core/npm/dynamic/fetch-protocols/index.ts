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
