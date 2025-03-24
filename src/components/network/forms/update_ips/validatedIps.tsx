interface ValidatedIpsProps {
	validatedAddresses: {
		ip: string;
		isController: boolean | null;
	}[];
	ipAddresses: string[];
	setIpAddresses: (ipAddresses: string[]) => void;
	checkAddresses: () => Promise<void>;
}

export const ValidatedIps = ({
	validatedAddresses,
	ipAddresses,
	setIpAddresses,
	checkAddresses,
}: ValidatedIpsProps) => {
	return (
		<div>
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
										checkAddresses();
									} else {
										setIpAddresses([
											...ipAddresses,
											address.ip,
										]);
										checkAddresses();
									}
								}}
							>
								{isInStore ? "Remove" : "Add"}
							</button>
						</div>
					);
				})}
		</div>
	);
};
