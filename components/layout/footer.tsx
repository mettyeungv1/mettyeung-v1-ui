// FILE: components/layout/footer.tsx

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	Mail,
	Phone,
	MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import type { ISocialLinkAPI, IContactSettingsAPI } from "@/lib/types/contact";
import { getSocialIcon } from "@/lib/utils/social-icon-map";
import { safeExternalHttpsUrl } from "@/lib/security/url";

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
];

interface FooterProps {
	socialLinks: ISocialLinkAPI[];
	contactSettings: IContactSettingsAPI;
}

export function Footer({ socialLinks, contactSettings }: FooterProps) {
	const { t, language } = useTranslation();

	const activeLinks = socialLinks
		.map((link) => ({ ...link, url: safeExternalHttpsUrl(link.url) }))
		.filter((link): link is ISocialLinkAPI => link.isActive && Boolean(link.url))
		.sort((a, b) => a.order - b.order);

	const phone = contactSettings.phone;
	const email = contactSettings.email;
	const address = contactSettings.address?.[language] ?? contactSettings.address?.["km"] ?? null;
	const copyrightName = contactSettings.copyrightText || "Mett Yeung Association";
	const aboutShort = contactSettings.aboutShort?.[language] ?? contactSettings.aboutShort?.["km"] ?? null;

	return (
		<footer className="surface-inverse relative overflow-hidden">
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
									alt="Mett Yeung Association logo"
									width={200}
									height={200}
									className="rounded-xl"
								/>
							</Link>
							<p className="pr-4 text-body-sm text-white/75">
								{aboutShort || t("footer.description")}
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
							<h3 className="text-label text-white">
								{t(section.titleKey)}
							</h3>
							<ul className="space-y-3">
								{section.links.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="text-body-sm text-white/75 transition-colors duration-200 hover:text-white"
										>
											{t(link.nameKey)}
										</Link>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				<Separator className="my-12 bg-white/15" />

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="space-y-4"
					>
						<h3 className="text-label text-white">
							{t("footer.contactInfo.title")}
						</h3>
						<div className="space-y-3 text-white/75">
							{phone && (
								<a
									href={`tel:${phone.replace(/\s/g, "")}`}
									className="group flex items-center gap-3 transition-colors duration-200 hover:text-white"
								>
									<Phone className="h-5 w-5 shrink-0 text-white/60 transition-colors duration-200 group-hover:text-white" />
									<span className="text-body-sm text-inherit">{phone}</span>
								</a>
							)}
							{email && (
								<a
									href={`mailto:${email}`}
									className="group flex items-center gap-3 transition-colors duration-200 hover:text-white"
								>
									<Mail className="h-5 w-5 shrink-0 text-white/60 transition-colors duration-200 group-hover:text-white" />
									<span className="text-body-sm text-inherit">{email}</span>
								</a>
							)}
							{address && (
								<div className="flex w-full flex-col space-y-1">
									<div className="flex items-start gap-3">
										<MapPin className="mt-1 h-5 w-5 shrink-0 text-white/60" />
										<span className="text-body-sm text-inherit">{address}</span>
									</div>
								</div>
							)}
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="space-y-4"
					>
						<h3 className="text-label text-white">
							{t("about.mission.title")}
						</h3>
						<div className="relative mt-4 rounded-xl border border-border-inverse bg-white/10 p-card-sm">
							<div className="absolute -top-4 -left-2 text-6xl text-khmer-gold opacity-40 font-serif leading-none">&quot;</div>
							<p className="relative z-10 pl-3 text-body-sm italic text-white/75">
								{t("about.mission.desc1")}
							</p>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-4 md:col-span-2 lg:col-span-1"
					>
						<h3 className="text-label text-white">
							{t("footer.followUs")}
						</h3>
						<div className="flex space-x-2">
							{activeLinks.map((social) => {
								const Icon = getSocialIcon(social.iconName ?? social.platform);
								return (
									<Button
										key={social.id}
										variant="ghost"
										size="icon"
										asChild
										className="rounded-full text-white/75 transition-all duration-300 hover:bg-white/10 hover:text-white"
									>
										<Link
											href={social.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<Icon className="w-5 h-5" />
										</Link>
									</Button>
								);
							})}
						</div>
					</motion.div>
				</div>

				<Separator className="my-8 bg-white/15" />

				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
					className="text-center"
				>
					<p className="text-body-sm text-white/75">
						&copy; {new Date().getFullYear()} {copyrightName}. {t("footer.copyright")}
					</p>
				</motion.div>
			</div>
		</footer>
	);
}
