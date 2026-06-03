"use client";

import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
import {
	ChevronRight,
	Mail,
	MapPin,
	Phone,
} from "lucide-react";
import type { IContactSettingsAPI } from "@/lib/types/contact";

interface ContactHeroSectionProps {
	settings: IContactSettingsAPI;
}

export function ContactHeroSection({ settings }: ContactHeroSectionProps) {
	const { t, language } = useTranslation();

	const addressText =
		settings.address?.[language] ??
		settings.address?.km ??
		settings.address?.en ??
		t("contact.defaultAddress");

	const mapsHref =
		settings.mapLat && settings.mapLng
			? `https://maps.google.com/maps?ll=${settings.mapLat},${settings.mapLng}&z=17`
			: "https://maps.google.com/maps?ll=11.595197,104.901852&z=17";

	const contactRows = [
		{
			icon: Phone,
			label: t("contact.phone"),
			value: settings.phone ?? "015 220 320",
			href: `tel:${(settings.phone ?? "015 220 320").replace(/\s/g, "")}`,
		},
		{
			icon: Mail,
			label: t("contact.email"),
			value: settings.email ?? "mettyeung@gmail.com",
			href: `mailto:${settings.email ?? "mettyeung@gmail.com"}`,
		},
		{
			icon: MapPin,
			label: t("contact.address"),
			value: addressText,
			href: mapsHref,
			external: true,
		},
	];

	return (
		<section className="relative overflow-hidden bg-primary-900 pt-28 pb-32 md:pt-36 md:pb-40">
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-[-18%] right-[-8%] h-[560px] w-[560px] rounded-full bg-khmer-gold/20 blur-[110px]" />
				<div className="absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-primary-600/30 blur-[100px]" />
			</div>

			<div
				className="absolute inset-0 opacity-[0.06] pointer-events-none"
				style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
			/>
			<div
				className="absolute inset-0 opacity-[0.03] pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(135deg, #fff 1px, transparent 1px), linear-gradient(45deg, #fff 1px, transparent 1px)",
					backgroundSize: "52px 52px",
				}}
			/>

			<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-khmer-gold to-transparent" />

			<div className="container relative z-10">
				<div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.9fr)]">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
						className="text-center lg:text-left"
					>
						<h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:mx-0 lg:text-7xl">
							<span className="block">{t("contact.title")}</span>
							<span className="block text-khmer-gold">{t("contact.letsConnect")}</span>
						</h1>

						<p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-primary-100 sm:text-lg md:text-xl lg:mx-0">
							{t("contact.subtitle")}
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 28, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
						className="relative mx-auto w-full max-w-md lg:mx-0"
					>
						<div className="absolute -inset-5 rounded-[2rem] bg-khmer-gold/25 blur-3xl" />
						<div className="relative rounded-3xl border border-white/20 bg-white/10 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
							<div className="overflow-hidden rounded-[1.35rem] bg-white text-gray-900">
								<div className="bg-primary-900 px-6 py-5">
									<div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-khmer-gold text-primary-900">
										<Mail className="h-5 w-5" />
									</div>
									<p className="text-xs font-bold uppercase text-khmer-gold">{t("contact.reachUs")}</p>
									<h2 className="mt-1 text-2xl font-bold text-white">{t("contact.info")}</h2>
								</div>

								<div className="space-y-3 p-4">
									{contactRows.map(({ icon: Icon, label, value, href, external }) => (
										<a
											key={label}
											href={href}
											target={external ? "_blank" : undefined}
											rel={external ? "noopener noreferrer" : undefined}
											className="group/row flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-4 text-left transition-all duration-300 hover:border-khmer-gold/40 hover:bg-khmer-gold-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900"
										>
											<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-900/10 text-primary-900">
												<Icon className="h-5 w-5" />
											</span>
											<span className="min-w-0 flex-1">
												<span className="block text-xs font-bold uppercase text-gray-500">{label}</span>
												<span className="line-clamp-2 break-words text-sm font-semibold text-gray-950">
													{value}
												</span>
											</span>
											<ChevronRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover/row:translate-x-0.5 group-hover/row:text-khmer-gold" />
										</a>
									))}
								</div>

								<div className="border-t border-gray-100 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-600">
									{t("contact.chooseMethod")}
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>

			<div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
				<svg
					viewBox="0 0 1200 90"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					className="block h-[64px] w-full md:h-[90px]"
					aria-hidden="true"
				>
					<polygon points="0,42 1200,0 1200,90 0,90" fill="#f9fafb" />
				</svg>
			</div>
		</section>
	);
}
