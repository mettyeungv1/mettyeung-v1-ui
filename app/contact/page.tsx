import { ContactHeroSection } from "@/components/contact/contact-hero-section";
import { ContactMapSection } from "@/components/contact/contact-map";
import {
	getContactSettingsService,
} from "@/service/contact/contact-service";

export default async function ContactPage() {
	const settings = await getContactSettingsService();

	return (
		<div className="min-h-screen bg-gray-50">
			<ContactHeroSection settings={settings} />
			<ContactMapSection settings={settings} />
		</div>
	);
}
