"use client";

import { contactInfo } from "@/lib/data/contact";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";

export function ContactInfoGrid() {
	const { t } = useTranslation();
	return (
		<section className="section-padding bg-white">
			<div className="container">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{contactInfo.map((info, index) => (
						<AnimatedSection key={info.title} delay={index * 0.1}>
							<Card className="text-center h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
								<CardContent className="p-6">
									<div
										className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
									>
										<info.icon className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-lg font-bold text-gray-900">
										{t(info.title)}
									</h3>
									<div className="space-y-1">
										{info.details.map((detail, idx) => (
											<p key={idx} className="text-gray-600 text-sm">
												{detail}
											</p>
										))}
									</div>
								</CardContent>
							</Card>
						</AnimatedSection>
					))}
				</div>
			</div>
		</section>
	);
}
