"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { departments } from "@/lib/data/contact";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";

export function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		department: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [statusMessage, setStatusMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setStatusMessage("");

		setTimeout(() => {
			// Simulate API call
			setIsSubmitting(false);
			setStatusMessage("Message sent successfully!");
			setFormData({
				name: "",
				email: "",
				phone: "",
				department: "",
				subject: "",
				message: "",
			});
			setTimeout(() => setStatusMessage(""), 5000); // Clear message after 5s
		}, 1500);
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<Card className="p-8 shadow-lg">
			<CardHeader className="p-0 mb-6">
				<CardTitle className="text-2xl font-bold">Send us a Message</CardTitle>
			</CardHeader>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<Label htmlFor="name">Name *</Label>
						<Input
							id="name"
							value={formData.name}
							onChange={(e) => handleInputChange("name", e.target.value)}
							required
						/>
					</div>
					<div>
						<Label htmlFor="email">Email *</Label>
						<Input
							id="email"
							type="email"
							value={formData.email}
							onChange={(e) => handleInputChange("email", e.target.value)}
							required
						/>
					</div>
				</div>
				<div>
					<Label htmlFor="department">Department *</Label>
					<Select
						value={formData.department}
						onValueChange={(value) => handleInputChange("department", value)}
						required
					>
						<SelectTrigger>
							<SelectValue placeholder="Select a department" />
						</SelectTrigger>
						<SelectContent>
							{departments.map((dept) => (
								<SelectItem key={dept.value} value={dept.value}>
									{dept.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="subject">Subject *</Label>
					<Input
						id="subject"
						value={formData.subject}
						onChange={(e) => handleInputChange("subject", e.target.value)}
						required
					/>
				</div>
				<div>
					<Label htmlFor="message">Message *</Label>
					<Textarea
						id="message"
						value={formData.message}
						onChange={(e) => handleInputChange("message", e.target.value)}
						rows={5}
						required
					/>
				</div>
				<div className="flex items-center justify-between">
					<Button
						type="submit"
						size="lg"
						disabled={isSubmitting}
						className="w-full bg-blue-600"
					>
						{isSubmitting ? (
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
								className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
							/>
						) : (
							<Send className="w-5 h-5 mr-2" />
						)}
						<span className="ml-2">
							{isSubmitting ? "Sending..." : "Send Message"}
						</span>
					</Button>
				</div>
				{statusMessage && (
					<p className="text-green-600 text-sm mt-4">{statusMessage}</p>
				)}
			</form>
		</Card>
	);
}
