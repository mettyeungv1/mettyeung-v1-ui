import { RegisterFormData } from "@/lib/validations/auth";
import { registerService } from "@/service/auth/register-service";

export const registerAction = async (data: RegisterFormData) => {
	const { name, email, password } = data;

	// 2. Create the object for the API, adding a default phone number.
	const apiCredentials = {
		name,
		email,
		password,
		phone: "000000000", // 👈 Default phone number for now
	};

	// 3. Call the service.
	const result = await registerService(apiCredentials);

	return result;
};
