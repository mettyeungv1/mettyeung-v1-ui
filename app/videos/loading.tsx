import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the VideosPage layout: hero + category tabs + video card grid.
export default function VideosLoading() {
	return (
		<div className="min-h-screen bg-background animate-in fade-in duration-300">
			{/* Hero */}
			<div className="relative bg-gradient-to-br from-primary/90 to-primary py-28 px-4">
				<div className="container mx-auto flex flex-col items-center gap-4">
					<Skeleton className="h-5 w-16 rounded-full bg-white/20" />
					<Skeleton className="h-11 w-56 bg-white/20" />
					<Skeleton className="h-4 w-80 max-w-full bg-white/10" />
				</div>
			</div>

			<div className="container mx-auto px-4 py-10">
				{/* Category tabs */}
				<div className="flex gap-2 flex-wrap mb-8">
					{Array.from({ length: 5 }).map((_, i) => (
						<Skeleton key={i} className="h-9 w-28 rounded-full" />
					))}
				</div>

				{/* Video card grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 9 }).map((_, i) => (
						<div
							key={i}
							className="rounded-xl border border-border bg-card overflow-hidden shadow-sm"
						>
							{/* Thumbnail — 16:9 */}
							<div className="relative aspect-video bg-muted">
								<Skeleton className="absolute inset-0 rounded-none" />
								{/* Play button placeholder */}
								<div className="absolute inset-0 flex items-center justify-center">
									<Skeleton className="h-12 w-12 rounded-full" />
								</div>
							</div>
							<div className="p-4 space-y-2">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-4/5" />
								<div className="flex items-center justify-between pt-1">
									<Skeleton className="h-5 w-20 rounded-full" />
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
		</div>
	);
}
