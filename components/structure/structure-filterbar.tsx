import { Department } from "@/lib/types/structure";
import { Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StructureFilterBarProps {
	searchTerm: string;
	onSearchChange: (value: string) => void;
	selectedDepartment: string;
	onDepartmentChange: (value: string) => void;
	departments: Department[];
	viewMode: "grid" | "list";
	onViewModeChange: (mode: "grid" | "list") => void;
}

export function StructureFilterBar({
	searchTerm,
	onSearchChange,
	selectedDepartment,
	onDepartmentChange,
	departments,
	viewMode,
	onViewModeChange,
}: StructureFilterBarProps) {
	return (
		<section className="py-8 bg-white border-b sticky top-0 z-10">
			<div className="container">
				<div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
					<div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
							<Input
								placeholder="Search members, skills..."
								value={searchTerm}
								onChange={(e) => onSearchChange(e.target.value)}
								className="pl-10 h-11"
							/>
						</div>
						<div className="relative w-full sm:w-48">
							<Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
							<select
								value={selectedDepartment}
								onChange={(e) => onDepartmentChange(e.target.value)}
								className="pl-10 pr-8 py-2.5 w-full border rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-khmer-gold h-11 appearance-none"
							>
								<option value="all">All Departments</option>
								{departments.map((section) => (
									<option key={section.id} value={section.id}>
										{section.title}
									</option>
								))}
							</select>
						</div>
					</div>
					{/* <div className="flex items-center space-x-2">
						<Button
							variant={viewMode === "grid" ? "default" : "outline"}
							size="icon"
							onClick={() => onViewModeChange("grid")}
						>
							<Grid className="w-4 h-4" />
						</Button>
						<Button
							variant={viewMode === "list" ? "default" : "outline"}
							size="icon"
							onClick={() => onViewModeChange("list")}
						>
							<List className="w-4 h-4" />
						</Button>
					</div> */}
				</div>
			</div>
		</section>
	);
}
