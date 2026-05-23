"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle, Clock, MessageCircle, X } from "lucide-react";
import type { ISocialLinkAPI, IOfficeHourAPI } from "@/lib/types/contact";
import { getSocialIcon } from "@/lib/utils/social-icon-map";

const DAY_LABELS: Record<number, string> = {
	0: "Sunday",
	1: "Monday",
	2: "Tuesday",
	3: "Wednesday",
	4: "Thursday",
	5: "Friday",
	6: "Saturday",
};

const MON_FRI_LABEL = "Mon – Fri";

const socialColors: Record<string, string> = {
	facebook: "bg-[#1877F2] hover:bg-[#166FE5]",
	youtube: "bg-[#FF0000] hover:bg-[#cc0000]",
	telegram: "bg-[#229ED9] hover:bg-[#1a86bc]",
	instagram: "bg-[#E1306C] hover:bg-[#c2255c]",
	twitter: "bg-[#1DA1F2] hover:bg-[#0d8ecf]",
	tiktok: "bg-[#010101] hover:bg-[#333]",
	linkedin: "bg-[#0077B5] hover:bg-[#005582]",
};

const quickTips = [
	"Call directly for urgent matters",
	"Volunteering requests go to our team",
	"Use the form for general questions",
];

interface ContactSidebarProps {
	socialLinks: ISocialLinkAPI[];
	officeHours: IOfficeHourAPI[];
}

function formatTime(time: string | null): string {
	if (!time) return "";
	const [h, m] = time.split(":").map(Number);
	const period = h >= 12 ? "PM" : "AM";
	const hour = h % 12 || 12;
	return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function renderOfficeHours(officeHours: IOfficeHourAPI[]) {
	const sorted = [...officeHours].sort((a, b) => a.dayOfWeek - b.dayOfWeek);

	// Group Mon-Fri if they have the same hours
	const monFri = sorted.filter((h) => h.dayOfWeek >= 1 && h.dayOfWeek <= 5);
	const allSame =
		monFri.length === 5 &&
		monFri.every(
			(h) =>
				h.openTime === monFri[0].openTime &&
				h.closeTime === monFri[0].closeTime &&
				h.isClosed === monFri[0].isClosed
		);

	const rows: { label: string; time: string; isClosed: boolean; dayOfWeek?: number; days?: number[] }[] = [];

	if (allSame && monFri.length === 5) {
		const first = monFri[0];
		rows.push({
			label: MON_FRI_LABEL,
			time: first.isClosed
				? "Closed"
				: `${formatTime(first.openTime)} – ${formatTime(first.closeTime)}`,
			isClosed: first.isClosed,
			days: [1, 2, 3, 4, 5],
		});
	} else {
		for (const h of sorted.filter((h) => h.dayOfWeek >= 1 && h.dayOfWeek <= 5)) {
			rows.push({
				label: DAY_LABELS[h.dayOfWeek],
				time: h.isClosed
					? "Closed"
					: `${formatTime(h.openTime)} – ${formatTime(h.closeTime)}`,
				isClosed: h.isClosed,
				dayOfWeek: h.dayOfWeek,
			});
		}
	}

	// Saturday
	const sat = sorted.find((h) => h.dayOfWeek === 6);
	if (sat) {
		rows.push({
			label: "Saturday",
			time: sat.isClosed
				? "Closed"
				: `${formatTime(sat.openTime)} – ${formatTime(sat.closeTime)}`,
			isClosed: sat.isClosed,
			dayOfWeek: 6,
		});
	}

	// Sunday
	const sun = sorted.find((h) => h.dayOfWeek === 0);
	if (sun) {
		rows.push({
			label: "Sunday",
			time: sun.isClosed
				? "Closed"
				: `${formatTime(sun.openTime)} – ${formatTime(sun.closeTime)}`,
			isClosed: sun.isClosed,
			dayOfWeek: 0,
		});
	}

	return rows;
}

export function ContactSidebar({ socialLinks, officeHours }: ContactSidebarProps) {
	const [now, setNow] = useState<Date | null>(null);

	useEffect(() => {
		setNow(new Date());
		const interval = window.setInterval(() => setNow(new Date()), 60_000);
		return () => window.clearInterval(interval);
	}, []);

	const activeLinks = useMemo(
		() =>
			[...socialLinks]
				.filter((l) => l.isActive)
				.sort((a, b) => a.order - b.order),
		[socialLinks]
	);

	const hoursRows = useMemo(() => renderOfficeHours(officeHours), [officeHours]);
	const currentDay = now?.getDay();

	return (
		<aside className="sticky top-28">
			<div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg shadow-primary-900/5">
				<div className="p-6">
					<section>
						<div className="mb-4 flex items-center gap-2.5">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
								<Clock className="h-4 w-4 text-primary-900" />
							</div>
							<h3 className="text-base font-bold text-gray-950">Office Hours</h3>
						</div>

						<div className="space-y-2">
							{hoursRows.map(({ label, time, isClosed, dayOfWeek, days }) => {
								const isToday =
									currentDay !== undefined &&
									(dayOfWeek === currentDay || days?.includes(currentDay));

								return (
									<div
										key={label}
										className={`flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition-colors ${
											isToday
												? "border-khmer-gold/30 bg-khmer-gold-50"
												: "border-transparent bg-gray-50"
										}`}
									>
										<span className="font-semibold text-gray-800">{label}</span>
										<span
											className={`inline-flex items-center gap-1.5 font-semibold ${
												isClosed ? "text-gray-400" : "text-primary-900"
											}`}
										>
											{isClosed && <X className="h-3.5 w-3.5" />}
											{time}
										</span>
									</div>
								);
							})}
						</div>
					</section>

					<div className="my-6 h-px bg-gray-100" />

					<section>
						<div className="mb-4 flex items-center gap-2.5">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
								<MessageCircle className="h-4 w-4 text-primary-900" />
							</div>
							<h3 className="text-base font-bold text-gray-950">Follow Us</h3>
						</div>

						<div className="grid grid-cols-4 gap-3">
							{activeLinks.map((social) => {
								const Icon = getSocialIcon(social.iconName ?? social.platform);
								const colorClass =
									socialColors[social.platform.toLowerCase()] ??
									"bg-gray-900 hover:bg-gray-700";

								return (
									<a
										key={social.id}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										title={social.platform}
										aria-label={`Follow us on ${social.platform}`}
										className={`flex aspect-square items-center justify-center rounded-xl text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2 ${colorClass}`}
									>
										<Icon className="h-5 w-5" />
									</a>
								);
							})}
						</div>
					</section>

					<div className="my-6 h-px bg-gray-100" />

					<section>
						<div className="mb-4 flex items-center gap-2.5">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-khmer-gold-50">
								<CheckCircle className="h-4 w-4 text-khmer-gold-700" />
							</div>
							<h3 className="text-base font-bold text-gray-950">Good to know</h3>
						</div>

						<div className="space-y-3">
							{quickTips.map((tip) => (
								<div key={tip} className="flex items-center gap-3 text-sm text-gray-700">
									<span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary-50">
										<CheckCircle className="h-3.5 w-3.5 text-primary-900" />
									</span>
									<span className="leading-snug">{tip}</span>
								</div>
							))}
						</div>
					</section>
				</div>
			</div>
		</aside>
	);
}
