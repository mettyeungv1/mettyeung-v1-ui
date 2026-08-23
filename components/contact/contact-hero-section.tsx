"use client";

import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";
export function ContactHeroSection() {
	const { t } = useTranslation();

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
				<div className="mx-auto max-w-4xl text-center">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
						className="text-center"
					>
						<p className="mb-4 text-caption font-bold uppercase tracking-[0.2em] text-khmer-gold">
							{t("contact.reachUs")}
						</p>
						<h1 className="text-balance text-display-lg text-white">
							<span className="block">{t("contact.title")}</span>
							<span className="block text-khmer-gold">{t("contact.letsConnect")}</span>
						</h1>

						<p className="mx-auto mt-6 max-w-2xl text-body-lg text-primary-100">
							{t("contact.subtitle")}
						</p>
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
					<polygon points="0,42 1200,0 1200,90 0,90" fill="#ffffff" />
				</svg>
			</div>
		</section>
	);
}
