import { useTranslation } from "@/lib/i18n";
import { ValueItem } from "@/lib/types/about";
import { Card, CardContent } from "@/components/ui/card";

export function ValueCard({ item }: { item: ValueItem }) {
	const { t } = useTranslation();
	const Icon = item.icon;

	return (
		<Card className={`p-6 sm:p-8 h-full border-l-4 ${item.borderColor}`}>
			<CardContent className="p-0">
				<div className="mb-6">
					<Icon
						className={`w-10 h-10 sm:w-12 sm:h-12 ${item.borderColor.replace(
							"border-l-",
							"text-"
						)} mb-4`}
					/>
					<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
						{t(item.titleKey)}
					</h2>
				</div>
				<div className="text-base text-gray-600 leading-relaxed space-y-4">
					<p>{t(item.descriptionKey1)}</p>
					{item.listKeys && item.listKeys.length > 0 && (
						<ul className="list-disc pl-5 mt-2 space-y-2">
							{item.listKeys.map((key) => (
								<li key={key}>{t(key)}</li>
							))}
						</ul>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
