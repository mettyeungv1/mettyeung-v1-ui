"use client";

import React, { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";

import { Member } from "@/lib/types/structure";
import { getMemberByIdService } from "@/service/structure/structure-service";

// Reusable Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// New Organized Components
import { ProfileCard } from "@/components/structure/detail/profile-card";
import { DetailSection } from "@/components/structure/detail/detail-section";

// Icons
import {
	ArrowLeft,
	Star,
	Award,
	BookOpen,
	Globe,
	Users,
	Heart,
	Briefcase,
} from "lucide-react";

const DetailSkeleton = () => (
	<div className="min-h-screen bg-gray-50">
		<section className="relative py-16 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10">
			<div className="container">
				<Skeleton className="h-10 w-32 mb-6" />
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					<div className="lg:col-span-1">
						<Skeleton className="h-96 w-full rounded-lg" />
					</div>
					<div className="lg:col-span-2 space-y-8">
						<Skeleton className="h-64 w-full rounded-lg" />
						<Skeleton className="h-64 w-full rounded-lg" />
					</div>
				</div>
			</div>
		</section>
	</div>
);

export default function PersonDetailPage() {
	const [person, setPerson] = useState<Member | null>(null);
	const [loading, setLoading] = useState(true);
	const params = useParams<{ id: string }>();

	useEffect(() => {
		const fetchPerson = async () => {
			setLoading(true);
			try {
				const data = await getMemberByIdService(params.id);
				setPerson(data);
			} catch (error) {
				console.error("Failed to fetch member:", error);
				// Handle 404 or other errors
				notFound();
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchPerson();
		}
	}, [params.id]);

	if (loading) {
		return <DetailSkeleton />;
	}

	if (!person) {
		return notFound();
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<section className="relative py-16 bg-gradient-to-br from-khmer-gold/10 via-white to-khmer-red/10">
				<div className="container">
					<div className="mb-6">
						<Button
							variant="ghost"
							asChild
							className="text-gray-600 hover:text-khmer-gold"
						>
							<Link href="/structure">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Back to Organization
							</Link>
						</Button>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						<div className="lg:col-span-1">
							<ProfileCard person={person as any} />
						</div>
						<div className="lg:col-span-2 space-y-8">
							{/* Skills Section */}
							{person.skills.length > 0 && (
								<DetailSection title="Skills & Expertise" icon={Star}>
									<div className="flex flex-wrap gap-3">
										{person.skills.map((skill, idx) => (
											<Badge key={idx} variant="secondary">
												{skill}
											</Badge>
										))}
									</div>
								</DetailSection>
							)}

							{/* Professional Experience Section */}
							{person.experience.length > 0 && (
								<DetailSection
									title="Professional Experience"
									icon={Award}
									delay={0.1}
								>
									<div className="space-y-6">
										{person.experience.map((exp, index) => (
											<div key={index}>
												{index > 0 && <Separator className="mb-6" />}
												<div className="flex flex-col sm:flex-row items-start justify-between gap-2">
													<div>
														<h4 className="font-semibold text-lg">
															{exp.title}
														</h4>
														<p className="text-khmer-gold font-medium">
															{exp.company}
														</p>
													</div>
													<Badge variant="outline" className="flex-shrink-0">
														{exp.period}
													</Badge>
												</div>
												<p className="text-gray-600 mt-2">{exp.description}</p>
											</div>
										))}
									</div>
								</DetailSection>
							)}

							{/* Education Section */}
							{person.education.length > 0 && (
								<DetailSection title="Education" icon={BookOpen} delay={0.2}>
									{person.education.map((edu, index) => (
										<div key={index} className="mb-4 last:mb-0">
											<h4 className="font-semibold">{edu.degree}</h4>
											<p className="text-sm text-khmer-gold">
												{edu.institution} - {edu.year}
											</p>
										</div>
									))}
								</DetailSection>
							)}

							{/* Raw Education Data from API */}
							{person.educations && person.educations.length > 0 && (
								<DetailSection
									title="Educational Background"
									icon={BookOpen}
									delay={0.2}
								>
									<div className="space-y-4">
										{person.educations
											.sort((a, b) => a.order - b.order)
											.map((edu, index) => (
												<div
													key={index}
													className="border-l-2 border-khmer-gold pl-4"
												>
													<h4 className="font-semibold">
														{edu.degree.en || edu.degree.km}
													</h4>
													<p className="text-sm text-khmer-gold">
														{edu.schoolName.en || edu.schoolName.km}
													</p>
													<p className="text-xs text-gray-500">
														{edu.startYear} - {edu.endYear || "Present"}
													</p>
												</div>
											))}
									</div>
								</DetailSection>
							)}

							{/* Raw Experience Data from API */}
							{person.experiences && person.experiences.length > 0 && (
								<DetailSection
									title="Work History"
									icon={Briefcase}
									delay={0.25}
								>
									<div className="space-y-6">
										{person.experiences
											.sort((a, b) => a.order - b.order)
											.map((exp, index) => (
												<div key={index}>
													{index > 0 && <Separator className="mb-6" />}
													<div className="flex flex-col sm:flex-row items-start justify-between gap-2">
														<div>
															<h4 className="font-semibold text-lg">
																{exp.title.en || exp.title.km}
															</h4>
															<p className="text-khmer-gold font-medium">
																{exp.organization.en || exp.organization.km}
															</p>
														</div>
														<Badge variant="outline" className="flex-shrink-0">
															{exp.startYear} - {exp.endYear || "Present"}
														</Badge>
													</div>
													{exp.description && (
														<p className="text-gray-600 mt-2">
															{exp.description.en || exp.description.km}
														</p>
													)}
												</div>
											))}
									</div>
								</DetailSection>
							)}

							{/* Projects Section */}
							{person.projects && person.projects.length > 0 && (
								<DetailSection
									title="Projects Involved"
									icon={Users}
									delay={0.3}
								>
									<div className="flex flex-wrap gap-2">
										{person.projects.map((project, idx) => (
											<Badge key={idx} variant="outline">
												{project}
											</Badge>
										))}
									</div>
								</DetailSection>
							)}

							{/* Testimonials Section */}
							{person.testimonials && person.testimonials.length > 0 && (
								<DetailSection title="What Others Say" icon={Heart} delay={0.4}>
									<div className="space-y-6">
										{person.testimonials.map((t, i) => (
											<div
												key={i}
												className="p-4 bg-gray-50 rounded-lg border italic"
											>
												"{t.text}"
												<p className="not-italic text-right font-medium text-sm mt-2">
													- {t.author}, {t.role}
												</p>
											</div>
										))}
									</div>
								</DetailSection>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
