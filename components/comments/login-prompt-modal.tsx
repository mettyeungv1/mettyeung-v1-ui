"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface LoginPromptModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function LoginPromptModal({
	open,
	onOpenChange,
}: LoginPromptModalProps) {
	const router = useRouter();
	const { t } = useTranslation();

	const handleLoginRedirect = () => {
		router.push("/auth/login");
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<LogIn className="h-5 w-5" />
						{t("comments.loginTitle")}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{t("comments.loginDescription")}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button onClick={handleLoginRedirect}>{t("comments.goToLogin")}</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
