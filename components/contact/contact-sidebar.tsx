"use client";

import { Clock, MessageCircle, CheckCircle } from "lucide-react";
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
	facebook: "bg-[#1877F2] hover:bg-[#166FE5] text-white",
	youtube:  "bg-[#FF0000] hover:bg-[#cc0000] text-white",
	telegram: "bg-[#229ED9] hover:bg-[#1a86bc] text-white",
	instagram:"bg-[#E1306C] hover:bg-[#c2255c] text-white",
	twitter:  "bg-[#1DA1F2] hover:bg-[#0d8ecf] text-white",
	tiktok:   "bg-[#010101] hover:bg-[#333] text-white",
	linkedin: "bg-[#0077B5] hover:bg-[#005582] text-white",
};

const quickTips = [
	"We reply within 24 hours on business days",
	"For urgent matters, call us directly",
	"Donations & volunteering go to our volunteer team",
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

	const rows: { label: string; time: string; isClosed: boolean }[] = [];

	if (allSame && monFri.length === 5) {
		const first = monFri[0];
		rows.push({
			label: MON_FRI_LABEL,
			time: first.isClosed
				? "Closed"
				: `${formatTime(first.openTime)} – ${formatTime(first.closeTime)}`,
			isClosed: first.isClosed,
		});
	} else {
		for (const h of sorted.filter((h) => h.dayOfWeek >= 1 && h.dayOfWeek <= 5)) {
			rows.push({
				label: DAY_LABELS[h.dayOfWeek],
				time: h.isClosed
					? "Closed"
					: `${formatTime(h.openTime)} – ${formatTime(h.closeTime)}`,
				isClosed: h.isClosed,
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
		});
	}

	return rows;
}

export function ContactSidebar({ socialLinks, officeHours }: ContactSidebarProps) {
	const activeLinks = [...socialLinks]
		.filter((l) => l.isActive)
		.sort((a, b) => a.order - b.order);

	const hoursRows = renderOfficeHours(officeHours);

	return (
		<div className="space-y-6 sticky top-28">

			{/* Social Links */}
			<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
				<div className="bg-primary-900 px-6 py-5">
					<div className="flex items-center gap-2.5">
						<div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
							<MessageCircle className="w-4 h-4 text-white" />
						</div>
						<h3 className="text-base font-bold text-white">Follow Us</h3>
					</div>
					<p className="text-primary-200 text-sm mt-1.5 pl-10 leading-relaxed">
						Stay updated with our latest news and events.
					</p>
				</div>
				<div className="p-6 space-y-3">
					{activeLinks.map((social) => {
						const Icon = getSocialIcon(social.iconName ?? social.platform);
						const colorClass =
							socialColors[social.platform.toLowerCase()] ??
							"bg-gray-100 hover:bg-gray-200 text-gray-900";
						return (
							<a
								key={social.id}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${colorClass}`}
							>
								<Icon className="w-5 h-5 shrink-0" />
								<span className="capitalize">{social.platform}</span>
							</a>
						);
					})}
				</div>
			</div>

			{/* Office Hours */}
			<div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
				<div className="px-6 py-5 border-b border-gray-100">
					<div className="flex items-center gap-2.5">
						<div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
							<Clock className="w-4 h-4 text-primary-900" />
						</div>
						<h3 className="text-base font-bold text-gray-900">Office Hours</h3>
					</div>
				</div>
				<div className="p-6 space-y-3">
					{hoursRows.map(({ label, time, isClosed }) => (
						<div key={label} className="flex items-center justify-between">
							<span className="text-sm font-medium text-gray-700">{label}</span>
							<span
								className={`text-sm font-semibold ${
									isClosed ? "text-red-500" : "text-primary-900"
								}`}
							>
								{time}
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Quick Tips */}
			<div className="bg-primary-50 rounded-2xl border border-primary-100 p-6">
				<div className="flex items-center gap-2 mb-4">
					<CheckCircle className="w-4 h-4 text-primary-900 shrink-0" />
					<h3 className="text-sm font-bold text-primary-900 uppercase tracking-wide">
						Good to know
					</h3>
				</div>
				<ul className="space-y-3">
					{quickTips.map((tip) => (
						<li key={tip} className="flex items-start gap-2.5">
							<span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-khmer-gold shrink-0" />
							<span className="text-sm text-gray-700 leading-relaxed">{tip}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
