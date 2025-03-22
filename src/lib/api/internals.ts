import { API_CONSTANTS } from "~/lib/api/constants";
import { ApiOptions } from "~/lib/api/types";

class Internal_Api<GenericResponseType> {
	options: ApiOptions = API_CONSTANTS.DEFAULT_OPTIONS;
	stateUpdateCallback: <GenericResponseType>(
		data: GenericResponseType
	) => void = () => {};

	constructor(
		options: ApiOptions,
		stateUpdateCallback: <GenericResponseType>(
			data: GenericResponseType
		) => void = () => {}
	) {
		this.options = options;
		this.stateUpdateCallback = stateUpdateCallback;
	}

	async call() {
		try {
			const response = await fetch(
				new URL(API_CONSTANTS.PATHNAME, API_CONSTANTS.DEFAULT_DOMAIN),
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
			console.error(error);
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
	options: ApiOptions,
	stateUpdateCallback?: <GenericResponseType>(
		data: GenericResponseType
	) => void
) => {
	return new Internal_Api<GenericResponseType>(
		options,
		stateUpdateCallback
	).call();
};
