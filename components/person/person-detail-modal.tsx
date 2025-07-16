"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Person } from "@/lib/stores/person-store";

interface PersonDetailModalProps {
	person: Person | null;
	open: boolean;
	onClose: () => void;
}

export function PersonDetailModal({
	person,
	open,
	onClose,
}: PersonDetailModalProps) {
	const router = useRouter();

	if (!person) return null;

	const handleViewFullProfile = () => {
		onClose();
		router.push(`/person/${person.id}`);
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-md">
				<div className="text-center p-6">
					<div className="w-16 h-16 bg-gradient-to-br from-khmer-gold to-khmer-red rounded-full flex items-center justify-center mx-auto mb-4">
						<ExternalLink className="w-8 h-8 text-white" />
					</div>

					<h3 className="text-xl font-bold text-gray-900 mb-2">
						View Full Profile
					</h3>

					<p className="text-gray-600 mb-6">
						Would you like to view {person.name_en}s complete profile with
						detailed information?
					</p>

					<div className="flex space-x-3">
						<Button variant="outline" onClick={onClose} className="flex-1">
							Cancel
						</Button>
						<Button
							onClick={handleViewFullProfile}
							className="flex-1 bg-gradient-to-r from-khmer-gold to-khmer-red"
						>
							View Profile
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
