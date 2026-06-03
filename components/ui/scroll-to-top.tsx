"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function ScrollToTop() {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 400);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const scrollToTop = () =>
		window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<button
			onClick={scrollToTop}
			aria-label={t("common.scrollToTop")}
			className={[
				// Position — sits above the mobile action bar on small screens
				"fixed right-4 lg:right-6 z-50",
				"bottom-24 lg:bottom-8",
				// Shape & colour
				"w-14 h-14 rounded-full",
				"bg-primary-600 text-white",
				"flex items-center justify-center",
				"shadow-lg shadow-primary-600/30",
				// Hover
				"hover:bg-primary-700 hover:shadow-primary-600/40",
				"hover:scale-110",
				// Transition
				"transition-all duration-300",
				// Visibility — slide up when visible, slide down when hidden
				visible
					? "opacity-100 translate-y-0 pointer-events-auto"
					: "opacity-0 translate-y-4 pointer-events-none",
				// Never show in print
				"print:hidden",
			].join(" ")}
		>
			<ChevronUp className="w-6 h-6" />
		</button>
	);
}
