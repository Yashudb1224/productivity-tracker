"use client";

import NeonButton from "@/components/ui/NeonButton";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";

export default function ExportButton() {
    const [loading, setLoading] = useState(false);

    const handleExport = async () => {
        const element = document.getElementById("dashboard-content");
        if (!element) return;

        setLoading(true);
        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: "#050505", // Match theme
            });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("productivity-report.pdf");
        } catch (error) {
            console.error("Export failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <NeonButton
            variant="purple"
            onClick={handleExport}
            disabled={loading}
            className={loading ? "opacity-50 cursor-not-allowed" : ""}
        >
            {loading ? "GENERATING..." : "EXPORT REPORT"}
        </NeonButton>
    );
}
