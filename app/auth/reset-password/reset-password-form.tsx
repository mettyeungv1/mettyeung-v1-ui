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

export default function ResetPasswordForm({
	onTokenReady,
}: {
	onTokenReady?: (token: string | null) => void;
}) {
	const searchParams = useSearchParams();
	const token = searchParams.get("token") || null;

	if (onTokenReady) onTokenReady(token);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();
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

	// Password strength checker
	const getPasswordStrength = (password: string) => {
		const requirements = [
			{ regex: /.{8,}/, text: t("auth.passwordRules.minLength") },
			{ regex: /[A-Z]/, text: t("auth.passwordRules.uppercase") },
			{ regex: /[a-z]/, text: t("auth.passwordRules.lowercase") },
			{ regex: /[0-9]/, text: t("auth.passwordRules.number") },
		];

		return requirements.map((req) => ({
			...req,
			met: req.regex.test(password || ""),
		}));
	};

	const passwordRequirements = getPasswordStrength(password);

	const onSubmit = async (data: ResetPasswordFormData) => {
		if (!token) {
			toast.error(t("auth.toast.invalidResetToken"));
			return;
		}

		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 2000));

			setIsSuccess(true);

			toast.success(t("auth.toast.resetSuccess"), {
				description: t("auth.toast.resetSuccessDescription"),
			});
		} catch (error) {
			toast.error(t("auth.toast.resetError"), {
				description: t("auth.toast.tryAgain"),
			});
		} finally {
			setIsLoading(false);
		}
	};

	// Success state
	if (isSuccess) {
		return (
			<div className="surface-page flex min-h-screen items-center justify-center p-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.6 }}
					className="w-full max-w-md"
				>
					<Card className="shadow-surface">
						<CardContent className="text-center p-8">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
								className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-success shadow-surface"
							>
								<CheckCircle className="w-10 h-10 text-white" />
							</motion.div>

							<h2 className="mb-4 text-heading-3 text-text-primary">
								{t("auth.passwordResetSuccess")}
							</h2>

							<p className="mb-6 text-body leading-relaxed text-text-secondary">
								{t("auth.passwordResetSuccessDescription")}
							</p>

							<Button
								asChild
								className="w-full"
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
			<div className="surface-page flex min-h-screen items-center justify-center p-4">
				<Card className="w-full max-w-md shadow-surface">
					<CardContent className="text-center p-8">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-error">
							<X className="w-8 h-8 text-white" />
						</div>
						<h2 className="mb-4 text-heading-4 text-text-primary">
							{t("auth.invalidResetLink")}
						</h2>
						<p className="mb-6 text-body text-text-secondary">
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
						<Link href="/auth/login" className="flex items-center">
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
							<Key className="w-8 h-8 text-white" />
						</motion.div>
						<CardTitle className="text-heading-3 text-text-primary">
							{t("auth.resetPassword")}
						</CardTitle>
						<p className="mt-2 text-body text-text-secondary">
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
								<Label htmlFor="password">
									{t("auth.newPassword")}
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
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
										className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
									>
										{showPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>
								{errors.password && (
									<p className="text-body-sm text-error">
										{errors.password.message}
									</p>
								)}

								{/* Password Requirements */}
								{password && (
									<div className="mt-2 rounded-lg bg-surface-muted p-3">
										<p className="mb-2 text-caption font-medium text-text-primary">
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
														<X className="w-3 h-3 text-text-tertiary" />
													)}
													<span
														className={`text-xs ${
															req.met ? "text-success" : "text-text-secondary"
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
								<Label htmlFor="confirmPassword">
									{t("auth.confirmNewPassword")}
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
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
										className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
									>
										{showConfirmPassword ? (
											<EyeOff className="w-4 h-4" />
										) : (
											<Eye className="w-4 h-4" />
										)}
									</button>
								</div>
								{errors.confirmPassword && (
									<p className="text-body-sm text-error">
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
									className="h-12 w-full"
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
							<p className="text-body-sm text-text-secondary">
								{t("auth.rememberPassword")}{" "}
								<Link
									href="/auth/login"
									className="font-medium text-primary-900 hover:underline"
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
