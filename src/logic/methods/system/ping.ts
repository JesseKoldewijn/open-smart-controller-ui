import { api } from "~/lib/api";
import { ApiOptions } from "~/lib/api/types";

const opts = {
	seq: 1,
	method: "api_ping",
	arguments: {},
} satisfies ApiOptions;

interface SystemPingResponse {
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

export const getSystemPing = () => api<SystemPingResponse>(opts);
