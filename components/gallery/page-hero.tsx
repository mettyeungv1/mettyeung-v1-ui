import { AnimatedSection } from "@/components/ui/animated-section";

interface PageHeroProps {
	title: string;
	subtitle: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
	return (
		<section className="relative py-24 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10">
			<div className="container">
				<AnimatedSection className="text-center max-w-4xl mx-auto">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
						{title}
					</h1>
					<p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
						{subtitle}
					</p>
				</AnimatedSection>
			</div>
		</section>
	);
}
