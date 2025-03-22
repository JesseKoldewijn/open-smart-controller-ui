import { ApiHookOptions, createApiHook } from "~/lib/api";
import { internal_api } from "~/lib/api/internals";
import { ApiOptions } from "~/lib/api/types";
import { systemStore } from "~/store/system";

const opts = {
	seq: 1,
	method: "sysinfo_version",
	arguments: {},
} satisfies ApiOptions;

export interface SystemVersionRv {
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

interface SystemVersionResponse {
	ok: boolean;
	type: "response";
	time: number;
	rv: {
		version: SystemVersionRv;
	};
	systime: number;
	seq: number;
	error: boolean;
}

export const useSystemVersionQuery = (
	_opts?: ApiOptions,
	apiHookOptions?: ApiHookOptions
) => {
	const store = systemStore.getVersionStore.getState();
	const updateState =
		apiHookOptions?.stateUpdateCallback ?? store.setVersionData;

	return createApiHook<SystemVersionResponse>(_opts ?? opts, {
		...apiHookOptions,
		stateUpdateCallback: (data: SystemVersionResponse) => {
			if (data) {
				updateState(data.rv.version);
			}
		},
	});
};

export const getSystemVersion = () => internal_api<SystemVersionResponse>(opts);
