import { getApiUrl } from "@/lib/api";

export const API_BASE_URL = getApiUrl();
export const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;

/*
	Banner API: 
	- Get endpoint
*/
export const BANNER_ENDPOINT = `${API_BASE_URL}/banners`;

/*
	Partner API: 
	- Get endpoint
*/
export const PARTNER_ENDPOINT = `${API_BASE_URL}/partners`;

/*
	Blog API: 
	- Get endpoint
*/
export const BLOG_ENDPOINT = `${API_BASE_URL}/blogs`;

/*
	Media API: 
	- Get endpoint
*/
export const MEDIA_ENDPOINT = `${API_BASE_URL}/media`;

export const VIDEO_ENDPOINT = `${API_BASE_URL}/videos`;
export const CATEGORY_ENDPOINT = `${API_BASE_URL}/categories`;
export const STRUCTURE_ENDPOINT = `${API_BASE_URL}/structures`;
export const CONTACT_ENDPOINT = `${API_BASE_URL}/contact`;
