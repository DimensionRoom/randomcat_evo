/**
 * Captures the stage (venue backdrop, instruments and notes) into a one-page
 * landscape PDF.
 *
 * This does not reuse utils/pdfExport.ts: that helper is written around the
 * brainstorm board's flip-card DOM and adds a cover page and notes section that
 * do not apply here. Both use the same already-installed jspdf + html2canvas.
 */
export async function exportStageToPDF(
  stage: HTMLElement,
  fileName: string
): Promise<void> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(stage, {
    backgroundColor: "#ffffff",
    scale: Math.min(2, window.devicePixelRatio || 1) * 1.5,
    useCORS: true,
    logging: false,
    // Controls opt out via data-html2canvas-ignore, but belt-and-braces here.
    ignoreElements: (element) =>
      element.getAttribute?.("data-html2canvas-ignore") === "true",
  });

  const image = canvas.toDataURL("image/jpeg", 0.92);
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  // Fit the capture inside the page while keeping its aspect ratio.
  const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
  const drawWidth = canvas.width * ratio;
  const drawHeight = canvas.height * ratio;

  pdf.addImage(
    image,
    "JPEG",
    (pageWidth - drawWidth) / 2,
    (pageHeight - drawHeight) / 2,
    drawWidth,
    drawHeight
  );
  pdf.save(`${fileName}.pdf`);
}
