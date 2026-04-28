import { Suspense } from "react";
import { InboxLayout } from "@/features/inbox/components/InboxLayout";

export default function InboxPage() {
    return (
        <Suspense fallback={<div>Loading inbox...</div>}>
            <InboxLayout />
        </Suspense>
    );
}
