"use client";

import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface ArticleContentProps {
	content: string | Record<string, string>;
	tags: string[];
}

export function ArticleContent({ content, tags }: ArticleContentProps) {
	const { t } = useTranslation();
	const htmlContent = typeof content === "string" ? content : t(content);
	return (
		<>
			{htmlContent ? <article className="max-w-none text-gray-700 [&_h1]:text-h2 [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-8 sm:[&_h1]:mt-12 [&_h1]:mb-4 sm:[&_h1]:mb-6 [&_h2]:text-h3 [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-6 sm:[&_h2]:mt-10 [&_h2]:mb-3 sm:[&_h2]:mb-4 [&_h3]:text-h4 [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-4 sm:[&_h3]:mt-8 [&_h3]:mb-2 sm:[&_h3]:mb-3 [&_h4]:text-h5 [&_h4]:font-semibold [&_h4]:text-gray-900 [&_h4]:mt-4 [&_h4]:mb-2 [&_p]:text-body [&_p]:mb-4 sm:[&_p]:mb-6 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_em]:italic [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary-800 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-2 [&_li]:text-body [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 sm:[&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:my-6 [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full [&_img]:shadow-sm [&_figure]:my-6 [&_figcaption]:text-center [&_figcaption]:text-caption [&_figcaption]:text-gray-500 [&_figcaption]:mt-2 [&_pre]:bg-gray-100 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre]:text-sm [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-900 [&_th]:pb-3 [&_th]:border-b-2 [&_th]:border-gray-200 [&_td]:py-3 [&_td]:border-b [&_td]:border-gray-100 [&_hr]:border-gray-200 [&_hr]:my-8 [&_iframe]:w-full [&_iframe]:rounded-xl [&_iframe]:my-6 [&_iframe]:aspect-video" dangerouslySetInnerHTML={{ __html: htmlContent }} /> : null}
			{tags.length > 0 ? <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border-subtle pt-6"><Tag className="mr-1 h-4 w-4 text-text-muted" />{tags.map((tag) => <Badge key={tag} variant="secondary" className="rounded-full font-normal">#{tag}</Badge>)}</div> : null}
		</>
	);
}
