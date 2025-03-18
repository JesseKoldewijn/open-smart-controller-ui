import { Api, ApiOptions } from "../../api";

export const getSystemVersion = async () => {
	const opts = {
		seq: 1,
		method: "sysinfo_version",
		arguments: {},
	} satisfies ApiOptions;

	const apiInstance = new Api<SystemVersionResponse>(opts);
	return await apiInstance.call();
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
