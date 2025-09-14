// Service to fetch banners from banner API
import { fetchAPI } from "@/lib/api";
import { BANNER_ENDPOINT } from "@/lib/static";
import { Banner } from "@/lib/types/banner";

export const getBannersService = async (): Promise<APIResponse<Banner[]>> => {
  return fetchAPI<Banner[]>(BANNER_ENDPOINT);
};