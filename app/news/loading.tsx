import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the NewsPageClient layout: hero + featured section + sidebar + grid.
export default function NewsLoading() {
	return (
		<div className="min-h-screen bg-gray-50 animate-in fade-in duration-300">
			{/* Hero banner */}
			<div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 pt-32 pb-20 md:pt-40 md:pb-28 px-4">
				<div className="container mx-auto flex flex-col items-center gap-4 max-w-4xl">
					<Skeleton className="h-16 w-16 rounded-2xl bg-white/10" />
					<Skeleton className="h-12 w-80 bg-white/15" />
					<Skeleton className="h-6 w-96 max-w-full bg-white/10" />
				</div>
			</div>

			{/* Featured section */}
			<div className="container mx-auto px-4 py-12">
				<Skeleton className="h-9 w-48 mb-8" />
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
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

				{/* Sidebar + grid layout */}
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
							{Array.from({ length: 6 }).map((_, i) => (
								<div key={i} className="rounded-xl border bg-white overflow-hidden shadow-sm">
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
		</div>
	);
}
