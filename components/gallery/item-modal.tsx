import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface ItemModalProps<T> {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	item: T | null;
	renderContent: (item: T) => React.ReactNode;
}

export function ItemModal<T extends { title_en: string }>({
	isOpen,
	onOpenChange,
	item,
	renderContent,
}: ItemModalProps<T>) {
	if (!item) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-4xl w-full">
				<DialogHeader>
					<DialogTitle className="text-lg font-bold">
						{item.title_en}
					</DialogTitle>
				</DialogHeader>
				{renderContent(item)}
			</DialogContent>
		</Dialog>
	);
}
