// Base API Response Structure
export interface APIResponse<T> {
	status_code: number;
	message: string;
	dev_message: string;
	data: T | null;
}

// Pagination wrapper
export interface Paginated<T> {
	data: T[];
	total?: number;
	page?: number;
	limit?: number;
	totalPages?: number;
}

// Localized field type
export interface LocalizedField {
	[languageCode: string]: string;
}
