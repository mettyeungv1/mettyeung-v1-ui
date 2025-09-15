"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Eye,
	EyeOff,
	Lock,
	ArrowLeft,
	Key,
	CheckCircle,
	Check,
	X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";
import {
	resetPasswordSchema,
	ResetPasswordFormData,
} from "@/lib/validations/auth";
import { toast } from "sonner";
import { resetPasswordAction } from "@/action/auth/password-action";

export default function ResetPasswordForm({
	onTokenReady,
}: {
	onTokenReady?: (token: string | null) => void;
}) {
	const searchParams = useSearchParams();
	const token = searchParams.get("token") || null;

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<ResetPasswordFormData>({
		resolver: zodResolver(resetPasswordSchema),
	});

	const password = watch("password");

	const getPasswordStrength = (password: string) => {
		const requirements = [
			{ regex: /.{8,}/, text: "At least 8 characters" },
			{ regex: /[A-Z]/, text: "One uppercase letter" },
			{ regex: /[a-z]/, text: "One lowercase letter" },
			{ regex: /[0-9]/, text: "One number" },
		];

		return requirements.map((req) => ({
			...req,
			met: req.regex.test(password || ""),
		}));
	};

	const passwordRequirements = getPasswordStrength(password);

	const onSubmit = async (data: ResetPasswordFormData) => {
		if (!token) {
			toast.error(t("auth.invalidResetLink"));
			return;
		}

		setIsLoading(true);
		try {
			const result = await resetPasswordAction({ ...data, token });

			if (result && result.status_code === 200) {
				toast.success(t("auth.passwordResetSuccess"), {
					description:
						result.message || t("auth.passwordResetSuccessDescription"),
				});
				setIsSuccess(true);
			} else {
				toast.error(t("auth.errorResettingPassword"), {
					description:
						result.message || t("auth.errorResettingPasswordDescription"),
				});
			}
		} catch (error) {
			toast.error(t("auth.errorResettingPassword"), {
				description: t("auth.systemError"),
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Success state
	if (isSuccess) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center p-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6 }}
					className="w-full max-w-md"
				>
					<Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
						<CardContent className="text-center p-8">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
								className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
							>
								<CheckCircle className="w-10 h-10 text-white" />
							</motion.div>

							<h2 className="text-2xl font-bold text-gray-900 mb-4">
								{t("auth.passwordResetSuccess")}
							</h2>

							<p className="text-gray-600 mb-6 leading-relaxed">
								{t("auth.passwordResetSuccessDescription")}
							</p>

							<Button
								asChild
								className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
							>
								<Link href="/auth/login">{t("auth.loginWithNewPassword")}</Link>
							</Button>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		);
	}

	// Invalid token
	if (!token) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
				<Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm max-w-md w-full">
					<CardContent className="text-center p-8">
						<div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
							<X className="w-8 h-8 text-white" />
						</div>
						<h2 className="text-xl font-bold text-gray-900 mb-4">
							{t("auth.invalidResetLink")}
						</h2>
						<p className="text-gray-600 mb-6">
							{t("auth.invalidResetLinkDescription")}
						</p>
						<Button asChild className="w-full">
							<Link href="/auth/forgot-password">
								{t("auth.requestNewLink")}
							</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

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
						<Link href="/auth/login" className="flex items-center">
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
							<Key className="w-8 h-8 text-white" />
						</motion.div>
						<CardTitle className="text-2xl font-bold text-gray-900">
							{t("auth.resetPassword")}
						</CardTitle>
						<p className="text-gray-600 mt-2">
							{t("auth.resetPasswordSubtitle")}
						</p>
					</CardHeader>

					<CardContent className="space-y-6">
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5 }}
								className="space-y-2"
							>
								<Label htmlFor="password" className="text-gray-700">
									{t("auth.newPassword")}
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder={t("auth.newPasswordPlaceholder")}
										className="pl-10 pr-10 h-12"
										{...register("password")}
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
									>
										{showPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>
								{errors.password && (
									<p className="text-sm text-red-600">
										{errors.password.message}
									</p>
								)}

								{/* Password Requirements */}
								{password && (
									<div className="mt-2 p-3 bg-gray-50 rounded-lg">
										<p className="text-xs font-medium text-gray-700 mb-2">
											{t("auth.passwordRequirements")}:
										</p>
										<div className="space-y-1">
											{passwordRequirements.map((req, index) => (
												<div
													key={index}
													className="flex items-center space-x-2"
												>
													{req.met ? (
														<Check className="w-3 h-3 text-green-600" />
													) : (
														<X className="w-3 h-3 text-gray-400" />
													)}
													<span
														className={`text-xs ${
															req.met ? "text-green-600" : "text-gray-500"
														}`}
													>
														{req.text}
													</span>
												</div>
											))}
										</div>
									</div>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 }}
								className="space-y-2"
							>
								<Label htmlFor="confirmPassword" className="text-gray-700">
									{t("auth.confirmNewPassword")}
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<Input
										id="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										placeholder={t("auth.confirmNewPasswordPlaceholder")}
										className="pl-10 pr-10 h-12"
										{...register("confirmPassword")}
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
									>
										{showConfirmPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>
								{errors.confirmPassword && (
									<p className="text-sm text-red-600">
										{errors.confirmPassword.message}
									</p>
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
									disabled={isLoading}
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
										<Key className="w-5 h-5 mr-2" />
									)}
									{isLoading ? t("auth.resetting") : t("auth.resetPassword")}
								</Button>
							</motion.div>
						</form>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8 }}
							className="text-center"
						>
							<p className="text-gray-600">
								{t("auth.rememberPassword")}{" "}
								<Link
									href="/auth/login"
									className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
								>
									{t("auth.backToLogin")}
								</Link>
							</p>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
