"use-client";
import { motion } from "framer-motion";

export function GlowingCard({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.3 }}
			className={`relative group ${className}`}
		>
			<div className="absolute -inset-0.5 rounded-xl bg-primary-900/10 opacity-0 blur transition duration-500 group-hover:opacity-100" />
			<div className="relative">{children}</div>
		</motion.div>
	);
}
