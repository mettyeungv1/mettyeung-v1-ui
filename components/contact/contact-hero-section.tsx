"use client";

import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Users, CalendarDays, Building2 } from "lucide-react";
import type { IContactSettingsAPI } from "@/lib/types/contact";

interface ContactHeroSectionProps {
	settings: IContactSettingsAPI;
}

export function ContactHeroSection({ settings }: ContactHeroSectionProps) {
	const { t } = useTranslation();

	const stats = [
		{ icon: Users,        labelKey: "contact.statsMembers", value: `${settings.statsMembersCount}+` },
		{ icon: CalendarDays, labelKey: "contact.statsYears",   value: `${settings.statsYearsCount}+`   },
		{ icon: Building2,    labelKey: "contact.statsAssoc",   value: `${settings.statsAssociationsCount}+`  },
	];

	const mapsHref =
		settings.mapLat && settings.mapLng
			? `https://maps.google.com/maps?ll=${settings.mapLat},${settings.mapLng}&z=17`
			: "https://maps.google.com/maps?ll=11.595197,104.901852&z=17";

	return (
		<section className="relative pt-32 pb-32 md:pt-44 md:pb-40 overflow-hidden bg-primary-900">
			{/* Subtle radial glow — on-brand only */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-[-15%] right-[-8%] w-[520px] h-[520px] rounded-full bg-primary-600/25 blur-[100px]" />
				<div className="absolute bottom-[-15%] left-[-8%] w-[440px] h-[440px] rounded-full bg-primary-800/30 blur-[90px]" />
			</div>

			{/* Dot grid */}
			<div
				className="absolute inset-0 opacity-[0.05] pointer-events-none"
				style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
			/>

			{/* Khmer-gold top accent bar */}
			<div className="absolute top-0 left-0 right-0 h-1 bg-khmer-gold" />

			<div className="container relative z-10 max-w-5xl mx-auto px-4 text-center">

				{/* Badge */}
				<motion.div
					initial={{ opacity: 0, y: -16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-8"
				>
					<MessageCircle className="w-4 h-4 text-khmer-gold" />
					{t("contact.heroTagline")}
				</motion.div>

				{/* Title */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
				>
					{t("contact.title")}
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed mb-10"
				>
					{t("contact.subtitle")}
				</motion.p>

				{/* CTAs */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
				>
					<a
						href="#contact-form"
						className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-khmer-gold hover:bg-khmer-gold-600 text-gray-900 font-bold text-base transition-all duration-200 shadow-lg hover:-translate-y-0.5"
					>
						<Mail className="w-5 h-5" />
						{t("contact.formTitle")}
					</a>
					<a
						href={mapsHref}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base transition-all duration-200 hover:-translate-y-0.5"
					>
						<MapPin className="w-5 h-5" />
						{t("contact.getDirections")}
					</a>
				</motion.div>

				{/* Stats */}
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.4 }}
					className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
				>
					{stats.map(({ icon: Icon, labelKey, value }) => (
						<div
							key={labelKey}
							className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-white/10 border border-white/15"
						>
							<Icon className="w-5 h-5 text-khmer-gold mb-1" />
							<span className="text-2xl font-bold text-white">{value}</span>
							<span className="text-xs text-primary-200 text-center leading-tight">
								{t(labelKey as any)}
							</span>
						</div>
					))}
				</motion.div>
			</div>

			{/* Wave — matches bg-gray-50 of next section */}
			<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
				<svg viewBox="0 0 1200 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[60px] md:h-[80px]">
					<path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" fill="#f9fafb" />
				</svg>
			</div>
		</section>
	);
}
