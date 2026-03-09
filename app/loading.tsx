import { Skeleton } from "@/components/ui/skeleton";

// Global fallback loading — mirrors a generic hero + content section layout.
export default function Loading() {
	return (
		<div className="min-h-screen bg-background animate-in fade-in duration-300">
			{/* Hero skeleton */}
			<div className="relative h-[480px] bg-muted overflow-hidden">
				<Skeleton className="absolute inset-0 rounded-none" />
				{/* Centred text placeholder */}
				<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4">
					<Skeleton className="h-5 w-24 rounded-full" />
					<Skeleton className="h-10 w-2/3 max-w-lg" />
					<Skeleton className="h-10 w-1/2 max-w-xs" />
					<Skeleton className="h-4 w-80" />
					<Skeleton className="h-4 w-64" />
					<div className="flex gap-3 mt-2">
						<Skeleton className="h-11 w-32 rounded-full" />
						<Skeleton className="h-11 w-32 rounded-full" />
					</div>
				</div>
			</div>

			{/* Content section skeleton */}
			<div className="container mx-auto px-4 py-16">
				{/* Section heading */}
				<div className="flex flex-col items-center gap-3 mb-12">
					<Skeleton className="h-4 w-20 rounded-full" />
					<Skeleton className="h-8 w-64" />
					<Skeleton className="h-4 w-96 max-w-full" />
				</div>

				{/* Card grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<div
							key={i}
							className="rounded-xl border border-border bg-card overflow-hidden shadow-sm"
						>
							<Skeleton className="h-48 w-full rounded-none" />
							<div className="p-5 space-y-3">
								<Skeleton className="h-4 w-20 rounded-full" />
								<Skeleton className="h-5 w-full" />
								<Skeleton className="h-4 w-4/5" />
								<div className="flex items-center justify-between pt-1">
									<Skeleton className="h-3 w-24" />
									<Skeleton className="h-3 w-16" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
