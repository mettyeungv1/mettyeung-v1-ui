"use client";
import { motion } from "framer-motion";

export function FloatingElement({
	children,
	delay = 0,
}: {
	children: React.ReactNode;
	delay?: number;
}) {
	return (
		<motion.div
			initial={{ y: 0 }}
			animate={{ y: [-10, 10, -10] }}
			transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}
		>
			{children}
		</motion.div>
	);
}
