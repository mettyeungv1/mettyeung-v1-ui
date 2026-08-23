import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
interface BreadcrumbItem { href: string; label: string; }
export function Breadcrumbs({ items, currentPage }: { items: BreadcrumbItem[]; currentPage: string }) { return <div className="border-b bg-gray-50 py-4"><div className="container"><nav className="flex items-center space-x-2 overflow-hidden text-sm text-gray-600">{items.map((item) => <React.Fragment key={item.href}><Link href={item.href} className="shrink-0 transition-colors hover:text-khmer-gold">{item.label}</Link><ChevronRight className="h-4 w-4 shrink-0" /></React.Fragment>)}<span className="truncate font-medium text-gray-900">{currentPage}</span></nav></div></div>; }
