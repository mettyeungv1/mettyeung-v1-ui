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

interface LoginPromptModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function LoginPromptModal({
	open,
	onOpenChange,
}: LoginPromptModalProps) {
	const router = useRouter();

	const handleLoginRedirect = () => {
		router.push("/auth/login");
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2">
						<LogIn className="h-5 w-5" />
						Please Log In
					</AlertDialogTitle>
					<AlertDialogDescription>
						You need to be logged in to post a comment. Would you like to log in
						now?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button onClick={handleLoginRedirect}>Go to Login Page</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
