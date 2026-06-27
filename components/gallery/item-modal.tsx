import React from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
	const isMobile = useIsMobile();
	
	if (!item) return null;

	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={onOpenChange}>
				<DrawerContent className="h-[94dvh] mt-0 rounded-t-xl fixed bottom-0 left-0 right-0 z-[120] overflow-hidden bg-white">
					<VisuallyHidden>
						<DrawerTitle>{item.title_en}</DrawerTitle>
					</VisuallyHidden>
					<div className="h-full overflow-y-auto">
						{renderContent(item)}
					</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-6xl w-[calc(100vw-2rem)] max-h-[92vh] overflow-hidden z-[120] p-0 sm:rounded-xl border bg-white shadow-xl">
				<VisuallyHidden>
					<DialogTitle>{item.title_en}</DialogTitle>
				</VisuallyHidden>
				{renderContent(item)}
			</DialogContent>
		</Dialog>
	);
}
