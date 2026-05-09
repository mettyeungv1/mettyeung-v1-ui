"use client";

import { useState, useEffect, useRef } from "react";
import { Department } from "@/lib/types/structure";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

interface StructureFilterBarProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	selectedDepartment: string;
	onDepartmentChange: (value: string) => void;
	departments: Department[];
	totalMembers: number;
	filteredMemberCount: number;
}

export function StructureFilterBar({
	searchTerm,
	onSearchChange,
	selectedDepartment,
	onDepartmentChange,
	departments,
	totalMembers,
	filteredMemberCount,
}: StructureFilterBarProps) {
	const { t } = useTranslation();
	const [localSearch, setLocalSearch] = useState(searchTerm);
	const debounceRef = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		debounceRef.current = setTimeout(() => {
			onSearchChange(localSearch);
		}, 300);
		return () => clearTimeout(debounceRef.current);
	}, [localSearch, onSearchChange]);

	// Sync external changes
	useEffect(() => {
		setLocalSearch(searchTerm);
	}, [searchTerm]);

	const hasActiveFilters = searchTerm || selectedDepartment !== "all";

	return (
		<section className="py-6 bg-white/80 backdrop-blur-sm border-b sticky top-16 z-10 transition-all duration-200">
			<div className="container">
				<div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
					{/* Search */}
					<div className="relative flex-1 max-w-md">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
						<Input
							placeholder={t("structure.filter.searchPlaceholder") || "Search members..."}
							value={localSearch}
							onChange={(e) => setLocalSearch(e.target.value)}
							className="pl-10 pr-9 h-11 rounded-lg border-gray-200 focus:border-khmer-gold focus:ring-khmer-gold/20"
						/>
						{localSearch && (
							<button
								onClick={() => {
									setLocalSearch("");
									onSearchChange("");
								}}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
								aria-label="Clear search"
							>
								<X className="w-4 h-4" />
							</button>
						)}
					</div>

					{/* Department filter */}
					<div className="relative w-full sm:w-52">
						<select
							value={selectedDepartment}
							onChange={(e) => onDepartmentChange(e.target.value)}
							className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-khmer-gold/20 focus:border-khmer-gold h-11 appearance-none cursor-pointer"
							aria-label="Filter by department"
						>
							<option value="all">
								{t("structure.filter.allDepartments") || "All Departments"}
							</option>
							{departments.map((section) => (
								<option key={section.id} value={section.id}>
									{section.title}
								</option>
							))}
						</select>
						<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
							<svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</div>
					</div>
				</div>

				{/* Results count + clear filters */}
				<div className="flex items-center justify-between mt-3">
					<p className="text-sm text-gray-500">
						{hasActiveFilters ? (
							<>
								Showing <span className="font-semibold text-gray-700">{filteredMemberCount}</span> of{" "}
								<span className="font-semibold text-gray-700">{totalMembers}</span> members
								{selectedDepartment !== "all" && (
									<> in <span className="font-semibold text-gray-700">{departments.find(d => d.id === selectedDepartment)?.title}</span></>
								)}
							</>
						) : (
							<>
								<span className="font-semibold text-gray-700">{totalMembers}</span> members across{" "}
								<span className="font-semibold text-gray-700">{departments.length}</span> departments
							</>
						)}
					</p>
					{hasActiveFilters && (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => {
								setLocalSearch("");
								onSearchChange("");
								onDepartmentChange("all");
							}}
							className="text-xs text-gray-500 hover:text-gray-700"
						>
							Clear filters
						</Button>
					)}
				</div>
			</div>
		</section>
	);
}
