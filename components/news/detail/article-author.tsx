import { Author } from "@/lib/types/news";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, MapPin } from "lucide-react";

export function ArticleAuthor({ author }: { author: Author }) {
	return (
		<div className="bg-gradient-to-r from-gray-50 to-khmer-gold/5 rounded-xl p-6 my-8 border">
			<div className="flex items-start space-x-4">
				<Avatar className="w-16 h-16 ring-2 ring-khmer-gold/20">
					<AvatarImage src={author.avatar} alt={author.name_en} />
					<AvatarFallback>{author.name_en.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<h4 className="text-lg font-semibold text-gray-900 mb-2">
						{author.name_en}
					</h4>
					<p className="text-gray-600 text-sm leading-relaxed mb-3">
						{author.bio_en}
					</p>
					<div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
						{author.email && (
							<div className="flex items-center">
								<Mail className="w-3 h-3 mr-1.5" />
								{author.email}
							</div>
						)}
						{author.phone && (
							<div className="flex items-center">
								<Phone className="w-3 h-3 mr-1.5" />
								{author.phone}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
