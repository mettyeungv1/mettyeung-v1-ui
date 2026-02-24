import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";

interface DetailSectionProps {
	title: string;
	icon: React.ElementType;
	children: React.ReactNode;
	delay?: number;
}

export function DetailSection({
	title,
	icon: Icon,
	children,
	delay = 0,
}: DetailSectionProps) {
	return (
		<AnimatedSection delay={delay}>
			<Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl overflow-hidden print:shadow-none print:border-gray-200">
				<CardHeader className="pb-4">
					<CardTitle className="flex items-center gap-3">
						<span className="flex items-center justify-center w-10 h-10 rounded-xl bg-khmer-gold/10 print:bg-khmer-gold/5">
							<Icon className="w-5 h-5 text-khmer-gold" />
						</span>
						<span className="text-lg font-bold text-gray-900 tracking-tight">
							{title}
						</span>
					</CardTitle>
				</CardHeader>
				<CardContent className="pt-0">{children}</CardContent>
			</Card>
		</AnimatedSection>
	);
}
