"use server";
import { auth } from "@/auth";

const headerToken = async () => {
	const session = await auth();

	return {
		accept: "*/*",
		"Content-Type": "application/json",
		Authorization: `Bearer ${session?.accessToken}`,
	};
};

export default headerToken;
