// FILE: components/layout/footer.tsx

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	Mail,
	Phone,
	MapPin,
	Facebook,
	Youtube,
	Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FaTelegram } from "react-icons/fa";

// Data is moved outside the component for cleaner code
const footerColumns = [
	{
		titleKey: "footer.quickLinks",
		links: [
			{ nameKey: "nav.home", href: "/" },
			{ nameKey: "nav.about", href: "/about" },
			{ nameKey: "nav.structure", href: "/structure" },
			{ nameKey: "nav.videos", href: "/videos" },
		],
	},
	{
		titleKey: "nav.news",
		links: [
			{ nameKey: "nav.latestNews", href: "/news" },
			{ nameKey: "nav.events", href: "/news?category=events" },
		],
	},
	// {
	// 	titleKey: "nav.projects",
	// 	links: [
	// 		{ nameKey: "nav.allProjects", href: "/s" },
	// 		{ nameKey: "nav.community", href: "/s?category=community" },
	// 		{ nameKey: "nav.education", href: "/s?category=education" },
	// 		{ nameKey: "nav.culture", href: "/s?category=culture" },
	// 	],
	// },
];

export const socialLinks: any = [
	{
		name: "Facebook",
		icon: Facebook,
		href: "https://web.facebook.com/profile.php?id=100091461679738",
		color: "hover:text-blue-600",
	},
	{
		name: "Youtube",
		icon: Youtube,
		href: "https://youtube.com/@_mettyeung8858",
		color: "hover:text-red-600",
	},
	{
		name: "Telegram",
		icon: FaTelegram,
		href: "https://t.me/mettyeung",
		color: "hover:text-red-600",
	},
];

export function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="bg-blue-900 text-white relative overflow-hidden">
			{/* Subtle background pattern */}
			<div className="absolute inset-0 bg-[url('/path-to-your-subtle-pattern.svg')] opacity-5"></div>

			<div className="container relative py-16 lg:py-24">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
					{/* Brand Section */}
					<div className="lg:col-span-2">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="space-y-4"
						>
							<Link href="/" className="flex items-center space-x-3 group">
								<Image
									src="/logo-white.png"
									alt="logo"
									width={200}
									height={200}
									className="rounded-xl"
								/>
							</Link>
							<p className="text-blue-200 text-sm leading-relaxed pr-4">
								{t("footer.description")}
							</p>
						</motion.div>
					</div>

					{/* Links Sections */}
					{footerColumns.map((section, index) => (
						<motion.div
							key={section.titleKey}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							className="space-y-4"
						>
							<h3 className="text-md font-semibold text-white tracking-wider uppercase">
								{t(section.titleKey)}
							</h3>
							<ul className="space-y-3">
								{section.links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="text-blue-200 hover:text-white transition-colors duration-200 text-sm"
										>
											{t(link.nameKey)}
										</Link>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				<Separator className="my-12 bg-blue-700" />

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="space-y-4"
					>
						<h3 className="text-md font-semibold text-white tracking-wider uppercase">
							{t("footer.contactInfo.title")}
						</h3>
						<div className="space-y-3">
							<a
								href="tel:+85512345678"
								className="flex items-center space-x-3 text-blue-200 hover:text-white group"
							>
								<Phone className="w-5 h-5" />
								<span className="text-sm">{t("footer.contactInfo.phone")}</span>
							</a>
							<a
								href="mailto:info@mettyerng.org"
								className="flex items-center space-x-3 text-blue-200 hover:text-white group"
							>
								<Mail className="w-5 h-5" />
								<span className="text-sm">{t("footer.contactInfo.email")}</span>
							</a>
							<div className="flex items-center space-x-3 text-blue-200">
								<MapPin className="w-5 h-5" />
								<span className="text-sm">
									{t("footer.contactInfo.address")}
								</span>
							</div>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="space-y-4"
					>
						<h3 className="text-md font-semibold text-white tracking-wider uppercase">
							{t("footer.newsletter.title")}
						</h3>
						<p className="text-blue-200 text-sm">
							{t("footer.newsletter.description")}
						</p>
						<div className="flex space-x-2">
							<Input
								type="email"
								placeholder={t("footer.emailPlaceholder")}
								className="flex-1 bg-blue-800 border-blue-700 text-white placeholder-blue-300 focus:ring-white"
							/>
							<Button className="bg-white text-blue-700 hover:bg-blue-100">
								{t("footer.subscribe")}
							</Button>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-4 md:col-span-2 lg:col-span-1"
					>
						<h3 className="text-md font-semibold text-white tracking-wider uppercase">
							{t("footer.followUs")}
						</h3>
						<div className="flex space-x-2">
							{socialLinks.map((social: any) => (
								<Button
									key={social.name}
									size="icon"
									asChild
									className="text-blue-200 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
								>
									<Link
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										<social.icon className="w-5 h-5" />
									</Link>
								</Button>
							))}
						</div>
					</motion.div>
				</div>

				<Separator className="my-8 bg-blue-700" />

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					className="text-center text-blue-300 text-sm"
				>
					<p className="text-white">
						© {new Date().getFullYear()} Mettyerng. {t("footer.copyright")}
					</p>
				</motion.div>
			</div>
		</footer>
	);
}
