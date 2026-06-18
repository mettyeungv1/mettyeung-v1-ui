"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Shield, Mail, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";
import { otpSchema, OtpFormData } from "@/lib/validations/auth";
import { toast } from "sonner";
import { resendOtpAction } from "@/action/auth/resent-otp-action";
import { verifyOtpAction } from "@/action/auth/verify-otp-action";

export default function VerifyOtpForm({
	emailFromParams,
}: {
	emailFromParams?: string;
}) {
	const searchParams = useSearchParams();
	const email = emailFromParams || searchParams.get("email") || "";

	const [isLoading, setIsLoading] = useState(false);
	const [isResending, setIsResending] = useState(false);
	const [countdown, setCountdown] = useState(300); // 5 minutes
	const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const router = useRouter();
	const { t } = useTranslation();

	const {
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
	} = useForm<OtpFormData>({
		resolver: zodResolver(otpSchema),
	});

	// Countdown timer
	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	// Format countdown time
	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	// Handle OTP input change
	const handleOtpChange = (index: number, value: string) => {
		if (value.length > 1) {
			const pastedValue = value.slice(0, 6);
			const newOtpValues = [...otpValues];
			for (let i = 0; i < pastedValue.length && i + index < 6; i++) {
				newOtpValues[i + index] = pastedValue[i];
			}
			setOtpValues(newOtpValues);
			setValue("otp", newOtpValues.join(""));
			const nextIndex = Math.min(index + pastedValue.length, 5);
			inputRefs.current[nextIndex]?.focus();
			return;
		}
		const newOtpValues = [...otpValues];
		newOtpValues[index] = value;
		setOtpValues(newOtpValues);
		setValue("otp", newOtpValues.join(""));
		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus();
		}
	};

	// Handle backspace
	const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !otpValues[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const onSubmit = async (data: OtpFormData) => {
		setIsLoading(true);
		try {
			// Call the verify OTP server action
			const result = await verifyOtpAction({ email, otp: data.otp });

			// Check the response from the API (assuming 200 is success)
			if (result && result.status_code === 200) {
				toast.success(t("auth.toast.otpVerified"), {
					description: result.message || t("auth.toast.otpVerifiedDescription"),
				});
				router.push("/auth/login");
			} else {
				toast.error(t("auth.toast.otpInvalid"), {
					description: result.message || t("auth.toast.otpInvalidDescription"),
				});
			}
		} catch (error) {
			toast.error(t("auth.toast.systemError"), {
				description: t("auth.toast.otpVerifyError"),
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendOtp = async () => {
		setIsResending(true);
		try {
			// Call the resend OTP server action
			const result = await resendOtpAction({ email });

			if (result && result.status_code === 200) {
				toast.success(t("auth.toast.otpSent"), {
					description: result.message || t("auth.toast.otpSentDescription"),
				});
				// Reset state on successful resend
				setCountdown(300);
				setOtpValues(["", "", "", "", "", ""]);
				setValue("otp", "");
				inputRefs.current[0]?.focus();
			} else {
				toast.error(t("auth.toast.otpSendError"), {
					description: result.message || t("auth.toast.otpSendErrorDescription"),
				});
			}
		} catch (error) {
			toast.error(t("auth.toast.systemError"), {
				description: t("auth.toast.otpSystemError"),
			});
		} finally {
			setIsResending(false);
		}
	};

	return (
		<div className="surface-page flex min-h-screen items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="w-full max-w-md relative z-10"
			>
				{/* Back button */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
					className="mb-6"
				>
					<Button
						variant="ghost"
						asChild
						className="text-text-secondary hover:text-primary-900"
					>
						<Link href="/auth/register" className="flex items-center">
							<ArrowLeft className="w-4 h-4 mr-2" />
							{t("common.back")}
						</Link>
					</Button>
				</motion.div>

				<Card className="shadow-surface">
					<CardHeader className="text-center pb-6">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.3 }}
							className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-interactive-primary shadow-surface"
						>
							<Shield className="w-8 h-8 text-white" />
						</motion.div>
						<CardTitle className="text-heading-3 text-text-primary">
							{t("auth.verifyOtp")}
						</CardTitle>
						<p className="mt-2 text-body text-text-secondary">{t("auth.otpSubtitle")}</p>
					</CardHeader>

					<CardContent className="space-y-6">
						{/* Email display */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="flex items-center justify-center space-x-2 rounded-lg bg-interactive-primaryMuted p-4"
						>
							<Mail className="h-5 w-5 text-primary-900" />
							<span className="text-body-sm text-text-primary">
								{t("auth.sentTo")}: <strong>{email}</strong>
							</span>
						</motion.div>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
							{/* OTP Input */}
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className="space-y-4"
							>
								<div className="flex justify-center space-x-3">
									{otpValues.map((value, index) => (
										<Input
											key={index}
											ref={(el) => (inputRefs.current[index] = el)}
											type="text"
											inputMode="numeric"
											maxLength={6}
											value={value}
											onChange={(e) => handleOtpChange(index, e.target.value)}
											onKeyDown={(e) => handleKeyDown(index, e)}
											className="h-12 w-12 border-2 text-center text-lg font-bold"
										/>
									))}
								</div>
								{errors.otp && (
									<p className="text-center text-body-sm text-error">
										{errors.otp.message}
									</p>
								)}
							</motion.div>

							{/* Countdown and Resend */}
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6 }}
								className="text-center space-y-3"
							>
								{countdown > 0 ? (
									<p className="text-body-sm text-text-secondary">
										{t("auth.resendIn")}{" "}
										<strong>{formatTime(countdown)}</strong>
									</p>
								) : (
									<Button
										type="button"
										variant="outline"
										onClick={handleResendOtp}
										disabled={isResending}
										className="text-primary-900"
									>
										{isResending ? (
											<motion.div
												animate={{ rotate: 360 }}
												transition={{
													duration: 1,
													repeat: Infinity,
													ease: "linear",
												}}
												className="mr-2 h-4 w-4 rounded-full border-2 border-primary-900 border-t-transparent"
											/>
										) : (
											<RefreshCw className="w-4 h-4 mr-2" />
										)}
										{isResending ? t("auth.resending") : t("auth.resendOtp")}
									</Button>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}
							>
								<Button
									type="submit"
									className="h-12 w-full"
									disabled={isLoading || otpValues.join("").length !== 6}
								>
									{isLoading ? (
										<motion.div
											animate={{ rotate: 360 }}
											transition={{
												duration: 1,
												repeat: Infinity,
												ease: "linear",
											}}
											className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
										/>
									) : (
										<CheckCircle className="w-5 h-5 mr-2" />
									)}
									{isLoading ? t("auth.verifying") : t("auth.verify")}
								</Button>
							</motion.div>
						</form>

						{/* Change email */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8 }}
							className="text-center"
						>
							<p className="text-body-sm text-text-secondary">
								{t("auth.wrongEmail")}{" "}
								<Link
									href="/auth/register"
									className="font-medium text-primary-900 hover:underline"
								>
									{t("auth.changeEmail")}
								</Link>
							</p>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
