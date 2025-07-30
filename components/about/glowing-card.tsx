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
			<div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
			<div className="relative">{children}</div>
		</motion.div>
	);
}
