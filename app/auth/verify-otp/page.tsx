import { Suspense } from "react";
import VerifyOtpForm from "./verify-otp-form";

export default function VerifyOtpPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<VerifyOtpForm />;
		</Suspense>
	);
}
