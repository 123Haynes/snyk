import { SupportedPackageManagers } from './package-managers';

// TODO(kyegupov): use a shared repository snyk-cli-interface

export interface PluginMetadata {
  name: string;
  packageFormatVersion?: string;
  packageManager?: SupportedPackageManagers;
  imageLayers?: any;
  targetFile?: string; // this is wrong (because Shaun said it)
  runtime?: any;
  dockerImageId?: any;
  meta?: {
    allDepRootNames?: string[]; // To warn the user about subprojects not being scanned
  };
}

export interface DepDict {
  [name: string]: DepTree;
}

export interface DepTree {
  name: string;
  version?: string;
  dependencies?: DepDict;
  packageFormatVersion?: string;
  docker?: any;
  files?: any;
  policy?: any;
  targetFile?: string;
}

export interface DepRoot {
  depTree: DepTree; // to be soon replaced with depGraph
  targetFile?: string;
}

// Legacy result type. Will be deprecated soon.
export interface SingleInspectResult {
  plugin: PluginMetadata;
  package: DepTree;
}

export interface MultiInspectResult {
  plugin: PluginMetadata;
  depRoots: DepRoot[];
}

// https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
export function isMultiResult(pet: SingleInspectResult | MultiInspectResult): pet is MultiInspectResult {
  return !!(pet as MultiInspectResult).depRoots;
}

export class MonitorError extends Error {
  public code?: number;
  public userMessage?: string;
}

export interface TestOptions {
  org: string;
  path: string;
  docker?: boolean;
  file?: string;
  policy?: string;
  json?: boolean;
  'all-sub-projects'?: boolean; // Corresponds to multiDepRoot in plugins
  'project-name'?: string;
  'show-vulnerable-paths'?: string;
  showVulnPaths?: boolean;
  packageManager: SupportedPackageManagers;
  advertiseSubprojectsCount?: number;
  subProjectNames?: string[];
  severityThreshold?: string;
}
