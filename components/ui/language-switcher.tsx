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
						<button className="surface-inverse flex min-w-[52px] flex-col items-center justify-center rounded-r-xl border border-l-0 border-border-inverse p-2 shadow-surface transition-all duration-300 hover:scale-105 hover:bg-primary-800 active:scale-95 focus-ring group">
							<motion.span
								className="text-[22px] mb-0.5 leading-none transition-transform duration-300 group-hover:-translate-y-0.5"
							>
								{currentLanguage?.flag || "🌐"}
							</motion.span>
							<span className="text-caption font-bold text-primary-100 group-hover:text-white transition-colors">
								{t("common.languageShort")}
							</span>
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						side="right"
						align="end"
						sideOffset={12}
						className="w-60 rounded-xl border-border-subtle bg-surface-panel p-2.5 shadow-popover"
					>
						<div className="px-3 py-2 mb-1 flex items-center gap-2">
							<div className="rounded-md bg-interactive-primaryMuted p-1.5">
								<Globe className="w-4 h-4 text-primary-900" />
							</div>
							<span className="text-label text-text-primary">
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
											"flex cursor-pointer items-center justify-between rounded-lg p-3 outline-none transition-all duration-200",
											isActive
												? "bg-interactive-primaryMuted text-primary-900"
												: "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
										)}
									>
										<div className="flex items-center space-x-3.5">
											<span className="text-2xl leading-none drop-shadow-sm">{lang.flag}</span>
											<div className="flex flex-col">
												<span className={cn("text-body-sm transition-colors", isActive ? "font-semibold text-primary-900" : "font-medium")}>
													{lang.name}
												</span>
												<span className="mt-1.5 text-caption text-text-tertiary">
													{lang.nativeName}
												</span>
											</div>
										</div>
										{isActive && (
											<motion.div
												initial={{ scale: 0, rotate: -45 }}
												animate={{ scale: 1, rotate: 0 }}
												transition={{ type: "spring", stiffness: 300, damping: 20 }}
												className="rounded-full bg-interactive-primary p-1 shadow-sm"
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
							className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-surface-muted focus:bg-surface-muted"
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
									<Check className="w-4 h-4 text-primary-900" />
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
						"flex items-center space-x-2 text-text-primary hover:text-primary-900",
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
						className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-surface-muted focus:bg-surface-muted"
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
							<Check className="w-4 h-4 text-primary-900" />
							</motion.div>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
