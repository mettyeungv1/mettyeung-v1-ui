import { Author } from "@/lib/types/news";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ArticleAuthor({ author }: { author: Author }) {
	const displayName = "Mett Yeung Association";
	const phoneNumber = "(+855) 012 345 678";

	return (
		<div className="bg-gradient-to-r from-gray-50 to-khmer-gold/5 rounded-xl p-6 my-8 border">
			<div className="flex items-start space-x-4">
				<Avatar className="w-16 h-16 ring-2 bg-white flex items-center justify-center p-1">
					<AvatarImage src="/logo.png" alt={displayName} className="object-contain" />
					<AvatarFallback>{displayName.charAt(0)}</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<h4 className="text-lg font-semibold text-gray-900 mb-1">
						{displayName}
					</h4>
					{/* <p className="text-gray-600 text-sm leading-relaxed mb-1">
						Contact us for more details and inquiries.
					</p> */}
					<p className="text-primary font-medium text-sm">
						Phone: {phoneNumber}
					</p>
				</div>
			</div>
		</div>
	);
}
