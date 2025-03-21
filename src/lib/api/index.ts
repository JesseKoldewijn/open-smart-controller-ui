import { ApiOptions } from "./types";
import { internal_api } from "~/lib/api/internals";
import { useQuery as query } from "@tanstack/react-query";

export const api = <GenericResponseType>(opts: ApiOptions) => {
	return internal_api<GenericResponseType>(opts);
};

export const createApiHook = <GenericResponseType>(opts: ApiOptions) => {
	let isPolling = false;

	const pollingHelper = (callback: () => void) => {
		if (isPolling) return;
		isPolling = true;
		const interval = setInterval(() => {
			callback();
		}, 1000);
		return () => clearInterval(interval);
	};

	const q = query({
		queryKey: ["systemVersion"],
		queryFn: async () => api<GenericResponseType>(opts),
	});

	return {
		...q,
		pollingHelper,
	};
};
