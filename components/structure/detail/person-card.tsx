"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonDetailModal } from "@/components/person/person-detail-modal";
import { Person } from "@/lib/stores/person-store";

interface PersonCardProps {
	person: Person;
	variant?: "compact" | "detailed";
	index: number;
}

export function PersonCard({
	person,
	variant = "compact",
	index,
}: PersonCardProps) {
	const [showModal, setShowModal] = useState(false);

	// --- COMPACT VARIANT ---
	// A smaller card, often used in a grid view.
	if (variant === "compact") {
		return (
			<>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: index * 0.1 }}
				>
					<Card className="text-center h-full hover:shadow-lg transition-shadow duration-300 group">
						<CardContent className="p-6 flex flex-col items-center">
							<Avatar className="w-20 h-20 mx-auto mb-4 ring-2 ring-gray-100 group-hover:ring-khmer-gold transition-all duration-300">
								<AvatarImage src={person.image} alt={person.name_en} />
								<AvatarFallback className="bg-gradient-to-br from-khmer-gold to-khmer-red text-white font-bold">
									{person.name_en
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>

							<h3 className="font-bold text-gray-900 mb-1 group-hover:text-khmer-gold transition-colors">
								{person.name_en}
							</h3>
							<p className="text-sm text-gray-500 mb-3">{person.position_en}</p>

							<div className="flex-grow mb-4">
								<p className="text-xs text-gray-600 line-clamp-3">
									{person.bio}
								</p>
							</div>

							<Button
								variant="outline"
								size="sm"
								onClick={() => setShowModal(true)}
								className="w-full mt-auto hover:bg-khmer-gold hover:text-white hover:border-khmer-gold"
							>
								<ExternalLink className="w-3 h-3 mr-2" />
								View Profile
							</Button>
						</CardContent>
					</Card>
				</motion.div>
				<PersonDetailModal
					person={person}
					open={showModal}
					onClose={() => setShowModal(false)}
				/>
			</>
		);
	}

	// --- DETAILED VARIANT ---
	// A larger, list-style card with more information.
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
		>
			<Card className="h-full hover:shadow-lg transition-shadow duration-300 group border-l-4 border-transparent hover:border-khmer-gold">
				<CardContent className="p-6">
					{/* Responsive Layout: Stacks on mobile, side-by-side on larger screens */}
					<div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
						<Avatar className="w-24 h-24 sm:w-20 sm:h-20 flex-shrink-0 ring-2 ring-gray-100 group-hover:ring-khmer-gold transition-all duration-300">
							<AvatarImage src={person.image} alt={person.name_en} />
							<AvatarFallback className="bg-gradient-to-br from-khmer-gold to-khmer-red text-white font-bold text-2xl">
								{person.name_en
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>

						<div className="flex-1 min-w-0">
							<h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-khmer-gold transition-colors">
								{person.name_en}
							</h3>
							<p className="text-sm text-gray-500 mb-3">{person.position_en}</p>

							<p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
								{person.bio}
							</p>

							{/* Skills */}
							<div className="flex flex-wrap gap-1.5 justify-center sm:justify-start mb-4">
								{person.skills.slice(0, 3).map((skill, idx) => (
									<Badge key={idx} variant="secondary" className="text-xs">
										{skill}
									</Badge>
								))}
								{person.skills.length > 3 && (
									<Badge variant="secondary" className="text-xs">
										+{person.skills.length - 3} more
									</Badge>
								)}
							</div>

							<div className="mt-4 pt-4 border-t border-gray-100">
								<Button
									variant="outline"
									size="sm"
									asChild
									className="w-full sm:w-auto hover:bg-khmer-gold hover:text-white hover:border-khmer-gold"
								>
									<Link
										href={`/structure/${person.id}`}
										className="flex items-center justify-center"
									>
										<ExternalLink className="w-4 h-4 mr-2" />
										View Full Profile
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
