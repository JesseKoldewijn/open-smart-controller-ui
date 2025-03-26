export interface ObjectManagerGetObjectsResponse {
  ok: boolean;
  type: string;
  time: number;
  rv: Rv;
  systime: number;
  seq: number;
  error: boolean;
}

interface Rv {
  objects: Object[];
  version: Version;
  first_ts: number;
}

interface Object {
  driver: string;
  name: string;
  oid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propsval: PropsvalElement[] | Record<string, any>;
  propertyInfo: PropertyInfo[];
  uid: string;
  type: string;
}

interface PropertyInfo {
  type: string;
  label: string;
  id: string;
  writable?: boolean;
  persistent?: boolean;
  fn_set?: null;
  default?: boolean | number | string;
  range?: string;
  timer?: boolean;
  filtmin?: number;
  filtmax?: number;
  log?: boolean;
  unit?: string;
  cumulative?: boolean;
  logchange?: boolean;
  log_interval?: number;
  hidden?: boolean;
}

interface PropsvalElement {
  id: string;
  value: boolean | number | string;
  daystart?: number[];
}

interface Version {
  type: string;
  user: string;
  date: string;
  host: string;
  time: string;
  tag: string;
  version: string;
  serial: string;
  build: string;
}
