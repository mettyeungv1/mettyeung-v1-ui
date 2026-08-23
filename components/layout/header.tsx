"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { getUserProfileAction } from "@/action/auth/user-action";
import { UserProfile } from "@/service/auth/user-service";
import { RawCategory } from "@/service/category/category-service";

// === Recursive Navigation Types ===
type NavItem = {
	key: string | Record<string, string>;
	href: string;
	submenu?: NavItem[];
};

// === Helper to Map Categories to NavItems ===
function mapCategoriesToNavItems(categories: RawCategory[]): NavItem[] {
    if (!categories) return [];
	return categories.map((cat) => ({
		key: typeof cat.name === "string" ? cat.name : cat.name,
		href: `/news?category=${cat.id}`,
		submenu: cat.children && cat.children.length > 0 ? mapCategoriesToNavItems(cat.children) : undefined,
	}));
}

// === Static Navigation Base ===
const staticNavigation: NavItem[] = [
	{
		key: "nav.home",
		href: "/",
	},
	{
		key: "nav.about",
		href: "/about",
		submenu: [
			{ key: "nav.subMenuAbout", href: "/about" },
			{ key: "nav.structure", href: "/structure" },
			{ key: "nav.network", href: "/about#network" },
		],
	},
	// Activity/News will be dynamic
	{
		key: "nav.videos",
		href: "/videos",
	},
	{ key: "nav.network", href: "/network" },
	{ key: "nav.contact", href: "/contact" },
];

interface HeaderProps {
	categories?: RawCategory[];
}

// === Recursive Desktop Menu Component ===
const DesktopMenuItem = ({
	item,
	pathname,
	t,
	depth = 0,
}: {
	item: NavItem;
	pathname: string;
	t: any;
	depth?: number;
}) => {
	const isActive =
		item.href === "/"
			? pathname === item.href
			: pathname.startsWith(item.href) ||
			  (item.href.includes("?category=") &&
					pathname.startsWith("/news") &&
					typeof window !== "undefined" &&
					new URLSearchParams(window.location.search).get("category") ===
						item.href.split("=")[1]);

	const hasSubmenu = item.submenu && item.submenu.length > 0;
	const [isOpen, setIsOpen] = useState(false);

	const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
			setIsOpen(false);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "Escape") {
			setIsOpen(false);
			(event.currentTarget.querySelector("a") as HTMLAnchorElement | null)?.focus();
		}
	};

	// Top-level items have different styling than nested items
	if (depth === 0) {
		return (
			<div
				className="relative group/menuItem h-full flex items-center"
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
			>
				<Link
					href={item.href}
					aria-haspopup={hasSubmenu ? "menu" : undefined}
					aria-expanded={hasSubmenu ? isOpen : undefined}
					onFocus={() => hasSubmenu && setIsOpen(true)}
					className={cn(
						"flex items-center space-x-1 text-nav text-text-primary hover:text-primary-900 transition-colors duration-200 py-2",
						isActive && "text-primary-900"
					)}
				>
					<span>{t(item.key)}</span>
					{hasSubmenu && (
						<ChevronDown className="w-4 h-4 group-hover/menuItem:rotate-180 transition-transform duration-200" />
					)}
				</Link>
				{isActive && (
					<motion.div
						className="absolute bottom-0 left-0 right-0 h-0.5 bg-interactive-primary"
						layoutId="activeTab"
						initial={false}
						transition={{
							type: "spring",
							stiffness: 380,
							damping: 30,
						}}
					/>
				)}

				{/* Dropdown */}
				{hasSubmenu && (
					<div
						className={cn(
							"absolute top-full left-0 z-50 mt-0 pt-2 transition-all duration-200",
							isOpen
								? "visible opacity-100"
								: "invisible opacity-0 group-hover/menuItem:visible group-hover/menuItem:opacity-100 group-focus-within/menuItem:visible group-focus-within/menuItem:opacity-100"
						)}
					>
						<div className="w-56 overflow-visible rounded-lg border border-border bg-surface-panel py-2 shadow-sm" role="menu">
							{item.submenu!.map((subItem, idx) => (
								<DesktopMenuItem
									key={`${subItem.href}-${idx}`}
									item={subItem}
									pathname={pathname}
									t={t}
									depth={depth + 1}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		);
	}

	// Nested items (depth > 0)
	return (
		<div
			className="relative group/subItem px-1"
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
			onBlur={handleBlur}
			onKeyDown={handleKeyDown}
		>
			<Link
				href={item.href}
				role="menuitem"
				aria-haspopup={hasSubmenu ? "menu" : undefined}
				aria-expanded={hasSubmenu ? isOpen : undefined}
				onFocus={() => hasSubmenu && setIsOpen(true)}
				className={cn(
					"flex items-center justify-between w-full px-4 py-2 text-body-sm text-text-primary hover:bg-interactive-primaryMuted hover:text-primary-900 rounded-md transition-colors duration-200",
					isActive && "text-primary-900 bg-interactive-primaryMuted"
				)}
			>
				<span>{t(item.key)}</span>
				{hasSubmenu && <ChevronRight className="w-4 h-4" />}
			</Link>

			{/* Nested Dropdown */}
			{hasSubmenu && (
				<div
					className={cn(
						"absolute left-full top-0 z-50 ml-1 transition-all duration-200",
						isOpen
							? "visible opacity-100"
							: "invisible opacity-0 group-hover/subItem:visible group-hover/subItem:opacity-100 group-focus-within/subItem:visible group-focus-within/subItem:opacity-100"
					)}
				>
					<div className="w-56 overflow-visible rounded-lg border border-border bg-surface-panel py-2 shadow-sm" role="menu">
						{item.submenu!.map((subItem, idx) => (
							<DesktopMenuItem
								key={`${subItem.href}-${idx}`}
								item={subItem}
								pathname={pathname}
								t={t}
								depth={depth + 1}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

// === Recursive Mobile Menu Component ===
const MobileMenuItem = ({
	item,
	pathname,
	t,
	setIsOpen,
	depth = 0,
}: {
	item: NavItem;
	pathname: string;
	t: any;
	setIsOpen: (val: boolean) => void;
	depth?: number;
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const hasSubmenu = item.submenu && item.submenu.length > 0;
	const isActive =
		item.href === "/"
			? pathname === item.href
			: pathname.startsWith(item.href) ||
			  (item.href.includes("?category=") &&
					pathname.startsWith("/news") &&
					typeof window !== "undefined" &&
					new URLSearchParams(window.location.search).get("category") ===
						item.href.split("=")[1]);

	return (
		<div className="flex flex-col">
			<div
				className={cn(
					"flex items-center justify-between py-2 px-4 rounded-md transition-colors duration-200",
					isActive
						? "text-primary-900 bg-interactive-primaryMuted"
						: "text-text-primary hover:text-primary-900 hover:bg-interactive-primaryMuted"
				)}
			>
				<Link
					href={item.href}
					className={cn(
						"flex-1",
						depth === 0 ? "text-nav" : "text-body-sm",
						depth > 0 && "ml-2"
					)}
					onClick={() => setIsOpen(false)}
				>
					{t(item.key)}
				</Link>
				{hasSubmenu && (
					<button
						type="button"
						aria-label={`${isExpanded ? t("common.close") : t("common.more")}: ${t(item.key)}`}
						aria-expanded={isExpanded}
						onClick={(e) => {
							e.stopPropagation();
							setIsExpanded(!isExpanded);
						}}
						className="min-h-9 min-w-9 p-1"
					>
						<ChevronDown
							className={cn(
								"w-4 h-4 transition-transform duration-200",
								isExpanded && "rotate-180"
							)}
						/>
					</button>
				)}
			</div>
			<AnimatePresence>
				{hasSubmenu && isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						className="overflow-hidden ml-4 space-y-1 border-l border-neutral-200 pl-2"
					>
						{item.submenu!.map((subItem, idx) => (
							<MobileMenuItem
								key={`${subItem.href}-${idx}`}
								item={subItem}
								pathname={pathname}
								t={t}
								setIsOpen={setIsOpen}
								depth={depth + 1}
							/>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export function Header({ categories = [] }: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const pathname = usePathname();
	const { t } = useTranslation();
	const { data: session } = useSession();

	// Construct dynamic navigation
	const navigation = React.useMemo(() => {
		const nav = [...staticNavigation];
        
        const categoryItems = mapCategoriesToNavItems(categories || []);
        
        // Add "All News" as the first item in the dropdown
        const allNewsItem: NavItem = {
            key: "nav.allNews", // Ensure translation exists or fallback
            href: "/news?category=all"
        };
        
		const activityItem: NavItem = {
			key: "nav.activity",
			href: "/news",
			submenu: [allNewsItem, ...categoryItems],
		};

		// Insert Activity after About (index 2)
		nav.splice(2, 0, activityItem);
		return nav;
	}, [categories]);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const fetchProfile = async () => {
			if (session && !userProfile) {
				// Fetch only if there's a session and profile isn't already loaded
				const response = await getUserProfileAction();

				// 3. Check for success and set the user profile state
				if (response && response.status_code === 200 && response.data?.user) {
					setUserProfile(response.data.user);
				}
			} else if (!session) {
				// Clear profile if user signs out
				setUserProfile(null);
			}
		};

		fetchProfile();
	}, [session, userProfile]);

	return (
		<motion.header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
				isScrolled ? "bg-surface-panel/90 shadow-surface backdrop-blur-sm" : "bg-surface-panel"
			)}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="container">
				<div className="flex items-center justify-between h-16 lg:h-20">
					<Link href="/" className="flex items-center space-x-3 group">
						<Image src="/logo.png" alt="Mett Yeung Association logo" width={150} height={150} />
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center space-x-8">
						{navigation.map((item, idx) => (
							<DesktopMenuItem
								key={`${item.href}-${idx}`}
								item={item}
								pathname={pathname}
								t={t}
							/>
						))}
					</nav>

					<div className="hidden lg:flex items-center space-x-4">
						<LanguageSwitcher />
						{session && userProfile && (
							<>
								<span className="text-nav text-neutral-800">
									{/* Displaying user ID as an example */}
									User: {userProfile.id.substring(0, 8)}...
								</span>

								<Button
									variant="outline"
									className="border-error-DEFAULT text-error-DEFAULT hover:bg-error-DEFAULT hover:text-white"
									onClick={() => signOut({ callbackUrl: "/" })}
								>
									{t("auth.logout")}
								</Button>
							</>
						)}
						{/* {!session && (
							<>
								<Button
									asChild
									variant="outline"
									className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
								>
									<Link href="/auth/login">{t("auth.login")}</Link>
								</Button>

								<Button
									asChild
									className="bg-blue-600 text-white hover:bg-blue-700"
								>
									<Link href="/auth/register">{t("auth.register")}</Link>
								</Button>
							</>
						)} */}
					</div>

					{/* Mobile Menu Button */}
					<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
						<SheetTrigger asChild className="lg:hidden">
							<Button
								variant="ghost"
								size="icon"
								aria-label={t("common.more")}
								className="text-text-primary hover:text-primary-900"
							>
								<Menu className="w-6 h-6" />
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="w-full max-w-sm overflow-y-auto bg-surface-panel"
						>
							<div className="flex flex-col min-h-full">
								<div className="flex flex-col items-center justify-center border-b border-border-subtle p-6 pb-6 pt-10">
									<div className="relative w-24 h-24 mb-2">
										<Image
											src="/logo.png"
											alt="Mettyerng Logo"
											fill
											className="object-contain"
											priority
										/>
									</div>
								</div>
								<nav className="flex-1 flex flex-col space-y-2 p-card-md">
									{navigation.map((item, idx) => (
										<MobileMenuItem
											key={`${item.href}-${idx}`}
											item={item}
											pathname={pathname}
											t={t}
											setIsOpen={setIsMobileMenuOpen}
										/>
									))}
								</nav>
								<div className="mt-auto space-y-4 border-t border-border-subtle p-card-md">
									<LanguageSwitcher variant="compact" />
									{/* <Button
										asChild
										variant="outline"
										className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
									>
										<Link
											href="/auth/login"
											onClick={() => setIsMobileMenuOpen(false)}
										>
											{t("auth.login")}
										</Link>
									</Button>
									<Button
										asChild
										className="w-full bg-blue-600 text-white hover:bg-blue-700"
									>
										<Link
											href="/auth/register"
											onClick={() => setIsMobileMenuOpen(false)}
										>
											{t("auth.register")}
										</Link>
									</Button> */}
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</motion.header>
	);
}
