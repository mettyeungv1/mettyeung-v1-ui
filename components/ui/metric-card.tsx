"use client";

import React, { useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
	title: string;
	value: number;
	suffix?: string;
	icon: LucideIcon;
	description: string;
	delay?: number;
}

// Animated number component
function AnimatedNumber({ value }: { value: number }) {
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const controls = animate(0, value, {
			duration: 1.5,
			delay: 0.2,
			ease: "easeOut",
			onUpdate(latest) {
				node.textContent = Math.round(latest).toLocaleString();
			},
		});

		return () => controls.stop();
	}, [value]);

	return <span ref={ref} />;
}

export function MetricCard({
	title,
	value,
	suffix = "",
	icon: Icon,
	description,
	delay = 0,
}: MetricCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, delay }}
			viewport={{ once: true }}
			className="h-full"
		>
			<Card className="text-center h-full hover:shadow-xl transition-all duration-300 group bg-white border-transparent hover:border-blue-100 border-2">
				<CardContent className="p-6 flex flex-col items-center justify-center">
					{/* FIXED: Icon background now uses primary blue */}
					<div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
						<Icon className="w-8 h-8 text-white" />
					</div>

					<div className="text-4xl font-bold text-gray-900 mb-2">
						{/* IMPROVED: Added number counting animation */}
						<AnimatedNumber value={value} />
						{/* FIXED: Suffix color is now primary blue */}
						<span className="text-blue-600">{suffix}</span>
					</div>

					<h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
					{/* <p className="text-gray-500 text-sm">{description}</p> */}
				</CardContent>
			</Card>
		</motion.div>
	);
}
