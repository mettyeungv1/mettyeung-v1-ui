import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useTranslation } from "@/lib/i18n";

interface StructureHeroProps {
	departmentCount: number;
	totalMembers: number;
}

export function StructureHero({
	departmentCount,
	totalMembers,
}: StructureHeroProps) {
	const { t } = useTranslation();
	return (
		<section className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10">
			<div className="container relative text-center max-w-5xl mx-auto">
				<AnimatedSection>
					<motion.div
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.8 }}
						className="w-16 h-16 bg-gradient-to-br from-khmer-gold to-khmer-red rounded-full flex items-center justify-center mx-auto mb-4"
					>
						<Users className="w-8 h-8 text-white" />
					</motion.div>
					<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
						{t("structure.hero.title")}
					</h1>
					<p className="text-lg md:text-2xl text-gray-600 leading-relaxed mb-8">
						{t("structure.hero.description")}
					</p>
					{/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="text-center"
						>
							<div className="text-3xl font-bold text-khmer-gold">
								{departmentCount}
							</div>
							<div className="text-sm text-gray-600">Departments</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="text-center"
						>
							<div className="text-3xl font-bold text-khmer-red">
								{totalMembers}
							</div>
							<div className="text-sm text-gray-600">Members</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="text-center"
						>
							<div className="text-3xl font-bold text-blue-600">6</div>
							<div className="text-sm text-gray-600">Years</div>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className="text-center"
						>
							<div className="text-3xl font-bold text-green-600">25+</div>
							<div className="text-sm text-gray-600">Projects</div>
						</motion.div>
					</div> */}
				</AnimatedSection>
			</div>
		</section>
	);
}
