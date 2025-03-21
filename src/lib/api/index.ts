import { ApiOptions } from "./types";
import { internal_api } from "~/lib/api/internals";
import { useQuery as query } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const api = <GenericResponseType>(opts: ApiOptions) => {
	return internal_api<GenericResponseType>(opts);
};

export const createApiHook = <GenericResponseType>(opts: ApiOptions) => {
	const [isPolling, setIsPolling] = useState(false);

	const enablePolling = () => {
		setIsPolling(true);
	};

	const disablePolling = () => {
		setIsPolling(false);
	};

	const q = query({
		queryKey: ["systemVersion"],
		queryFn: async () => api<GenericResponseType>(opts),
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
