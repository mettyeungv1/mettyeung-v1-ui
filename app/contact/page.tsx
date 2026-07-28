import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactInfoGrid } from "@/components/contact/contact-info-grid";
import { ContactMapSection } from "@/components/contact/contact-map";
import { ContactSidebar } from "@/components/contact/contact-sidebar";
import {
	getContactSettingsService,
	getOfficeHoursService,
	getSocialLinksService,
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
			<section className="bg-gray-50 pb-16 md:pb-24">
				<div className="container grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.8fr)]">
					<ContactMapSection settings={settings} />
					<ContactSidebar socialLinks={socialLinks} officeHours={officeHours} />
				</div>
			</section>
		</div>
	);
}
