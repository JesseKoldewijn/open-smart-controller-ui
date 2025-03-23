import { useState } from "react";
import { useWorker } from "~/components/network/forms/hooks";
import { MESSAGES } from "~/lib/worker";

export const UpdateIpForm = () => {
	const [addresses, setAddresses] = useState<
		{ ip: string; isController: boolean }[]
	>([]);
	const [message, setMessage] = useState<string>();

	const { postWorkerMessage } = useWorker();

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const messageType = MESSAGES.GET_IP_ADDRESS_IS_CONTROLLER;
		const ipList = addresses.map((address) => address.ip);
		const message = JSON.stringify(ipList[0]);

		const res = await postWorkerMessage(messageType, message);

		setMessage(JSON.stringify(res));
	};

	const ipInputHandler = (ip: string) => {
		setAddresses([
			{
				ip,
				isController: false,
			},
		]);
	};

	return (
		<div>
			<h1>Update IP</h1>
			<form onSubmit={submitHandler}>
				<label htmlFor="ip">IP Address</label>
				<input
					type="text"
					name="ip"
					id="ip"
					onChange={(e) => ipInputHandler(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
			<hr />
			{addresses?.map(({ ip, isController }, idx) => (
				<div key={ip + `${idx}`}>
					{`${ip}: ${isController.toString()}`}
				</div>
			))}
			<hr />
			Message: {message}
		</div>
	);
};
