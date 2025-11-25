"use client";

import { socialLinks } from "@/lib/data/contact";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Users, MapPin } from "lucide-react";

export function ContactSidebar() {
	return (
		<div className="space-y-8">
			<Card className="p-6">
				<CardHeader className="p-0 mb-4">
					<CardTitle className="text-xl font-bold flex items-center">
						<Clock className="w-6 h-6 text-khmer-gold mr-3" />
						Working Hours
					</CardTitle>
				</CardHeader>
				<div className="space-y-3 text-sm">
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Monday - Friday</span>
						<span className="font-medium">9:00 AM - 4:30 PM</span>
					</div>
					{/* <Separator />
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Saturday</span>
						<span className="font-medium">8:00 AM - 12:00 PM</span>
					</div> */}
					<Separator />
					<div className="flex justify-between items-center">
						<span className="text-gray-600">Saturday & Sunday</span>
						<span className="font-medium text-red-500">Closed</span>
					</div>
				</div>
			</Card>

			<Card className="p-6">
				<CardHeader className="p-0 mb-4">
					<CardTitle className="text-xl font-bold">Follow Us</CardTitle>
				</CardHeader>
				<div className="flex space-x-3">
					{socialLinks.map((social) => (
						<Button key={social.name} variant="outline" size="icon" asChild>
							<a href={social.href} target="_blank" rel="noopener noreferrer">
								<social.icon className="w-5 h-5" />
							</a>
						</Button>
					))}
				</div>
			</Card>

			{/* <Card className="p-6">
				<CardHeader className="p-0 mb-4">
					<CardTitle className="text-xl font-bold">Our Location</CardTitle>
				</CardHeader>
				<div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
					<MapPin className="w-8 h-8" />{" "}
					<span className="ml-2">Map Preview</span>
				</div>
			</Card> */}
		</div>
	);
}
