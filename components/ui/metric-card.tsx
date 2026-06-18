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
			<Card variant="interactive" className="h-full text-center group">
				<CardContent className="p-6 flex flex-col items-center justify-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-interactive-primary shadow-surface transition-transform duration-300 group-hover:scale-105">
						<Icon className="w-8 h-8 text-white" />
					</div>

					<div className="mb-2 text-heading-2 text-text-primary">
						<AnimatedNumber value={value} />
						<span className="text-primary-900">{suffix}</span>
					</div>

					<h3 className="mb-1 text-heading-5 text-text-primary">{title}</h3>
					{/* <p className="text-gray-500 text-sm">{description}</p> */}
				</CardContent>
			</Card>
		</motion.div>
	);
}
