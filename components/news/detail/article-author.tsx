import { Author } from "@/lib/types/news";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ArticleAuthor({ author }: { author: Author }) {
	const displayName = "Mettyeung27";

	return (
		<div className="bg-gradient-to-r from-gray-50 to-khmer-gold/5 rounded-xl p-6 my-8 border">
			<div className="flex items-start space-x-4">
				<Avatar className="w-16 h-16 ring-2">
					<AvatarImage src={author.avatar} alt={displayName} />
					<AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<h4 className="text-lg font-semibold text-gray-900 mb-2">
						{displayName}
					</h4>
					{author.bio_en && (
						<p className="text-gray-600 text-sm leading-relaxed mb-3">
							{author.bio_en}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
