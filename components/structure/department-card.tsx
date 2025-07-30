import { Department } from "@/lib/types/structure";
import { Person } from "@/lib/stores/person-store";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PersonCard } from "@/components/structure/detail/person-card";

interface DepartmentCardProps {
	department: Department;
	isExpanded: boolean;
	onToggle: () => void;
	viewMode: "grid" | "list";
}

export function DepartmentCard({
	department,
	isExpanded,
	onToggle,
	viewMode,
}: DepartmentCardProps) {
	return (
		<Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
			<div
				className={`cursor-pointer ${department.bgColor} hover:opacity-90 transition-opacity`}
				onClick={onToggle}
			>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div
								className={`w-16 h-16 bg-gradient-to-br ${department.color} rounded-xl flex items-center justify-center shadow-lg`}
							>
								<department.icon className="w-8 h-8 text-white" />
							</div>
							<div>
								<CardTitle className="text-2xl font-bold text-gray-900">
									{department.title_en}
								</CardTitle>
								<p className="text-gray-600 mt-1">{department.title}</p>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<Badge variant="secondary" className="hidden sm:flex">
								{department.members.length} members
							</Badge>
							<motion.div
								animate={{ rotate: isExpanded ? 180 : 0 }}
								transition={{ duration: 0.3 }}
							>
								<ChevronDown className="w-5 h-5 text-gray-500" />
							</motion.div>
						</div>
					</div>
					<p className="text-gray-700 text-left mt-4 leading-relaxed">
						{department.description}
					</p>
				</CardHeader>
			</div>
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.4, ease: "easeInOut" }}
					>
						<CardContent className="p-6 bg-white">
							<div
								className={`grid gap-6 ${
									viewMode === "grid"
										? "grid-cols-1 lg:grid-cols-2"
										: "grid-cols-1"
								}`}
							>
								{department.members.map((member, i) => (
									<PersonCard
										key={member.id}
										person={member}
										variant="detailed"
										index={i}
									/>
								))}
							</div>
						</CardContent>
					</motion.div>
				)}
			</AnimatePresence>
		</Card>
	);
}
