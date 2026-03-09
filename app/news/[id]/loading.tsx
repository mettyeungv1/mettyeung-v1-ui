import { Skeleton } from "@/components/ui/skeleton";

// Mirrors the NewsDetailClient layout: breadcrumb + article header + content + sidebar.
export default function NewsDetailLoading() {
	return (
		<div className="min-h-screen bg-background animate-in fade-in duration-300">
			{/* Cover image */}
			<Skeleton className="w-full h-[420px] rounded-none" />

			<div className="container mx-auto px-4 py-10">
				<div className="flex flex-col lg:flex-row gap-12">
					{/* Article body */}
					<article className="flex-1 min-w-0">
						{/* Breadcrumbs */}
						<div className="flex items-center gap-2 mb-6">
							<Skeleton className="h-3 w-12" />
							<Skeleton className="h-3 w-3 rounded-full" />
							<Skeleton className="h-3 w-24" />
							<Skeleton className="h-3 w-3 rounded-full" />
							<Skeleton className="h-3 w-32" />
						</div>

						{/* Category badge + meta */}
						<div className="flex items-center gap-3 mb-4">
							<Skeleton className="h-6 w-20 rounded-full" />
							<Skeleton className="h-3 w-24" />
							<Skeleton className="h-3 w-16" />
						</div>

						{/* Title */}
						<Skeleton className="h-9 w-full mb-2" />
						<Skeleton className="h-9 w-4/5 mb-6" />

						{/* Author row */}
						<div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
							<Skeleton className="h-10 w-10 rounded-full shrink-0" />
							<div className="space-y-1">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						</div>

						{/* Article content blocks */}
						<div className="space-y-4">
							{Array.from({ length: 4 }).map((_, i) => (
								<div key={i} className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-11/12" />
									<Skeleton className="h-4 w-4/5" />
								</div>
							))}
							<Skeleton className="h-56 w-full rounded-xl my-6" />
							{Array.from({ length: 3 }).map((_, i) => (
								<div key={i} className="space-y-2">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-5/6" />
									<Skeleton className="h-4 w-full" />
								</div>
							))}
						</div>
					</article>

					{/* Sidebar */}
					<aside className="w-full lg:w-80 shrink-0 space-y-6">
						{/* Related articles */}
						<div className="rounded-xl border border-border bg-card p-5 space-y-4">
							<Skeleton className="h-5 w-36" />
							{Array.from({ length: 4 }).map((_, i) => (
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

						{/* Tags */}
						<div className="rounded-xl border border-border bg-card p-5 space-y-3">
							<Skeleton className="h-5 w-16" />
							<div className="flex flex-wrap gap-2">
								{Array.from({ length: 6 }).map((_, i) => (
									<Skeleton key={i} className="h-7 w-20 rounded-full" />
								))}
							</div>
						</div>
					</aside>
				</div>
			</div>
		</div>
	);
}
