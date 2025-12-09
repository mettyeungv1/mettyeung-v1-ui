"use client";

import { socialLinks } from "@/lib/data/contact";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart, Users, MapPin } from "lucide-react";

export function ContactSidebar() {
	return (
		<div className="space-y-8">
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
