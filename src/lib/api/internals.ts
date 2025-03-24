import { API_CONSTANTS } from "~/lib/api/constants";
import { ApiOptions } from "~/lib/api/types";

class Internal_Api<GenericResponseType> {
	ipAddress: string = API_CONSTANTS.DEFAULT_DOMAIN;
	options: ApiOptions = API_CONSTANTS.DEFAULT_OPTIONS;
	stateUpdateCallback: <GenericResponseType>(
		data: GenericResponseType
	) => void = () => {};

	constructor(
		ipAddress: string = API_CONSTANTS.DEFAULT_DOMAIN,
		options: ApiOptions,
		stateUpdateCallback: <GenericResponseType>(
			data: GenericResponseType
		) => void = () => {}
	) {
		this.ipAddress = ipAddress;
		this.options = options;
		this.stateUpdateCallback = stateUpdateCallback;
	}

	async call() {
		try {
			const response = await fetch(
				new URL(API_CONSTANTS.PATHNAME, `http://${this.ipAddress}`),
				{
					mode: "cors",
					method: API_CONSTANTS.HTTP_METHOD,
					body: JSON.stringify(this.options),
				}
			);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = (await response.json()) as GenericResponseType;

			if (this.stateUpdateCallback) this.stateUpdateCallback(data);

			return data;
		} catch (error) {
			const err: Error = error as Error;
			console.debug("error thrown in api call: ", err.message);
			return null;
		}
	}
}

/**
 * @name internal_api
 * @description Internal API call
 * @param {ApiOptions} options
 * @returns {Promise<GenericResponseType>}
 * @scope ../
 */
export const internal_api = <GenericResponseType>(
	ipAddress: string = API_CONSTANTS.DEFAULT_DOMAIN,
	options: ApiOptions,
	stateUpdateCallback?: <GenericResponseType>(
		data: GenericResponseType
	) => void
) => {
	return new Internal_Api<GenericResponseType>(
		ipAddress,
		options,
		stateUpdateCallback
	).call();
};
