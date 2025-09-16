"use server";

import { getPartnersService } from "@/service/partner/partner-service";

export const getPartnersAction = async () => {
	return await getPartnersService();
};

