import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactInfoGrid } from "@/components/contact/contact-info-grid";
import { ContactMapSection } from "@/components/contact/contact-map";
import {
	getContactSettingsService,
	getSocialLinksService,
} from "@/service/contact/contact-service";

export default async function ContactPage() {
	const [settings, socialLinks] = await Promise.all([
		getContactSettingsService(),
		getSocialLinksService(),
	]);

	return (
		<div className="min-h-screen bg-white">
			<ContactHeroSection />
			<ContactInfoGrid settings={settings} />
			<ContactMapSection settings={settings} socialLinks={socialLinks} />
		</div>
	);
}
