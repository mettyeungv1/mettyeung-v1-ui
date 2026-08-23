"use client";

import { type ReactNode } from "react";
import { Facebook, Linkedin, Link as LinkIcon, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/lib/i18n";

interface ShareDialogProps {
	trigger: ReactNode;
	article: { title: string; excerpt: string; image: string };
}

export function ShareDialog({ trigger, article }: ShareDialogProps) {
	const { t } = useTranslation();
	const { toast } = useToast();
	const share = async (platform: string) => {
		const url = window.location.href;
		const withUrl = encodeURIComponent(url);
		if (platform === "facebook") window.open(`https://www.facebook.com/sharer/sharer.php?u=${withUrl}`, "share-dialog", "width=600,height=400");
		if (platform === "linkedin") window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${withUrl}`, "share-dialog", "width=600,height=400");
		if (platform === "whatsapp") window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${article.title} - ${url}`)}`, "_blank");
		if (platform === "telegram") window.open(`https://t.me/share/url?url=${withUrl}&text=${encodeURIComponent(article.title)}`, "share-dialog", "width=600,height=400");
		if (platform === "email") window.location.href = `mailto:?subject=${encodeURIComponent(article.title)}&body=${withUrl}`;
		if (platform === "copy") { await navigator.clipboard.writeText(url); toast({ title: t("news.linkCopiedTitle"), description: t("news.linkCopiedDescription") }); }
	};
	const options = [{ id: "facebook", label: "Facebook", icon: Facebook }, { id: "linkedin", label: "LinkedIn", icon: Linkedin }, { id: "whatsapp", label: "WhatsApp", icon: MessageCircle }, { id: "telegram", label: "Telegram", icon: Send }, { id: "email", label: "Email", icon: Mail }];
	return <Dialog><DialogTrigger asChild>{trigger}</DialogTrigger><DialogContent className="max-w-md"><DialogHeader><DialogTitle>{t("news.shareArticle")}</DialogTitle></DialogHeader><p className="line-clamp-2 text-sm text-text-secondary">{article.title}</p><div className="grid grid-cols-5 gap-2">{options.map(({ id, label, icon: Icon }) => <Button key={id} variant="ghost" className="h-auto flex-col gap-2 py-3 text-xs" onClick={() => share(id)} aria-label={`Share on ${label}`}><Icon className="h-5 w-5" /><span>{label}</span></Button>)}</div><Button variant="outline" onClick={() => share("copy")}><LinkIcon className="mr-2 h-4 w-4" />{t("common.copy")}</Button></DialogContent></Dialog>;
}
