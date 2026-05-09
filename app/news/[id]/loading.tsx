import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the NewsDetailClient layout: breadcrumb + 8/4 col grid with article + sidebar.
export default function NewsDetailLoading() {
	return (
		<div className="min-h-screen bg-white pt-16 lg:pt-20 animate-in fade-in duration-300">
			{/* Breadcrumb */}
			<div className="bg-gray-50 py-4 border-b">
				<div className="container">
					<div className="flex items-center gap-2">
						<Skeleton className="h-3.5 w-12" />
						<Skeleton className="h-3.5 w-3.5" />
						<Skeleton className="h-3.5 w-16" />
						<Skeleton className="h-3.5 w-3.5" />
						<Skeleton className="h-3.5 w-48" />
					</div>
				</div>
			</div>

			<div className="container py-12">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
					{/* Main content */}
					<main className="lg:col-span-8 space-y-8">
						{/* Header meta */}
						<div className="flex items-center gap-3">
							<Skeleton className="h-7 w-24 rounded-full" />
							<Skeleton className="h-4 w-28" />
							<Skeleton className="h-4 w-20" />
							<Skeleton className="h-4 w-24" />
						</div>

						{/* Title */}
						<div>
							<Skeleton className="h-10 w-full mb-3" />
							<Skeleton className="h-10 w-3/4 mb-6" />
						</div>

						{/* Excerpt */}
						<Skeleton className="h-5 w-full" />
						<Skeleton className="h-5 w-5/6" />

						{/* Cover image */}
						<Skeleton className="w-full aspect-video rounded-xl" />

						{/* Author card */}
						<div className="rounded-xl p-6 border">
							<div className="flex items-start gap-4">
								<Skeleton className="h-16 w-16 rounded-full shrink-0" />
								<div className="flex-1 space-y-2">
									<Skeleton className="h-5 w-32" />
									<Skeleton className="h-4 w-48" />
								</div>
							</div>
						</div>

						{/* Article content */}
						<div className="space-y-4">
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-11/12" />
									<Skeleton className="h-4 w-4/5" />
								</div>
							))}
						</div>

						{/* Comments */}
						<div className="mt-16 space-y-4">
							<Skeleton className="h-6 w-36" />
							<Skeleton className="h-24 w-full rounded-lg" />
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="flex gap-3 pt-4">
									<Skeleton className="h-10 w-10 rounded-full shrink-0" />
									<div className="flex-1 space-y-2">
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-16 w-full rounded-lg" />
									</div>
								</div>
							))}
						</div>
					</main>

					{/* Sidebar */}
					<aside className="lg:col-span-4 space-y-6">
						<div className="rounded-xl border p-6 space-y-4">
							<Skeleton className="h-5 w-32" />
							<div className="space-y-3">
								{Array.from({ length: 4 }).map((_, i) => (
									<div key={i} className="flex justify-between">
										<Skeleton className="h-4 w-20" />
										<Skeleton className="h-4 w-24" />
									</div>
								))}
							</div>
						</div>

						<div className="rounded-xl border p-6 space-y-4">
							<Skeleton className="h-5 w-36" />
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="flex gap-3">
									<Skeleton className="h-20 w-20 rounded-lg shrink-0" />
									<div className="flex-1 space-y-2">
										<Skeleton className="h-4 w-full" />
										<Skeleton className="h-3 w-1/2" />
									</div>
								</div>
							))}
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}
