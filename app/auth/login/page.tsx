"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { useTranslation } from "@/lib/i18n";
import { loginSchema, LoginFormData } from "@/lib/validations/auth";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { getUserProfileAction } from "@/action/auth/user-action";
import { getUserProfileService } from "@/service/auth/user-service";

export default function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			rememberMe: false,
		},
	});

	const { update } = useSession();

	const rememberMe = watch("rememberMe");

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		try {
			const res = await signIn("credentials", {
				...data,
				redirect: false,
			});

			if (!res || res.error) {
				toast.error(t("auth.toast.loginError"), {
					description: t("auth.toast.loginErrorDescription"),
				});
				return;
			}

			await update();

			toast.success(t("auth.toast.loginSuccess"), {
				description: t("auth.toast.loginSuccessDescription"),
			});

			router.push("/");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSocialAuth = async (provider: string) => {
		setIsLoading(true);
		try {
			// Simulate social auth
			await new Promise((resolve) => setTimeout(resolve, 1500));
			toast.success(t("auth.toast.socialLoginSuccess").replace("{{provider}}", provider));
			router.push("/");
		} catch (error) {
			toast.error(t("auth.toast.socialLoginError").replace("{{provider}}", provider));
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
							<LogIn className="w-8 h-8 text-white" />
						</motion.div>
						<CardTitle className="text-heading-3 text-text-primary">
							{t("auth.login")}
						</CardTitle>
						<p className="mt-2 text-body text-text-secondary">{t("auth.loginSubtitle")}</p>
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
									{t("auth.orContinueWith")}
								</span>
							</div>
						</div> */}

						{/* Login Form */}
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5 }}
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
								transition={{ delay: 0.6 }}
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
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7 }}
								className="flex items-center justify-between"
							>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="rememberMe"
										checked={rememberMe}
										onCheckedChange={(checked) =>
											setValue("rememberMe", checked as boolean)
										}
									/>
									<Label
										htmlFor="rememberMe"
										className="cursor-pointer text-body-sm text-text-secondary"
									>
										{t("auth.rememberMe")}
									</Label>
								</div>
								<Link
									href="/auth/forgot-password"
									className="text-body-sm font-medium text-primary-900 hover:underline"
								>
									{t("auth.forgotPassword")}
								</Link>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8 }}
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
										<LogIn className="w-5 h-5 mr-2" />
									)}
									{isLoading ? t("auth.loggingIn") : t("auth.login")}
								</Button>
							</motion.div>
						</form>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.9 }}
							className="text-center"
						>
							<p className="text-body-sm text-text-secondary">
								{t("auth.noAccount")}{" "}
								<Link
									href="/auth/register"
									className="font-medium text-primary-900 hover:underline"
								>
									{t("auth.register")}
								</Link>
							</p>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	);
}
