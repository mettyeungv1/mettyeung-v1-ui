"use client";

import { Department } from "@/lib/types/structure";
import { PersonCard } from "@/components/structure/detail/person-card";
import { Users2 } from "lucide-react";

interface DepartmentSectionProps {
	department: Department;
	viewMode: "grid" | "list";
}

export function DepartmentSection({
	department,
	viewMode,
}: DepartmentSectionProps) {
	return (
		<section className="relative mb-16">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 px-4 md:px-0 border-b border-dashed border-gray-300 pb-6">
				<div className="flex-1">
					<h3 className="text-heading-2">
						{department.title}
					</h3>
					{department.description && (
						<p className="text-body text-gray-500 max-w-2xl mt-3">
							{department.description}
						</p>
					)}
				</div>
				<div className="flex items-center text-caption font-bold text-gray-500 shrink-0">
					<Users2 className="w-4 h-4 mr-2" />
					{department.members.length} {department.members.length === 1 ? "MEMBER" : "MEMBERS"}
				</div>
			</div>

			<div className="px-4 md:px-0">
				{department.members.length > 0 ? (
					<div
						className={`grid gap-6 ${
							viewMode === "grid"
								? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
								: "grid-cols-1 lg:grid-cols-2"
						}`}
					>
						{department.members.map((member, i) => (
							<PersonCard
								key={member.id}
								person={member as any}
								variant="detailed"
								index={i}
							/>
						))}
					</div>
				) : (
					<div className="text-center py-16 text-gray-400 bg-white/50 rounded-3xl border border-dashed border-gray-200">
						No members found in this department.
					</div>
				)}
			</div>
		</section>
	);
}
