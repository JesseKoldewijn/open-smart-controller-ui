import { API_CONSTANTS } from "~/lib/api/constants";
import { ApiOptions } from "~/lib/api/types";

class Internal_Api<GenericResponseType> {
	options: ApiOptions = API_CONSTANTS.DEFAULT_OPTIONS;

	constructor(options: ApiOptions) {
		this.options = options;
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
			return (await response.json()) as GenericResponseType;
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
 * @scope ./src/logic/api
 */
export const internal_api = <GenericResponseType>(options: ApiOptions) => {
	return new Internal_Api<GenericResponseType>(options).call();
};
