"use server";

import { getBannersService } from "@/service/banner/banner-service";

export const getBannersAction = async () => {
  return await getBannersService();
};