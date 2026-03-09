import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the NewsPageClient layout: top filters + 12-card grid + sidebar.
export default function NewsLoading() {
	return (
		<div className="min-h-screen bg-background animate-in fade-in duration-300">
			{/* Hero banner */}
			<div className="relative bg-gradient-to-br from-primary/90 to-primary py-24 px-4">
				<div className="container mx-auto flex flex-col items-center gap-4">
					<Skeleton className="h-5 w-20 rounded-full bg-white/20" />
					<Skeleton className="h-10 w-64 bg-white/20" />
					<Skeleton className="h-4 w-80 bg-white/10" />
				</div>
			</div>

			<div className="container mx-auto px-4 py-10">
				{/* Category filter chips */}
				<div className="flex gap-2 flex-wrap mb-8">
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton key={i} className="h-8 w-24 rounded-full" />
					))}
				</div>

				<div className="flex flex-col lg:flex-row gap-8">
					{/* Main grid */}
					<div className="flex-1">
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
							{Array.from({ length: 9 }).map((_, i) => (
								<div
									key={i}
									className="rounded-xl border border-border bg-card overflow-hidden shadow-sm"
								>
									<Skeleton className="h-48 w-full rounded-none" />
									<div className="p-5 space-y-3">
										<div className="flex gap-2">
											<Skeleton className="h-5 w-16 rounded-full" />
											<Skeleton className="h-5 w-20 rounded-full" />
										</div>
										<Skeleton className="h-5 w-full" />
										<Skeleton className="h-4 w-5/6" />
										<Skeleton className="h-4 w-3/4" />
										<div className="flex items-center justify-between pt-2">
											<div className="flex items-center gap-2">
												<Skeleton className="h-6 w-6 rounded-full" />
												<Skeleton className="h-3 w-20" />
											</div>
											<Skeleton className="h-3 w-16" />
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Pagination */}
						<div className="flex justify-center gap-2 mt-10">
							{Array.from({ length: 5 }).map((_, i) => (
								<Skeleton key={i} className="h-9 w-9 rounded-md" />
							))}
						</div>
					</div>

					{/* Sidebar */}
					<div className="w-full lg:w-72 space-y-6 shrink-0">
						<div className="rounded-xl border border-border bg-card p-5 space-y-4">
							<Skeleton className="h-5 w-32" />
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="flex gap-3">
									<Skeleton className="h-16 w-16 rounded-lg shrink-0" />
									<div className="flex-1 space-y-2">
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-3 w-3/4" />
										<Skeleton className="h-3 w-1/2" />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
