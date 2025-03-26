import { API_CONSTANTS } from "~/lib/api/constants";
import { ApiOptions } from "~/lib/api/types";

const internalApi = async <GenericResponseType>(
  ipAddress: string = API_CONSTANTS.DEFAULT_DOMAIN,
  body: ApiOptions = API_CONSTANTS.DEFAULT_OPTIONS,
  stateUpdateCallback?: <GenericResponseType>(
    data: GenericResponseType,
  ) => void,
) => {
  const { timeout, ..._body } = body;

  try {
    let controller: AbortController | null = null;

    if (timeout) {
      controller = new AbortController();
    }

    const response = await fetch(
      new URL(API_CONSTANTS.PATHNAME, `http://${ipAddress}`),
      {
        mode: "cors",
        method: API_CONSTANTS.HTTP_METHOD,
        body: JSON.stringify(_body),
        signal: controller?.signal,
      },
    );

    if (timeout) {
      setTimeout(() => {
        controller?.abort();
      }, timeout);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = (await response.json()) as GenericResponseType;

    if (stateUpdateCallback) stateUpdateCallback(data);

    return data;
  } catch (error) {
    const err: Error = error as Error;
    console.debug("error thrown in api call: ", err.message);
    return null;
  }
};

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
    data: GenericResponseType,
  ) => void,
) => {
  return internalApi<GenericResponseType>(
    ipAddress,
    options,
    stateUpdateCallback,
  );
};
