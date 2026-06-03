import { Suspense } from "react";
import VerifyOtpForm from "./verify-otp-form";

export default function VerifyOtpPage() {
	return (
		<Suspense fallback={null}>
			<VerifyOtpForm />;
		</Suspense>
	);
}
