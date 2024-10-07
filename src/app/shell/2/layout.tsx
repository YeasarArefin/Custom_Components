import Shell from "@/components/shell_2/Shell";
import React from "react";

export default function layout({ children }: { children: React.ReactNode; }) {
    return (
        <Shell>
            {children}
        </Shell>
    );
}
