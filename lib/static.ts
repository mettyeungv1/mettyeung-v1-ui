export const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_BASE_URL;
export const AUTH_ENDPOINT = `${API_BASE_URL}/auth`;

console.log(
	"NEXT_PUBLIC_AUTH_BASE_URL:",
	process.env.NEXT_PUBLIC_AUTH_BASE_URL
);
console.log("API_BASE_URL:", API_BASE_URL);
console.log("AUTH_ENDPOINT:", AUTH_ENDPOINT);

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

/*
  Category API:
  - Get endpoint
*/
export const CATEGORY_ENDPOINT = `${API_BASE_URL}/categories`;