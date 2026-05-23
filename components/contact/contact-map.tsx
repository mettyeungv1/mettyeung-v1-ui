"use client";

import { motion } from "framer-motion";
import { Copy, ExternalLink, MapPin, Navigation, Phone } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import type { IContactSettingsAPI } from "@/lib/types/contact";

interface ContactMapSectionProps {
	settings: IContactSettingsAPI;
}

export function ContactMapSection({ settings }: ContactMapSectionProps) {
	const { language } = useTranslation();

	const embedUrl =
		settings.mapEmbedUrl ||
		"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.287265969562!2d104.89966301136453!3d11.595197200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109539297965083%3A0x7d11e2074597e98c!2sMett%20Yeung%20Association!5e0!3m2!1sen!2skh!4v1707378900000!5m2!1sen!2skh";

	const directionsHref =
		settings.mapLat && settings.mapLng
			? `https://maps.google.com/maps?ll=${settings.mapLat},${settings.mapLng}&z=17&t=m&hl=en&gl=KH&mapclient=embed`
			: "https://maps.google.com/maps?ll=11.595197,104.901852&z=17&t=m&hl=en&gl=KH&mapclient=embed&cid=9012019777218636172";

	const addressText =
		settings.address?.[language] ??
		settings.address?.km ??
		settings.address?.en ??
		"Phnom Penh, Cambodia";

	const coordinates =
		settings.mapLat && settings.mapLng
			? `${settings.mapLat}, ${settings.mapLng}`
			: "11.595197, 104.901852";

	return (
		<section className="relative w-full px-4 pb-20 md:px-0">
			<div className="container mx-auto">
				<div className="mb-8">
					<p className="text-xs font-bold uppercase text-khmer-gold">Find Us</p>
					<h2 className="mt-2 text-3xl font-bold text-gray-950 md:text-4xl">
						Visit Our Office
					</h2>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="relative group"
				>
					<div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-khmer-gold/40 via-primary-900/25 to-primary-600/25 blur opacity-25 transition duration-700 group-hover:opacity-45" />
					<div className="relative grid overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-primary-900/10 ring-1 ring-gray-900/5 lg:grid-cols-[2fr_1fr]">
						<div className="relative h-[320px] overflow-hidden bg-gray-100 md:h-[420px] lg:h-[500px]">
							<iframe
								src={embedUrl}
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								className="absolute inset-0 h-full w-full"
								title="Mett Yeung Association map"
							/>
							<div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary-900/20 to-transparent" />
						</div>

						<div className="relative flex min-h-[360px] flex-col overflow-hidden bg-gradient-to-br from-primary-900 via-primary-900 to-primary-800 p-6 text-white md:p-8">
							<div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-khmer-gold/20 blur-3xl" />
							<div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-primary-400/25 blur-3xl" />

							<div className="relative flex flex-1 flex-col">
								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-khmer-gold text-primary-900 shadow-lg shadow-khmer-gold/20">
										<MapPin className="h-6 w-6" />
									</div>
									<div className="min-w-0">
										<p className="text-xs font-bold uppercase text-khmer-gold">Our Location</p>
										<h3 className="mt-1 text-2xl font-bold leading-tight text-white">
											Mett Yeung Association
										</h3>
									</div>
								</div>

								<div className="mt-7 space-y-3">
									<div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
										<p className="mb-1 text-[11px] font-bold uppercase text-primary-200">
											Office Address
										</p>
										<p className="text-sm font-medium leading-relaxed text-white">
											{addressText}
										</p>
									</div>

									<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
										<div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
											<p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase text-primary-200">
												<Copy className="h-3.5 w-3.5 text-khmer-gold" />
												Coordinates
											</p>
											<p className="break-words font-mono text-xs leading-relaxed text-primary-50">
												{coordinates}
											</p>
										</div>

										{settings.phone && (
											<a
												href={`tel:${settings.phone.replace(/\s/g, "")}`}
												className="group/phone rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khmer-gold"
											>
												<p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase text-primary-200">
													<Phone className="h-3.5 w-3.5 text-khmer-gold" />
													Call Office
												</p>
												<p className="text-sm font-bold text-white transition-colors group-hover/phone:text-khmer-gold">
													{settings.phone}
												</p>
											</a>
										)}
									</div>
								</div>

								<div className="mt-auto pt-8">
									<a
										href={directionsHref}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-khmer-gold px-5 py-3.5 text-sm font-bold text-gray-950 shadow-lg shadow-khmer-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-khmer-gold-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khmer-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
									>
										<Navigation className="h-4 w-4" />
										Get Directions
									</a>
									<a
										href={directionsHref}
										target="_blank"
										rel="noopener noreferrer"
										className="mt-4 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-primary-100 transition-colors hover:text-khmer-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
									>
										Open in Google Maps
										<ExternalLink className="h-4 w-4" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
