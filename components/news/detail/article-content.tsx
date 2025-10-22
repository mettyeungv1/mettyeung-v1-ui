import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";
import { FileText, Tag } from "lucide-react";
import { useCallback } from "react";
import DOMPurify from "dompurify";

interface ArticleContentProps {
	content: { [lang: string]: string };
	tags: string[];
}

export function ArticleContent({ content, tags }: ArticleContentProps) {
	const { t } = useTranslation();
	const renderPreviewContent = useCallback((htmlContent: string) => {
		const sanitized = DOMPurify.sanitize(htmlContent);
		return { __html: sanitized };
	}, []);

	return (
		<>
			<div className="prose prose-sm sm:prose-lg prose-slate max-w-none dark:prose-invert">
				{content && (
					<article
						className="prose prose-neutral dark:prose-invert max-w-none leading-relaxed"
						dangerouslySetInnerHTML={renderPreviewContent(t(content))}
					/>
				)}
			</div>
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
