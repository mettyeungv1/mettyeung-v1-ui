import { Skeleton } from "@/components/ui/skeleton";

// Matches the StructurePage layout: hero + filter bar + department sections with person cards.
export default function StructureLoading() {
	return (
		<div className="min-h-screen bg-gray-50 animate-in fade-in duration-300">
			{/* Hero skeleton */}
			<div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 pt-32 pb-20 md:pt-40 md:pb-28 px-4">
				<div className="container mx-auto flex flex-col items-center gap-4 max-w-4xl">
					<Skeleton className="h-16 w-16 rounded-2xl bg-white/10" />
					<Skeleton className="h-12 w-80 bg-white/15" />
					<Skeleton className="h-6 w-96 max-w-full bg-white/10" />
				</div>
			</div>

			{/* Filter bar skeleton */}
			<div className="py-6 bg-white border-b">
				<div className="container mx-auto">
					<div className="flex flex-col sm:flex-row gap-3">
						<Skeleton className="h-11 flex-1 max-w-md rounded-lg" />
						<Skeleton className="h-11 w-52 rounded-lg" />
					</div>
					<div className="flex items-center mt-3">
						<Skeleton className="h-4 w-64" />
					</div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-16">
				{/* Section title */}
				<div className="text-center mb-16">
					<Skeleton className="h-10 w-64 mx-auto" />
				</div>

				{/* Department sections */}
				{Array.from({ length: 3 }).map((_, sectionIdx) => (
					<div key={sectionIdx} className="mb-16">
						{/* Department header */}
						<div className="flex items-end justify-between mb-10 border-b border-dashed border-gray-300 pb-6">
							<div className="space-y-3 flex-1">
								<Skeleton className="h-9 w-64" />
								<Skeleton className="h-4 w-96 max-w-full" />
							</div>
							<Skeleton className="h-4 w-24" />
						</div>

						{/* Member card grid - matches arc avatar card design */}
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
							{Array.from({ length: 3 }).map((_, i) => (
								<div
									key={i}
									className="flex flex-col items-center text-center px-8 py-10 gap-6 rounded-2xl"
								>
									{/* Arc avatar skeleton */}
									<div className="relative w-[200px] h-[200px]">
										<Skeleton className="absolute inset-[12px] rounded-full" />
									</div>
									{/* Text skeleton */}
									<div className="space-y-2 w-full flex flex-col items-center">
										<Skeleton className="h-6 w-40" />
										<Skeleton className="h-4 w-32" />
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
