import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the PartnersPage layout: hero + MOU scroller + partner logo grid.
export default function NetworkLoading() {
	return (
		<div className="min-h-screen bg-gray-50/50 animate-in fade-in duration-300">
			{/* Hero */}
			<div className="relative bg-gradient-to-br from-primary/90 to-primary py-28 px-4">
				<div className="container mx-auto flex flex-col items-center gap-4">
					<Skeleton className="h-5 w-24 rounded-full bg-white/20" />
					<Skeleton className="h-11 w-72 bg-white/20" />
					<Skeleton className="h-4 w-96 max-w-full bg-white/10" />
					<Skeleton className="h-4 w-64 bg-white/10" />
				</div>
			</div>

			{/* MOU scroller placeholder */}
			<div className="bg-white border-b border-border py-6 overflow-hidden">
				<div className="container mx-auto px-4">
					<Skeleton className="h-4 w-32 mb-4" />
					<div className="flex gap-6">
						{Array.from({ length: 8 }).map((_, i) => (
							<Skeleton
								key={i}
								className="h-12 w-28 rounded-lg shrink-0"
							/>
						))}
					</div>
				</div>
			</div>

			{/* Partners grid section */}
			<div className="container mx-auto px-4 py-14">
				{/* Section heading */}
				<div className="flex flex-col items-center gap-3 mb-10">
					<Skeleton className="h-4 w-20 rounded-full" />
					<Skeleton className="h-8 w-56" />
					<Skeleton className="h-4 w-80 max-w-full" />
				</div>

				{/* Filter chips */}
				<div className="flex gap-2 flex-wrap justify-center mb-8">
					{Array.from({ length: 5 }).map((_, i) => (
						<Skeleton key={i} className="h-8 w-24 rounded-full" />
					))}
				</div>

				{/* Logo card grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
					{Array.from({ length: 18 }).map((_, i) => (
						<div
							key={i}
							className="rounded-xl border border-border bg-white p-4 flex flex-col items-center gap-3 shadow-sm"
						>
							<Skeleton className="h-14 w-14 rounded-full" />
							<Skeleton className="h-3 w-3/4" />
							<Skeleton className="h-3 w-1/2" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
