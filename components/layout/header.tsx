// FILE: components/layout/header.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navigation = [
	{ key: "nav.home", href: "/" },
	{ key: "nav.about", href: "/about" },
	{ key: "nav.structure", href: "/structure" },
	{
		key: "nav.news",
		href: "/news",
	},
	{ key: "nav.videos", href: "/videos" },
	{
		key: "nav.projects",
		href: "/projects",
		submenu: [
			{ key: "nav.allProjects", href: "/projects" },
			{ key: "nav.community", href: "/projects?category=community" },
			{ key: "nav.education", href: "/projects?category=education" },
			{ key: "nav.culture", href: "/projects?category=culture" },
			{ key: "nav.sports", href: "/projects?category=sports" },
		],
	},
	{ key: "nav.contact", href: "/contact" },
];

export function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const { t } = useTranslation();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				isScrolled ? "bg-white/90 shadow-md backdrop-blur-sm" : "bg-white"
			)}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="container">
				<div className="flex items-center justify-between h-16 lg:h-20">
					<Link href="/" className="flex items-center space-x-3 group">
						<Image src="/logo.png" alt="logo" width={150} height={150} />
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-8">
						{navigation.map((item) => {
							const isActive =
								item.href === "/"
									? pathname === item.href
									: pathname.startsWith(item.href);

							return (
								<div key={item.key} className="relative group">
									{item.submenu ? (
										<div className="relative">
											<Link
												href={item.href}
												className={cn(
													"flex items-center space-x-1 text-neutral-800 hover:text-blue-600 transition-colors duration-200 py-2",
													isActive && "text-blue-600"
												)}
											>
												<span className="font-medium">{t(item.key)}</span>
												<ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
											</Link>
											{isActive && (
												<motion.div
													className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
													layoutId="activeTab"
													initial={false}
													transition={{
														type: "spring",
														stiffness: 380,
														damping: 30,
													}}
												/>
											)}
											<div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
												{item.submenu.map((subItem) => (
													<Link
														key={subItem.href}
														href={subItem.href}
														className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
													>
														{t(subItem.key)}
													</Link>
												))}
											</div>
										</div>
									) : (
										<Link
											href={item.href}
											className={cn(
												"text-neutral-800 hover:text-blue-600 transition-colors duration-200 font-medium relative py-2",
												isActive && "text-blue-600"
											)}
										>
											{t(item.key)}
											{isActive && (
												<motion.div
													className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
													layoutId="activeTab"
													initial={false}
													transition={{
														type: "spring",
														stiffness: 380,
														damping: 30,
													}}
												/>
											)}
										</Link>
									)}
								</div>
							);
						})}
					</nav>

					{/* Language Switcher & CTA Button */}
					<div className="hidden lg:flex items-center space-x-4">
						<LanguageSwitcher />
						<Button
							asChild
							className="bg-blue-600 text-white hover:bg-blue-700"
						>
							<Link href="/contact">{t("nav.joinUs")}</Link>
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild className="lg:hidden">
							<Button
								variant="ghost"
								size="icon"
								className="text-neutral-800 hover:text-blue-600"
							>
								<Menu className="w-6 h-6" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-full max-w-sm bg-white">
							<div className="flex flex-col h-full">
								<div className="flex items-center space-x-3 pb-6 border-b border-neutral-200 p-6">
									<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
										<span className="text-white font-bold text-lg">M</span>
									</div>
									<div>
										<h2 className="text-xl font-bold text-blue-900">
											Mettyerng
										</h2>
										<p className="text-sm text-gray-600">
											ក្រុមអ្នកស្រឡាញ់សង្គម
										</p>
									</div>
								</div>
								<nav className="flex-1 flex flex-col space-y-2 p-6">
									{navigation.map((item) => (
										<div key={item.href}>
											<Link
												href={item.href}
												className={cn(
													"block text-lg font-medium py-2 rounded-md px-4 transition-colors duration-200",
													(pathname.startsWith(item.href) &&
														item.href !== "/") ||
														pathname === item.href
														? "text-blue-600 bg-blue-50"
														: "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
												)}
												onClick={() => setIsMobileMenuOpen(false)}
											>
												{t(item.key)}
											</Link>
											{item.submenu && (
												<div className="ml-8 mt-2 space-y-2">
													{item.submenu.map((subItem) => (
														<Link
															key={subItem.href}
															href={subItem.href}
															className="block text-sm text-gray-600 hover:text-blue-600 py-1 transition-colors duration-200"
															onClick={() => setIsMobileMenuOpen(false)}
														>
															{t(subItem.key)}
														</Link>
													))}
												</div>
											)}
										</div>
									))}
								</nav>
								<div className="p-6 mt-auto border-t border-neutral-200 space-y-4">
									<LanguageSwitcher variant="compact" />
									<Button
										asChild
										className="w-full bg-blue-600 text-white hover:bg-blue-700"
									>
										<Link
											href="/contact"
											onClick={() => setIsMobileMenuOpen(false)}
										>
											{t("nav.joinUs")}
										</Link>
									</Button>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</motion.header>
	);
}
