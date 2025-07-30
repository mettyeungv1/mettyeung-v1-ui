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
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-3">
						<Icon className="w-5 h-5 text-khmer-gold" />
						<span className="text-xl">{title}</span>
					</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
			</Card>
		</AnimatedSection>
	);
}
