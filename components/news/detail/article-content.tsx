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
						className="leading-relaxed [&>*]:mb-4 sm:[&>*]:mb-6 [&>h1]:text-2xl sm:[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-8 sm:[&>h1]:mt-12 [&>h1]:mb-4 sm:[&>h1]:mb-6 [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mt-6 sm:[&>h2]:mt-10 [&>h2]:mb-3 sm:[&>h2]:mb-4 [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-medium [&>h3]:mt-4 sm:[&>h3]:mt-8 [&>h3]:mb-2 sm:[&>h3]:mb-3 [&>p]:text-sm sm:[&>p]:text-base [&>p]:leading-6 sm:[&>p]:leading-7 [&>ul]:space-y-1 sm:[&>ul]:space-y-2 [&>ol]:space-y-1 sm:[&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 sm:[&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-muted-foreground"
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
