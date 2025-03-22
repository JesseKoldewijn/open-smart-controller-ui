import { ApiOptions } from "./types";
import { internal_api } from "~/lib/api/internals";
import { useQuery as query } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const api = <GenericResponseType>(
	opts: ApiOptions,
	stateUpdateCallback?: <GenericResponseType>(
		data: GenericResponseType
	) => void
) => {
	return internal_api<GenericResponseType>(opts, stateUpdateCallback);
};

export interface ApiHookOptions {
	polling?: boolean;
	enabled?: boolean;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	stateUpdateCallback?: (data: any) => void;
}

export const createApiHook = <GenericResponseType>(
	opts: ApiOptions,
	apiHookOptions?: ApiHookOptions
) => {
	const {
		polling = false,
		enabled = true,
		stateUpdateCallback,
	} = apiHookOptions ?? {};

	const [isPolling, setIsPolling] = useState(polling);

	const enablePolling = () => {
		setIsPolling(true);
	};

	const disablePolling = () => {
		setIsPolling(false);
	};

	const q = query({
		queryKey: ["systemVersion"],
		queryFn: enabled
			? async () => api<GenericResponseType>(opts, stateUpdateCallback)
			: async () => ({} as ReturnType<typeof api<GenericResponseType>>),
		retryDelay: 2000,
		refetchOnReconnect: true,
		refetchOnWindowFocus: true,
	});

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isPolling) {
			interval = setInterval(() => {
				q.refetch();
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isPolling]);

	return {
		...q,
		enablePolling,
		disablePolling,
	};
};
