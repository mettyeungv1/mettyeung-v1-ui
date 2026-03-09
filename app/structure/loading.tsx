import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the StructurePage layout: hero + filter bar + member card grid.
export default function StructureLoading() {
	return (
		<div className="min-h-screen bg-background animate-in fade-in duration-300">
			{/* Hero */}
			<div className="relative bg-gradient-to-br from-primary/90 to-primary py-28 px-4">
				<div className="container mx-auto flex flex-col items-center gap-4">
					<Skeleton className="h-5 w-28 rounded-full bg-white/20" />
					<Skeleton className="h-11 w-80 bg-white/20" />
					<Skeleton className="h-4 w-96 max-w-full bg-white/10" />
				</div>
			</div>

			<div className="container mx-auto px-4 py-10">
				{/* Filter bar */}
				<div className="flex flex-col sm:flex-row gap-3 mb-8">
					<Skeleton className="h-10 flex-1 max-w-sm rounded-lg" />
					<Skeleton className="h-10 w-40 rounded-lg" />
					<Skeleton className="h-10 w-40 rounded-lg" />
				</div>

				{/* Department title */}
				<div className="mb-6">
					<Skeleton className="h-6 w-48 mb-1" />
					<Skeleton className="h-px w-full bg-border" />
				</div>

				{/* Member card grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
					{Array.from({ length: 12 }).map((_, i) => (
						<div
							key={i}
							className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
						>
							{/* Avatar area */}
							<div className="relative h-52 bg-muted">
								<Skeleton className="absolute inset-0 rounded-none" />
							</div>
							<div className="p-4 space-y-2">
								<Skeleton className="h-5 w-3/4" />
								<Skeleton className="h-3 w-1/2" />
								<div className="flex gap-2 pt-1">
									<Skeleton className="h-5 w-16 rounded-full" />
									<Skeleton className="h-5 w-20 rounded-full" />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
