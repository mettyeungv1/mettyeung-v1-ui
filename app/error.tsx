"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error("[GlobalError]", error);
	}, [error]);

	return (
		<div className="min-h-[70vh] flex items-center justify-center px-4">
			<div className="max-w-md w-full text-center space-y-6">
				{/* Icon */}
				<div className="flex justify-center">
					<div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
						<AlertCircle className="h-10 w-10 text-destructive" />
					</div>
				</div>

				{/* Heading */}
				<div className="space-y-2">
					<h1 className="text-2xl font-bold text-foreground">
						Something went wrong
					</h1>
					<p className="text-muted-foreground text-sm leading-relaxed">
						An unexpected error occurred while loading this page. You can try
						again or return to the home page.
					</p>
					{error.digest && (
						<p className="text-xs text-muted-foreground/60 font-mono">
							Error ID: {error.digest}
						</p>
					)}
				</div>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-3">
					<Button onClick={reset} className="w-full sm:w-auto gap-2">
						<RefreshCw className="h-4 w-4" />
						Try again
					</Button>
					<Button
						variant="outline"
						asChild
						className="w-full sm:w-auto gap-2"
					>
						<a href="/">
							<Home className="h-4 w-4" />
							Go to home
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
