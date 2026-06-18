"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Eye,
	EyeOff,
	Mail,
	Lock,
	User,
	ArrowLeft,
	UserPlus,
	Check,
	X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { useTranslation } from "@/lib/i18n";
import { registerSchema, RegisterFormData } from "@/lib/validations/auth";
import { toast } from "sonner";
import { registerAction } from "@/action/auth/register-action";
// 1. Import your server action

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			agreeToTerms: false,
		},
	});

	const agreeToTerms = watch("agreeToTerms");
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

	// 2. This function now calls the server action and handles the real API response
	const onSubmit = async (data: RegisterFormData) => {
		setIsLoading(true);
		try {
			// Call the server action with the validated form data
			const result = await registerAction(data);

			// Check the response from your API. (Assuming 201 is success for creation)
			if (result && result.status_code === 201) {
				toast.success(t("auth.toast.registerSuccess"), {
					description:
						result.message || t("auth.toast.registerSuccessDescription"),
				});
				// Redirect to OTP verification on success
				router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`);
			} else {
				// If the API returns an error (e.g., email exists), display it
				toast.error(t("auth.toast.registerError"), {
					description: result.message || t("auth.toast.tryAgain"),
				});
			}
		} catch (error) {
			// This catches network failures or if the server action itself throws an error
			toast.error(t("auth.toast.systemError"), {
				description: t("auth.toast.serverConnectionError"),
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleSocialAuth = async (provider: string) => {
		setIsLoading(true);
		try {
			// Simulate social auth
			await new Promise((resolve) => setTimeout(resolve, 1500));
			toast.success(t("auth.toast.socialRegisterSuccess").replace("{{provider}}", provider));
			router.push("/");
		} catch (error) {
			toast.error(t("auth.toast.socialRegisterError").replace("{{provider}}", provider));
		} finally {
			setIsLoading(false);
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
						<Link href="/" className="flex items-center">
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
							<UserPlus className="w-8 h-8 text-white" />
						</motion.div>
						<CardTitle className="text-heading-3 text-text-primary">
							{t("auth.register")}
						</CardTitle>
						<p className="mt-2 text-body text-text-secondary">{t("auth.registerSubtitle")}</p>
					</CardHeader>

					<CardContent className="space-y-6">
						{/* Social Auth */}
						{/* <SocialAuthButtons
							isLoading={isLoading}
							onGoogleAuth={() => handleSocialAuth("Google")}
							onTelegramAuth={() => handleSocialAuth("Telegram")}
						/>

						<div className="relative">
							<Separator />
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="bg-white px-4 text-sm text-gray-500">
									{t("auth.orRegisterWith")}
								</span>
							</div>
						</div> */}

						{/* Register Form */}
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5 }}
								className="space-y-2"
							>
								<Label htmlFor="name">
									{t("auth.fullName")}
								</Label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
									<Input
										id="name"
										type="text"
										placeholder={t("auth.fullNamePlaceholder")}
										className="pl-10 h-12"
										{...register("name")}
									/>
								</div>
								{errors.name && (
									<p className="text-body-sm text-error">{errors.name.message}</p>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 }}
								className="space-y-2"
							>
								<Label htmlFor="email">
									{t("auth.email")}
								</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
									<Input
										id="email"
										type="email"
										placeholder={t("auth.emailPlaceholder")}
										className="pl-10 h-12"
										{...register("email")}
									/>
								</div>
								{errors.email && (
									<p className="text-body-sm text-error">{errors.email.message}</p>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.7 }}
								className="space-y-2"
							>
								<Label htmlFor="password">
									{t("auth.password")}
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
									<Input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder={t("auth.passwordPlaceholder")}
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
								transition={{ delay: 0.8 }}
								className="space-y-2"
							>
								<Label htmlFor="confirmPassword">
									{t("auth.confirmPassword")}
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
									<Input
										id="confirmPassword"
										type={showConfirmPassword ? "text" : "password"}
										placeholder={t("auth.confirmPasswordPlaceholder")}
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
								transition={{ delay: 0.9 }}
								className="space-y-2"
							>
								<div className="flex items-start space-x-2">
									<Checkbox
										id="agreeToTerms"
										checked={agreeToTerms}
										onCheckedChange={(checked) =>
											setValue("agreeToTerms", checked as boolean)
										}
										className="mt-1"
									/>
									<Label
										htmlFor="agreeToTerms"
										className="cursor-pointer text-body-sm leading-relaxed text-text-secondary"
									>
										{t("auth.agreeToTerms")}{" "}
										<Link
											href="/terms"
											className="font-medium text-primary-900 hover:underline"
										>
											{t("auth.termsOfService")}
										</Link>{" "}
										{t("auth.and")}{" "}
										<Link
											href="/privacy"
											className="font-medium text-primary-900 hover:underline"
										>
											{t("auth.privacyPolicy")}
										</Link>
									</Label>
								</div>
								{errors.agreeToTerms && (
									<p className="text-body-sm text-error">
										{errors.agreeToTerms.message}
									</p>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 1.0 }}
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
										<UserPlus className="w-5 h-5 mr-2" />
									)}
									{isLoading ? t("auth.registering") : t("auth.register")}
								</Button>
							</motion.div>
						</form>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.1 }}
							className="text-center"
						>
							<p className="text-body-sm text-text-secondary">
								{t("auth.haveAccount")}{" "}
								<Link
									href="/auth/login"
									className="font-medium text-primary-900 hover:underline"
								>
									{t("auth.login")}
								</Link>
							</p>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
