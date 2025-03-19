import { callApi } from "~api";
import { ApiOptions } from "~api/types";

export const getSystemVersion = () => {
	const opts = {
		seq: 1,
		method: "sysinfo_version",
		arguments: {},
	} satisfies ApiOptions;

	return callApi<SystemVersionResponse>(opts);
};

interface SystemVersionResponse {
	ok: boolean;
	type: "response";
	time: number;
	rv: {
		version: {
			type: string;
			user: string;
			date: string;
			host: string;
			time: string;
			tag: string;
			version: string;
			serial: string;
			build: string;
		};
	};
	systime: number;
	seq: number;
	error: boolean;
}
