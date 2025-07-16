import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.getMonth() + 1; // getMonth() is zero-based
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
};
