import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ArticleAuthor() {
	const displayName = "Mett Yeung Association";
	return <div className="my-8 rounded-xl border bg-gradient-to-r from-gray-50 to-khmer-gold/5 p-6"><div className="flex items-start space-x-4"><Avatar className="flex h-16 w-16 items-center justify-center bg-white p-1 ring-2"><AvatarImage src="/logo.png" alt={displayName} className="object-contain" /><AvatarFallback>{displayName.charAt(0)}</AvatarFallback></Avatar><div className="flex-1"><h4 className="mb-1 text-lg font-semibold text-gray-900">{displayName}</h4><p className="text-sm font-medium text-primary">Phone: (+855) 012 345 678</p></div></div></div>;
}
