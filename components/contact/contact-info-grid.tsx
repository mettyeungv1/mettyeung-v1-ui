"use client";

import { contactInfo } from "@/lib/data/contact";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useTranslation } from "@/lib/i18n";

const MAPS_URL = "https://maps.google.com/maps?ll=11.595197,104.901852&z=17&t=m&hl=en&gl=KH";

const getHref = (titleKey: string, detail: string): string | null => {
	if (titleKey === "contactUs.phone")   return `tel:${detail.replace(/\s/g, "")}`;
	if (titleKey === "contactUs.email")   return `mailto:${detail}`;
	if (titleKey === "contactUs.address") return MAPS_URL;
	return null;
};

export function ContactInfoGrid() {
	const { t } = useTranslation();

	return (
		<section className="bg-gray-50 pb-12 pt-4">
			<div className="container">
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
					{contactInfo.map((info, index) => {
						const Icon = info.icon;
						const isAddress = info.title === "contactUs.address";

						return (
							<AnimatedSection key={info.title} delay={index * 0.08} direction="up">
								<div className="group h-full bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-primary-900 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
									<div className="p-6 flex flex-col gap-4">
										{/* Icon */}
										<div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
											<Icon className="w-6 h-6 text-primary-900" />
										</div>

										{/* Label */}
										<h3 className="text-base font-bold text-gray-900 leading-tight">
											{t(info.title as any)}
										</h3>

										{/* Details */}
										<div className="space-y-1.5">
											{info.details.map((detail, idx) => {
												const href = idx === 0 ? getHref(info.title, detail) : null;
												return href ? (
													<a
														key={idx}
														href={href}
														target={isAddress ? "_blank" : undefined}
														rel={isAddress ? "noopener noreferrer" : undefined}
														className="block text-sm font-medium text-primary-900 hover:text-primary-600 underline-offset-2 hover:underline transition-colors"
													>
														{detail}
													</a>
												) : (
													<p key={idx} className="text-sm text-gray-500 leading-relaxed">
														{detail}
													</p>
												);
											})}
										</div>
									</div>
								</div>
							</AnimatedSection>
						);
					})}
				</div>
			</div>
		</section>
	);
}
