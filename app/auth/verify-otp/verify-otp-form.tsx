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
			// Handle paste
			const pastedValue = value.slice(0, 6);
			const newOtpValues = [...otpValues];

			for (let i = 0; i < pastedValue.length && i + index < 6; i++) {
				newOtpValues[i + index] = pastedValue[i];
			}

			setOtpValues(newOtpValues);
			setValue("otp", newOtpValues.join(""));

			// Focus on the last filled input or next empty one
			const nextIndex = Math.min(index + pastedValue.length, 5);
			inputRefs.current[nextIndex]?.focus();
			return;
		}

		const newOtpValues = [...otpValues];
		newOtpValues[index] = value;
		setOtpValues(newOtpValues);
		setValue("otp", newOtpValues.join(""));

		// Auto-focus next input
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
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success("បញ្ជាក់គណនីជោគជ័យ!", {
				description: "គណនីរបស់អ្នកត្រូវបានបញ្ជាក់ហើយ",
			});

			// Redirect to login or dashboard
			router.push("/auth/login");
		} catch (error) {
			toast.error("កូដ OTP មិនត្រឹមត្រូវ", {
				description: "សូមពិនិត្យកូដ OTP ហើយព្យាយាមម្តងទៀត",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendOtp = async () => {
		setIsResending(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));

			toast.success("កូដ OTP ថ្មីត្រូវបានផ្ញើ!", {
				description: "សូមពិនិត្យអ៊ីមែលរបស់អ្នក",
			});

			// Reset countdown
			setCountdown(300);
			setOtpValues(["", "", "", "", "", ""]);
			setValue("otp", "");
			inputRefs.current[0]?.focus();
		} catch (error) {
			toast.error("មានបញ្ហាក្នុងការផ្ញើកូដ OTP");
		} finally {
			setIsResending(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 blur-3xl" />
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
			</div>

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
						className="text-gray-600 hover:text-purple-600"
					>
						<Link href="/auth/register" className="flex items-center">
							<ArrowLeft className="w-4 h-4 mr-2" />
							{t("common.back")}
						</Link>
					</Button>
				</motion.div>

				<Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
					<CardHeader className="text-center pb-6">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.3 }}
							className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
						>
							<Shield className="w-8 h-8 text-white" />
						</motion.div>
						<CardTitle className="text-2xl font-bold text-gray-900">
							{t("auth.verifyOtp")}
						</CardTitle>
						<p className="text-gray-600 mt-2">{t("auth.otpSubtitle")}</p>
					</CardHeader>

					<CardContent className="space-y-6">
						{/* Email display */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="flex items-center justify-center space-x-2 p-4 bg-purple-50 rounded-lg"
						>
							<Mail className="w-5 h-5 text-purple-600" />
							<span className="text-sm text-gray-700">
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
											className="w-12 h-12 text-center text-lg font-bold border-2 focus:border-purple-500"
										/>
									))}
								</div>
								{errors.otp && (
									<p className="text-sm text-red-600 text-center">
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
									<p className="text-sm text-gray-600">
										{t("auth.resendIn")}{" "}
										<strong>{formatTime(countdown)}</strong>
									</p>
								) : (
									<Button
										type="button"
										variant="outline"
										onClick={handleResendOtp}
										disabled={isResending}
										className="text-purple-600 border-purple-600 hover:bg-purple-50"
									>
										{isResending ? (
											<motion.div
												animate={{ rotate: 360 }}
												transition={{
													duration: 1,
													repeat: Infinity,
													ease: "linear",
												}}
												className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full mr-2"
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
									className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
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
							<p className="text-gray-600 text-sm">
								{t("auth.wrongEmail")}{" "}
								<Link
									href="/auth/register"
									className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
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
