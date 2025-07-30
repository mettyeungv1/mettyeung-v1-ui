import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface ArticleContentProps {
	content: string;
	tags: string[];
}

export function ArticleContent({ content, tags }: ArticleContentProps) {
	return (
		<>
			<div
				className="prose prose-lg max-w-none prose-p:text-gray-700 prose-headings:font-bold prose-blockquote:font-normal"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
			<div className="mt-12 pt-6 border-t">
				<div className="flex flex-wrap items-center gap-2">
					<Tag className="w-4 h-4 text-gray-500 mr-2" />
					{tags.map((tag) => (
						<Badge key={tag} variant="secondary">
							#{tag}
						</Badge>
					))}
				</div>
			</div>
		</>
	);
}
