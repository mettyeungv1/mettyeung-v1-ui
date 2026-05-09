import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactInfoGrid } from "@/components/contact/contact-info-grid";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ContactForm } from "@/components/contact/contact-from";
import { ContactSidebar } from "@/components/contact/contact-sidebar";
import { ContactMapSection } from "@/components/contact/contact-map";
import {
	getContactSettingsService,
	getSocialLinksService,
	getOfficeHoursService,
} from "@/service/contact/contact-service";

export default async function ContactPage() {
	const [settings, socialLinks, officeHours] = await Promise.all([
		getContactSettingsService(),
		getSocialLinksService(),
		getOfficeHoursService(),
	]);

	return (
		<div className="min-h-screen bg-gray-50">
			<ContactHeroSection settings={settings} />
			<ContactInfoGrid settings={settings} />
			<div className="section-padding-bottom">
				<ContactMapSection settings={settings} />
			</div>
			<section className="pb-24">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
						<div className="lg:col-span-3">
							<AnimatedSection direction="left">
								<ContactForm />
							</AnimatedSection>
						</div>
						<div className="lg:col-span-2">
							<AnimatedSection direction="right">
								<ContactSidebar socialLinks={socialLinks} officeHours={officeHours} />
							</AnimatedSection>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
