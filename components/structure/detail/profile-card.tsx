import { Person } from "@/lib/stores/person-store";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Mail,
	Phone,
	MapPin,
	Calendar,
	ExternalLink,
	Building,
} from "lucide-react";

interface ProfileCardProps {
	person: Person;
}

export function ProfileCard({ person }: ProfileCardProps) {
	return (
		<Card className="sticky top-24 shadow-lg">
			<CardContent className="p-8 text-center">
				<Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-khmer-gold/20">
					<AvatarImage src={person.image} alt={person.name_en} />
					<AvatarFallback className="bg-gradient-to-br from-khmer-gold to-khmer-red text-white text-3xl font-bold">
						{person.name_en
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</AvatarFallback>
				</Avatar>
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					{person.name_en}
				</h1>
				<p className="text-lg text-gray-600 mb-3">{person.name}</p>
				<Badge className="bg-khmer-gold text-white mb-4">
					{person.position_en}
				</Badge>
				<div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
					<Building className="w-4 h-4" />
					<span>{person.department}</span>
				</div>
				<p className="text-gray-600 leading-relaxed mb-6">{person.bio}</p>
				<div className="space-y-3 text-left text-sm">
					<div className="flex items-center space-x-3">
						<Mail className="w-4 h-4 text-gray-400" />
						<a
							href={`mailto:${person.email}`}
							className="text-gray-600 hover:text-khmer-gold"
						>
							{person.email}
						</a>
					</div>
					<div className="flex items-center space-x-3">
						<Phone className="w-4 h-4 text-gray-400" />
						<a
							href={`tel:${person.phone}`}
							className="text-gray-600 hover:text-khmer-gold"
						>
							{person.phone}
						</a>
					</div>
					<div className="flex items-center space-x-3">
						<MapPin className="w-4 h-4 text-gray-400" />
						<span className="text-gray-600">{person.location}</span>
					</div>
					<div className="flex items-center space-x-3">
						<Calendar className="w-4 h-4 text-gray-400" />
						<span className="text-gray-600">Joined in {person.joinDate}</span>
					</div>
				</div>
				{person.socialLinks.length > 0 && (
					<div className="mt-6 pt-6 border-t">
						<div className="flex justify-center space-x-3">
							{person.socialLinks.map((social) => (
								<Button
									key={social.platform}
									variant="outline"
									size="sm"
									asChild
									className="hover:bg-khmer-gold hover:text-white hover:border-khmer-gold"
								>
									<a
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center space-x-2"
									>
										<ExternalLink className="w-4 h-4" />
										<span>{social.platform}</span>
									</a>
								</Button>
							))}
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
