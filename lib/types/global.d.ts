export {};

declare global {
	interface APIResponse<T> {
		status_code: number;
		message: string;
		dev_message: string;
		data: T;
	}
}
