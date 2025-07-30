import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
	href: string;
	label: string;
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	currentPage: string;
}

export function Breadcrumbs({ items, currentPage }: BreadcrumbsProps) {
	return (
		<div className="bg-gray-50 py-4 border-b">
			<div className="container">
				<nav className="flex items-center space-x-2 text-sm text-gray-600">
					{items.map((item) => (
						<React.Fragment key={item.href}>
							<Link
								href={item.href}
								className="hover:text-khmer-gold transition-colors"
							>
								{item.label}
							</Link>
							<ChevronRight className="w-4 h-4" />
						</React.Fragment>
					))}
					<span className="text-gray-900 font-medium">{currentPage}</span>
				</nav>
			</div>
		</div>
	);
}
