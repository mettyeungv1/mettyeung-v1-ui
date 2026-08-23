"use client";

import dynamic from "next/dynamic";
import { Copy, Facebook, Send, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";

const ShareDialog = dynamic(
	() => import("@/components/news/share-dialog").then((module) => module.ShareDialog),
	{ ssr: false }
);

interface ShareButtonsProps {
	title: string;
	excerpt: string;
	image: string;
}

export function ShareButtons({ title, excerpt, image }: ShareButtonsProps) {
	const { t } = useTranslation();
	const { toast } = useToast();
	const share = async (platform: "facebook" | "whatsapp" | "copy") => {
		const url = window.location.href;
		if (platform === "facebook") {
			window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "share-dialog", "width=600,height=400");
		} else if (platform === "whatsapp") {
			window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${url}`)}`, "_blank");
		} else {
			await navigator.clipboard.writeText(url);
			toast({ title: t("news.linkCopiedTitle"), description: t("news.linkCopiedDescription") });
		}
	};

	return (
		<div className="flex items-center gap-1 border-y border-border-subtle py-3">
			<Button type="button" variant="ghost" size="icon" onClick={() => share("facebook")} aria-label="Share on Facebook"><Facebook className="h-4 w-4" /></Button>
			<Button type="button" variant="ghost" size="icon" onClick={() => share("whatsapp")} aria-label="Share on WhatsApp"><Send className="h-4 w-4" /></Button>
			<Button type="button" variant="ghost" size="icon" onClick={() => share("copy")} aria-label="Copy link"><Copy className="h-4 w-4" /></Button>
			<ShareDialog article={{ title, excerpt, image }} trigger={<Button type="button" variant="ghost" size="sm" className="ml-auto"><Share2 className="mr-2 h-4 w-4" />{t("news.shareArticle")}</Button>} />
		</div>
	);
}
