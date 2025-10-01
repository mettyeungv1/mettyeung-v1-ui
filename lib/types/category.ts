// --- Core Building Block ---
// A generic type for any field that has multiple language translations.
export type LocalizedField = {
	[key: string]: string | undefined;
};

// --- Raw API Response Types ---
// These interfaces perfectly match the raw JSON data from your backend.
export interface APICategoryTranslation {
	id: string;
	categoryId: string;
	languageCode: string;
	name: string;
	description?: string | null;
}

export interface APICategory {
	id: string;
	parentId: string | null;
	categoryTranslations: APICategoryTranslation[];
	// These fields are often pre-filled by the backend for convenience
	name?: LocalizedField;
	description?: LocalizedField;
	createdAt: string;
	updatedAt: string;
}

// --- Normalized Frontend Types ---
// This is the clean, flat type representing a single category after transformation.
export interface Category {
	id: string;
	parentId: string | null;
	name: LocalizedField;
	description: LocalizedField;
	createdAt: Date;
	updatedAt: Date;
	isActive: boolean; // Assuming this is part of your model
}

// This is the final, hierarchical type that your UI components will use.
// It extends the base Category and adds a 'children' array.
export interface CategoryNode extends Category {
	children: CategoryNode[];
}
