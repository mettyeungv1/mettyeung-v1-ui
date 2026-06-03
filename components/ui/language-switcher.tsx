// FILE: components/ui/language-switcher.tsx

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguageStore, Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LanguageDefinition {
	code: Language;
	name: string;
	shortName: string;
	nativeName: string;
	flag: string;
}

export const languages: LanguageDefinition[] = [
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
];

interface LanguageSwitcherProps {
	variant?: "default" | "compact" | "floating";
	className?: string;
}

export function LanguageSwitcher({
	variant = "default",
	className,
}: LanguageSwitcherProps) {
	const { language, setLanguage, t } = useLanguageStore();
	const currentLanguage = languages.find((lang) => lang.code === language);
	const [isOpen, setIsOpen] = useState(false);

	if (variant === "floating") {
		return (
			<motion.div 
				initial={{ x: -50, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
				className="lg:hidden fixed bottom-[30%] left-0 z-50"
			>
				<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenuTrigger asChild>
						<button className="bg-primary-900/95 backdrop-blur-md text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col items-center justify-center p-2 rounded-r-2xl border border-l-0 border-white/20 transition-all duration-300 hover:scale-105 hover:bg-primary-800 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] active:scale-95 min-w-[52px] group">
							<motion.span 
								className="text-[22px] mb-0.5 leading-none transition-transform duration-300 group-hover:-translate-y-0.5"
							>
								{currentLanguage?.flag || "🌐"}
							</motion.span>
							<span className="text-[9px] font-bold tracking-[0.2em] uppercase text-primary-100 group-hover:text-white transition-colors">
								{t("common.languageShort")}
							</span>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent 
						side="right" 
						align="end" 
						sideOffset={12}
						className="w-60 p-2.5 rounded-2xl shadow-2xl border-white/50 bg-white/80 backdrop-blur-xl"
					>
						<div className="px-3 py-2 mb-1 flex items-center gap-2">
							<div className="p-1.5 bg-primary-50 rounded-lg">
								<Globe className="w-4 h-4 text-primary-900" />
							</div>
							<span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
								{t("common.selectLanguage")}
							</span>
						</div>
						<div className="space-y-1">
							{languages.map((lang, idx) => {
								const isActive = language === lang.code;
								return (
									<DropdownMenuItem
										key={lang.code}
										onClick={() => {
											setLanguage(lang.code);
											setIsOpen(false);
										}}
										className={cn(
											"flex items-center justify-between cursor-pointer p-3 rounded-xl transition-all duration-200 outline-none",
											isActive 
												? "bg-primary-50 text-primary-900" 
												: "hover:bg-gray-50/80 text-gray-600 hover:text-gray-900"
										)}
									>
										<div className="flex items-center space-x-3.5">
											<span className="text-2xl leading-none drop-shadow-sm">{lang.flag}</span>
											<div className="flex flex-col">
												<span className={cn("text-sm leading-none transition-colors", isActive ? "font-bold text-primary-900" : "font-medium")}>
													{lang.name}
												</span>
												<span className="text-[10px] text-gray-400 mt-1.5 leading-none font-medium">
													{lang.nativeName}
												</span>
											</div>
										</div>
										{isActive && (
											<motion.div 
												initial={{ scale: 0, rotate: -45 }}
												animate={{ scale: 1, rotate: 0 }}
												transition={{ type: "spring", stiffness: 300, damping: 20 }}
												className="bg-primary-900 rounded-full p-1 shadow-md shadow-primary-900/20"
											>
												<Check className="w-3.5 h-3.5 text-white" />
											</motion.div>
										)}
									</DropdownMenuItem>
								);
							})}
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</motion.div>
		);
	}

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
