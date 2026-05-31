import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsSkeleton() {
	return (
		<div className="w-full animate-in fade-in duration-300">
			{/* Featured section placeholder */}
			<section className="section-padding bg-white">
				<div className="container">
					<Skeleton className="h-9 w-48 mb-8" />
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{Array.from({ length: 2 }).map((_, i) => (
							<div key={i} className="rounded-xl border bg-white overflow-hidden shadow-sm">
								<Skeleton className="h-48 w-full rounded-none" />
								<div className="p-6 space-y-3">
									<div className="flex gap-2">
										<Skeleton className="h-6 w-20 rounded-full" />
										<Skeleton className="h-6 w-24 rounded-full" />
									</div>
									<Skeleton className="h-6 w-full" />
									<Skeleton className="h-4 w-5/6" />
									<Skeleton className="h-4 w-3/4" />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Sidebar + grid layout */}
			<section className="section-padding">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
						{/* Sidebar */}
						<div className="lg:col-span-1">
							<div className="rounded-xl border bg-white p-6 space-y-4">
								<Skeleton className="h-5 w-20 mb-2" />
								<Skeleton className="h-10 w-full rounded-lg" />
								<div className="pt-4 space-y-3">
									<Skeleton className="h-5 w-28" />
									{Array.from({ length: 4 }).map((_, i) => (
										<div key={i} className="flex gap-3">
											<Skeleton className="h-16 w-16 rounded-lg shrink-0" />
											<div className="flex-1 space-y-2">
												<Skeleton className="h-4 w-full" />
												<Skeleton className="h-3 w-1/2" />
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Grid */}
						<div className="lg:col-span-3">
							<div className="flex items-center justify-between mb-8">
								<div>
									<Skeleton className="h-7 w-32 mb-2" />
									<Skeleton className="h-4 w-28" />
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{Array.from({ length: 6 }).map((_, i) => (
									<div key={i} className="rounded-xl border bg-white overflow-hidden shadow-sm h-[400px]">
										<Skeleton className="h-48 w-full rounded-none" />
										<div className="p-6 space-y-3">
											<div className="flex gap-2">
												<Skeleton className="h-5 w-16 rounded-full" />
												<Skeleton className="h-5 w-20 rounded-full" />
											</div>
											<Skeleton className="h-5 w-full" />
											<Skeleton className="h-4 w-5/6" />
											<Skeleton className="h-4 w-3/4" />
											<div className="flex items-center justify-between pt-3 border-t">
												<Skeleton className="h-4 w-24" />
												<Skeleton className="h-4 w-16" />
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
