export interface ApiOptions {
	method: string;
	arguments: any;
	seq?: number;
}

export class Api<GenericResponseType> {
	private pathName = "/iungo/api_request" as const;
	private http_method = "POST" as const;
	private default_seq = 1 as const;

	private defaultDomain = "http://192.168.178.196";

	options: ApiOptions = {
		method: "",
		arguments: {},
		seq: this.default_seq,
	} as const;

	constructor(options: ApiOptions) {
		this.options = options;
	}

	async call() {
		try {
			const response = await fetch(
				new URL(this.pathName, this.defaultDomain),
				{
					mode: "cors",
					method: this.http_method,
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
