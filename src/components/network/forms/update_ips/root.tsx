import { useLayoutEffect, useState } from "react";
import { getSystemPing } from "~/logic/methods/system/ping";
import { networkStore } from "~/store/network";

type SysPingReturnType = ReturnType<typeof getSystemPing>;

export const UpdateIpForm = () => {
	const [loading, isLoading] = useState<boolean>(true);

	const { ipAddresses, setIpAddresses } =
		networkStore.getNetworkClientStore.getState();

	const [addresses, setAddresses] = useState<string[]>([
		...new Set(ipAddresses),
	]);

	const [validatedAddresses, setValidatedAddresses] = useState<
		{
			ip: string;
			isController: boolean | null;
		}[]
	>(
		[...new Set(ipAddresses)].map((ip) => ({
			ip,
			isController: null,
		}))
	);

	const [message, setMessage] = useState<string | null>();

	const checkAddresses = async () => {
		const ipList = addresses.map((address) => address);

		const responsePromises = new Set<{
			ip: string;
			promise: SysPingReturnType;
		}>();

		for (const ip of ipList) {
			responsePromises.add({
				ip,
				promise: getSystemPing(ip),
			});
		}

		const results = await Promise.allSettled(
			Array.from(responsePromises).map(({ promise }) => promise)
		);

		const resultsWithIps =
			results.map((result, idx) => ({
				...result,
				ip: Array.from(responsePromises)[idx].ip,
			})) || [];

		if (results.length === 0) {
			setMessage("No IPs provided");
			return;
		}

		const data = resultsWithIps.map((result) => {
			if (result.status === "fulfilled" && result.value) {
				return {
					ip: result.ip,
					isController: result.value.ok,
				};
			}
		});

		setMessage(null);

		const resultSet = [...new Set(data)].filter((x) => x !== undefined);

		if (resultSet.length === 0) {
			setMessage("No valid IPs provided");
			return;
		}
		setValidatedAddresses(resultSet);

		setTimeout(() => isLoading(false), 1000);

		return resultSet;
	};

	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await checkAddresses();
	};

	const ipInputHandler = (ip: string) => {
		setAddresses((x) => {
			return [...new Set([...x, ip])];
		});
	};

	useLayoutEffect(() => {
		checkAddresses();
	}, []);

	if (loading) return null;

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
			{validatedAddresses &&
				validatedAddresses.map((address) => {
					const status =
						address.isController === null
							? "Unknown"
							: address.isController == true
							? "Valid"
							: "Invalid";

					const isInStore = ipAddresses.includes(address.ip);

					return (
						<div key={address.ip}>
							{address.ip} - {status} -{" "}
							{isInStore ? "In Store" : "Not In Store"}
							<button
								onClick={() => {
									if (isInStore) {
										setIpAddresses(
											ipAddresses.filter(
												(ip) => ip !== address.ip
											)
										);
										setAddresses(
											validatedAddresses
												.filter(
													(ip) => ip.ip !== address.ip
												)
												.map((x) => x.ip)
										);
									} else {
										setIpAddresses([
											...ipAddresses,
											address.ip,
										]);
										setAddresses([
											...ipAddresses,
											address.ip,
										]);
									}
								}}
							>
								{isInStore ? "Remove from" : "Add to"} store
							</button>
						</div>
					);
				})}
			{!!message && <>Message: {message}</>}
		</div>
	);
};
