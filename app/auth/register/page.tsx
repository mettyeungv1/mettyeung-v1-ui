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
			{ regex: /.{8,}/, text: "យ៉ាងហោចណាស់ 8 តួអក្សរ" },
			{ regex: /[A-Z]/, text: "អក្សរធំ 1 តួ" },
			{ regex: /[a-z]/, text: "អក្សរតូច 1 តួ" },
			{ regex: /[0-9]/, text: "លេខ 1 តួ" },
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
				toast.success("ចុះឈ្មោះជោគជ័យ!", {
					description:
						result.message || "សូមពិនិត្យអ៊ីមែលរបស់អ្នកដើម្បីបញ្ជាក់គណនី",
				});
				// Redirect to OTP verification on success
				router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`);
			} else {
				// If the API returns an error (e.g., email exists), display it
				toast.error("មានបញ្ហាក្នុងការចុះឈ្មោះ", {
					description: result.message || "សូមព្យាយាមម្តងទៀត",
				});
			}
		} catch (error) {
			// This catches network failures or if the server action itself throws an error
			toast.error("មានបញ្ហាប្រព័ន្ធ", {
				description: "មិនអាចភ្ជាប់ទៅម៉ាស៊ីនមេបានទេ។ សូមព្យាយាមម្តងទៀត។",
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
			toast.success(`ចុះឈ្មោះជាមួយ ${provider} ជោគជ័យ!`);
			router.push("/");
		} catch (error) {
			toast.error(`មានបញ្ហាក្នុងការចុះឈ្មោះជាមួយ ${provider}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
			{/* Background decoration */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 blur-3xl" />
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full opacity-20 blur-3xl" />
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
						className="text-gray-600 hover:text-green-600"
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
							className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
						>
							<UserPlus className="w-8 h-8 text-white" />
						</motion.div>
						<CardTitle className="text-2xl font-bold text-gray-900">
							{t("auth.register")}
						</CardTitle>
						<p className="text-gray-600 mt-2">{t("auth.registerSubtitle")}</p>
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
								<Label htmlFor="name" className="text-gray-700">
									{t("auth.fullName")}
								</Label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
									<Input
										id="name"
										type="text"
										placeholder={t("auth.fullNamePlaceholder")}
										className="pl-10 h-12"
										{...register("name")}
									/>
								</div>
								{errors.name && (
									<p className="text-sm text-red-600">{errors.name.message}</p>
								)}
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.6 }}
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
								transition={{ delay: 0.7 }}
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
								transition={{ delay: 0.8 }}
								className="space-y-2"
							>
								<Label htmlFor="confirmPassword" className="text-gray-700">
									{t("auth.confirmPassword")}
								</Label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
										className="text-sm text-gray-600 cursor-pointer leading-relaxed"
									>
										{t("auth.agreeToTerms")}{" "}
										<Link
											href="/terms"
											className="text-green-600 hover:text-green-700 hover:underline"
										>
											{t("auth.termsOfService")}
										</Link>{" "}
										{t("auth.and")}{" "}
										<Link
											href="/privacy"
											className="text-green-600 hover:text-green-700 hover:underline"
										>
											{t("auth.privacyPolicy")}
										</Link>
									</Label>
								</div>
								{errors.agreeToTerms && (
									<p className="text-sm text-red-600">
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
									className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium"
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
							<p className="text-gray-600">
								{t("auth.haveAccount")}{" "}
								<Link
									href="/auth/login"
									className="text-green-600 hover:text-green-700 font-medium hover:underline"
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
