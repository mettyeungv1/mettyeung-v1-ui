"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => console.error("[videos]", error), [error]);
	return <div className="container py-16 text-center"><h2 className="text-2xl font-bold mb-4">Unable to load videos</h2><Button onClick={reset}>Try again</Button></div>;
}
