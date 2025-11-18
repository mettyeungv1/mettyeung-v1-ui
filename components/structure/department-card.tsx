import { Department } from "@/lib/types/structure";
import { Person } from "@/lib/stores/person-store";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PersonCard } from "@/components/structure/detail/person-card";
import Image from "next/image";

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
					<CardHeader>
						<div className="grid grid-cols-[auto_1fr_auto] gap-4 items-start sm:items-center">
							{/* Icon Box */}
							<div
								className={`w-16 h-16 bg-gradient-to-br ${department.color} rounded-xl flex items-center justify-center shadow-lg`}
							>
								<department.icon className="w-8 h-8 text-white" />
							</div>

							{/* Title + Subtitle */}
							<div className="flex flex-col">
								<CardTitle className="text-2xl font-bold text-gray-900 break-words">
									{department.title_en}
								</CardTitle>
								<p className="text-gray-600 mt-1">{department.title}</p>
							</div>

							{/* Chevron */}
							<motion.div
								animate={{ rotate: isExpanded ? 180 : 0 }}
								transition={{ duration: 0.3 }}
								className="ml-auto"
							>
								<ChevronDown className="w-5 h-5 text-gray-500" />
							</motion.div>
						</div>

						<p className="text-gray-700 text-left mt-4 leading-relaxed">
							{department.description}
						</p>
					</CardHeader>

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
						className="overflow-hidden"
					>
						<div className="w-full bg-gray-100">
							<Image
								src={department.image}
								alt={department.description}
								width={0}
								height={0}
								sizes="100vw"
								className="w-full h-auto"
								style={{ width: "100%", height: "auto" }}
								priority
							/>
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
											person={member as any}
											variant="detailed"
											index={i}
										/>
									))}
								</div>
							</CardContent>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</Card>
	);
}
