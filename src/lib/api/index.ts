import { useLayoutEffect, useState } from "react";
import { API_CONSTANTS } from "./constants";
import { ApiOptions } from "./types";
import { internal_api } from "~/lib/api/internals";

export const api = <GenericResponseType>(opts: ApiOptions) => {
	/** Response */
	const [response, setResponse] = useState<GenericResponseType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const fetchData = async () => {
		setIsLoading(true);
		const response = await internal_api<GenericResponseType>(opts);
		setResponse(response);
		setIsLoading(false);
	};
	const updateResponse = async () => await fetchData();

	/** Polling */
	const [pollingEnabled, setPollingEnabled] = useState<boolean>(
		API_CONSTANTS.POLLING.ENABLED
	);
	const [pollingRate, setPollingRate] = useState<number>(
		API_CONSTANTS.POLLING.INTERVAL.DEFAULT
	);
	const checkPollingRateValid = (ms?: number) => {
		if (!ms) return true;
		const isValid =
			ms >= API_CONSTANTS.POLLING.INTERVAL.MIN &&
			ms <= API_CONSTANTS.POLLING.INTERVAL.MAX;

		if (isValid) return true;

		console.error(
			`Polling rate must be between ${API_CONSTANTS.POLLING.INTERVAL.MIN} and ${API_CONSTANTS.POLLING.INTERVAL.MAX}`
		);

		return false;
	};

	/** Side-Effect */
	useLayoutEffect(() => {
		try {
			fetchData();

			if (pollingEnabled) {
				if (!checkPollingRateValid(pollingRate)) {
					setPollingEnabled(false);
					return;
				}
				const intervalId = setInterval(fetchData, pollingRate);
				return () => clearInterval(intervalId);
			}
		} catch (error) {
			console.error(error);
			setPollingEnabled(false);
		}
	}, [pollingEnabled]);

	return {
		response,
		isLoading,
		pollingEnabled,
		updateResponse,
		enablePolling: (ms?: number) => {
			if (ms) {
				if (checkPollingRateValid(ms)) setPollingRate(ms);
				else console.error("Invalid polling rate");
			}

			setPollingEnabled(true);
		},
		disablePolling: () => setPollingEnabled(false),
	};
};
