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

	const rememberMe = watch("rememberMe");

	const onSubmit = async (data: LoginFormData) => {
		setIsLoading(true);
		try {
			const res = await signIn("credentials", {
				...data,
				redirect: false,
			});

			if (res?.error) {
				toast.error("មានបញ្ហាក្នុងការចូលប្រើប្រាស់", {
					description: "សូមពិនិត្យអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នក",
				});
				return;
			}

			await getUserProfileAction();

			toast.success("ចូលប្រើប្រាស់ជោគជ័យ!", {
				description: "អ្នកនឹងត្រូវបានបញ្ជូនទៅទំព័រដើម",
			});

			router.push("/"); // force redirect to home
		} catch (error) {
			toast.error("មានបញ្ហាក្នុងការចូលប្រើប្រាស់", {
				description: "សូមពិនិត្យអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នក",
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
			toast.success(`ចូលប្រើប្រាស់ជាមួយ ${provider} ជោគជ័យ!`);
			router.push("/");
		} catch (error) {
			toast.error(`មានបញ្ហាក្នុងការចូលប្រើប្រាស់ជាមួយ ${provider}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl" />
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
						className="text-gray-600 hover:text-blue-600"
					>
						<Link href="/" className="flex items-center">
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
							className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
						>
							<LogIn className="w-8 h-8 text-white" />
						</motion.div>
						<CardTitle className="text-2xl font-bold text-gray-900">
							{t("auth.login")}
						</CardTitle>
						<p className="text-gray-600 mt-2">{t("auth.loginSubtitle")}</p>
					</CardHeader>

					<CardContent className="space-y-6">
						{/* Social Auth */}
						<SocialAuthButtons
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
						</div>

						{/* Login Form */}
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.5 }}
								className="space-y-2"
							>
								<Label htmlFor="email" className="text-gray-700">
									{t("auth.email")}
								</Label>
								<div className="relative">
									<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<Input
										id="email"
										type="email"
										placeholder={t("auth.emailPlaceholder")}
										className="pl-10 h-12"
										{...register("email")}
									/>
								</div>
								{errors.email && (
									<p className="text-sm text-red-600">{errors.email.message}</p>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 }}
								className="space-y-2"
							>
								<Label htmlFor="password" className="text-gray-700">
									{t("auth.password")}
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
										className="text-sm text-gray-600 cursor-pointer"
									>
										{t("auth.rememberMe")}
									</Label>
								</div>
								<Link
									href="/auth/forgot-password"
									className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
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
									className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
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
							<p className="text-gray-600">
								{t("auth.noAccount")}{" "}
								<Link
									href="/auth/register"
									className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
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
