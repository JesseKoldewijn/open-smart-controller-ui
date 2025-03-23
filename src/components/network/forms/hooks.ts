import { wb } from "~/lib/worker";

export const useWorker = () => {
	const postWorkerMessage = async (type: string, message: string) =>
		await wb.messageSW({
			type,
			message,
		});

	return {
		postWorkerMessage,
	};
};
