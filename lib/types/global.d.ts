export {};

declare global {
	interface APIResponse<T> {
		data: T;
		message: string;
		status: string;
		success: boolean;
		timestamps: string;
	}
}
