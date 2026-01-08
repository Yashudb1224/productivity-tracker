"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ExportPDF({ targetId }: { targetId: string }) {
  const exportPDF = async () => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const canvas = await html2canvas(el);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(img, "PNG", 10, 10, 190, 0);
    pdf.save("productivity-report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="bg-white text-black px-4 py-2 rounded"
    >
      Export PDF
    </button>
  );
}
