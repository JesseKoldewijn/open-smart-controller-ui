import { useLayoutEffect, useState } from "preact/hooks";

export const callApi = <GenericResponseType>(
	callback: () => Promise<GenericResponseType | null>
) => {
	const [response, setResponse] = useState<GenericResponseType | null>();

	const fetchData = async () => {
		setResponse(await callback());
	};

	const updateResponse = async () => await fetchData();

	useLayoutEffect(() => {
		fetchData();
	}, []);

	return {
		response,
		updateResponse,
	};
};
