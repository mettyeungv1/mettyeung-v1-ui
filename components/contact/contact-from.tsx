"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { departments } from "@/lib/data/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/lib/i18n";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Send, CheckCircle2, Loader2, User, Mail, MessageSquare, BookOpen } from "lucide-react";

export function ContactForm() {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({
		name: "", email: "", department: "", subject: "", message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
			setSuccess(true);
			setFormData({ name: "", email: "", department: "", subject: "", message: "" });
			setTimeout(() => setSuccess(false), 6000);
		}, 1500);
	};

	const set = (field: string, value: string) =>
		setFormData((prev) => ({ ...prev, [field]: value }));

	return (
		<div id="contact-form" className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
			{/* Header — solid primary-900, no gradient */}
			<div className="bg-primary-900 px-8 py-7">
				<div className="flex items-center gap-3 mb-1">
					<div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
						<MessageSquare className="w-5 h-5 text-white" />
					</div>
					<h2 className="text-heading-4 text-white">{t("contact.formTitle")}</h2>
				</div>
				<p className="text-body-sm text-primary-200 pl-12">
					{t("contact.formDesc")}
				</p>
			</div>

			<div className="p-8">
				{/* Success banner */}
				<AnimatePresence>
					{success && (
						<motion.div
							initial={{ opacity: 0, y: -8, height: 0 }}
							animate={{ opacity: 1, y: 0, height: "auto" }}
							exit={{ opacity: 0, y: -8, height: 0 }}
							className="mb-6 flex items-center gap-3 px-5 py-4 bg-green-50 border border-green-200 rounded-2xl text-green-800"
						>
							<CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
							<p className="text-body-sm font-medium">{t("contact.successMsg")}</p>
						</motion.div>
					)}
				</AnimatePresence>

				<form onSubmit={handleSubmit} className="space-y-5">
					{/* Name + Email */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div className="space-y-1.5">
							<Label htmlFor="name" className="flex items-center gap-1.5">
								<User className="w-3.5 h-3.5 text-gray-400" />
								{t("contact.name")} <span className="text-red-400">*</span>
							</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) => set("name", e.target.value)}
								placeholder={t("contact.namePlaceholder")}
								required
								className="rounded-xl border-gray-200 focus:border-primary-900 focus:ring-primary-900/20 h-11"
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="email" className="flex items-center gap-1.5">
								<Mail className="w-3.5 h-3.5 text-gray-400" />
								{t("contact.email")} <span className="text-red-400">*</span>
							</Label>
							<Input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) => set("email", e.target.value)}
								placeholder={t("contact.emailPlaceholder")}
								required
								className="rounded-xl border-gray-200 focus:border-primary-900 focus:ring-primary-900/20 h-11"
							/>
						</div>
					</div>

					{/* Department */}
					<div className="space-y-1.5">
						<Label className="flex items-center gap-1.5">
							<BookOpen className="w-3.5 h-3.5 text-gray-400" />
							{t("contact.department")} <span className="text-red-400">*</span>
						</Label>
						<Select value={formData.department} onValueChange={(v) => set("department", v)} required>
							<SelectTrigger className="rounded-xl border-gray-200 h-11">
								<SelectValue placeholder={t("contact.selectDept")} />
							</SelectTrigger>
							<SelectContent>
								{departments.map((dept) => (
									<SelectItem key={dept.value} value={dept.value}>
										{t(dept.label as any)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Subject */}
					<div className="space-y-1.5">
						<Label htmlFor="subject">
							{t("contact.subject")} <span className="text-red-400">*</span>
						</Label>
						<Input
							id="subject"
							value={formData.subject}
							onChange={(e) => set("subject", e.target.value)}
							placeholder={t("contact.subjectPlaceholder")}
							required
							className="rounded-xl border-gray-200 focus:border-primary-900 focus:ring-primary-900/20 h-11"
						/>
					</div>

					{/* Message */}
					<div className="space-y-1.5">
						<Label htmlFor="message" className="flex items-center justify-between">
							<span>{t("contact.message")} <span className="text-red-400">*</span></span>
							<span className="text-caption text-gray-400 font-normal">{formData.message.length}/500</span>
						</Label>
						<Textarea
							id="message"
							value={formData.message}
							onChange={(e) => set("message", e.target.value)}
							placeholder={t("contact.messagePlaceholder")}
							rows={5}
							maxLength={500}
							required
							className="rounded-xl border-gray-200 focus:border-primary-900 focus:ring-primary-900/20 resize-none"
						/>
					</div>

					{/* Submit */}
					<Button
						type="submit"
						size="lg"
						disabled={isSubmitting}
						className="w-full h-12 rounded-xl bg-primary-900 hover:bg-primary-950 text-white gap-2 shadow-md shadow-primary-900/20 hover:shadow-primary-900/30 transition-all duration-200 disabled:opacity-60"
					>
						{isSubmitting ? (
							<><Loader2 className="w-5 h-5 animate-spin" />{t("contact.sending")}</>
						) : (
							<><Send className="w-5 h-5" />{t("contact.send")}</>
						)}
					</Button>
				</form>
			</div>
		</div>
	);
}
