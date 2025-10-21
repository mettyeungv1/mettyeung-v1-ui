// FILE: components/ui/language-switcher.tsx

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguageStore, Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageDefinition {
	code: Language;
	name: string;
	shortName: string;
	nativeName: string;
	flag: string;
}

const languages: LanguageDefinition[] = [
	{
		code: "en",
		name: "English",
		shortName: "EN",
		nativeName: "English",
		flag: "🇺🇸",
	},
	{
		code: "km",
		name: "Khmer",
		shortName: "ខ្មែរ",
		nativeName: "ខ្មែរ",
		flag: "🇰🇭",
	},
	{
		code: "ko",
		name: "Korean",
		shortName: "한국어",
		nativeName: "한국어",
		flag: "🇰🇷",
	},
	{
		code: "ja",
		name: "Japanese",
		shortName: "日本語",
		nativeName: "日本語",
		flag: "🇯🇵",
	},
	{
		code: "th",
		name: "Thai",
		shortName: "ไทย",
		nativeName: "ไทย",
		flag: "🇹🇭",
	},
];

interface LanguageSwitcherProps {
	variant?: "default" | "compact";
	className?: string;
}

export function LanguageSwitcher({
	variant = "default",
	className,
}: LanguageSwitcherProps) {
	const { language, setLanguage } = useLanguageStore();
	const currentLanguage = languages.find((lang) => lang.code === language);

	if (variant === "compact") {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className={cn("w-full flex justify-center", className)}
					>
						<span className="text-lg mr-2">{currentLanguage?.flag}</span>
						{currentLanguage?.nativeName}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-48 p-2">
					{languages.map((lang) => (
						<DropdownMenuItem
							key={lang.code}
							onClick={() => setLanguage(lang.code)}
							className="flex items-center justify-between cursor-pointer p-2 rounded-md transition-colors hover:bg-blue-50 focus:bg-blue-50"
						>
							<div className="flex items-center space-x-3">
								<span className="text-lg">{lang.flag}</span>
								<div>
									<div className="text-sm font-medium">{lang.name}</div>
									<div className="text-xs text-gray-500">{lang.nativeName}</div>
								</div>
							</div>
							{language === lang.code && (
								<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
									<Check className="w-4 h-4 text-blue-600" />
								</motion.div>
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className={cn(
						"flex items-center space-x-2 text-neutral-800 hover:text-blue-600",
						className
					)}
				>
					<Globe className="w-4 h-4" />
					<span className="font-medium">{currentLanguage?.shortName}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48 p-2">
				{languages.map((lang) => (
					<DropdownMenuItem
						key={lang.code}
						onClick={() => setLanguage(lang.code)}
						className="flex items-center justify-between cursor-pointer p-2 rounded-md transition-colors hover:bg-blue-50 focus:bg-blue-50"
					>
						<div className="flex items-center space-x-3">
							<span className="text-lg">{lang.flag}</span>
							<div>
								<div className="text-sm font-medium">{lang.name}</div>
								<div className="text-xs text-gray-500">{lang.nativeName}</div>
							</div>
						</div>
						{language === lang.code && (
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ duration: 0.2 }}
							>
								<Check className="w-4 h-4 text-blue-600" />
							</motion.div>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
