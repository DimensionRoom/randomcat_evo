import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const addFontSupport = (pdf: jsPDF) => {
  try {
    pdf.setFont("helvetica", "normal");
  } catch (error) {
    console.warn("Font setting failed, using default");
  }
  return pdf;
};

const containsThai = (text: string): boolean => {
  return /[\u0E00-\u0E7F]/.test(text);
};

const processTextForPDF = (text: string, pdf: jsPDF): string[] => {
  const maxWidth = 170;
  const paragraphs = text.split("\n");
  const processedLines: string[] = [];
  paragraphs.forEach((paragraph) => {
    if (paragraph.trim() === "") {
      processedLines.push("");
      return;
    }
    const lines = pdf.splitTextToSize(paragraph, maxWidth);
    processedLines.push(...lines);
  });
  return processedLines;
};

const cloneBoardForExport = (originalBoard: HTMLElement): HTMLElement => {
  const clone = originalBoard.cloneNode(true) as HTMLElement;
  clone.querySelectorAll(".cardInner").forEach((el) => {
    el.classList.remove("isFlipped");
    (el as HTMLElement).style.transform = "none";
  });
  clone.querySelectorAll('[data-face="back"]').forEach((el) => {
    (el as HTMLElement).remove();
  });
  clone.querySelectorAll('[data-face="front"]').forEach((el) => {
    const elStyle = el as HTMLElement;
    elStyle.style.display = "block";
    elStyle.style.transform = "none";
    elStyle.style.backfaceVisibility = "visible";
  });
  return clone;
};

const forceUnflipElements = (root: HTMLElement) => {
  root.querySelectorAll<HTMLElement>(' * ').forEach(el => {
    const computed = window.getComputedStyle(el);
    if (computed.transform && computed.transform !== 'none') {
      el.style.transform = 'none';
    }
    el.style.backfaceVisibility = 'visible';
    el.style.transform = 'scaleX(1)';
  });
};

export const exportBoardToPDF = async (
  sessionElement: HTMLElement,
  filename: string = "think-tool-session",
  userName: string = "",
  brainstormNotes: string = ""
) => {
  try {
    const boardSection = sessionElement.querySelector('[data-board="true"]') as HTMLElement;
    const cloned = cloneBoardForExport(boardSection);
    const hiddenWrapper = document.createElement("div");
    hiddenWrapper.style.position = "fixed";
    hiddenWrapper.style.top = "-9999px";
    hiddenWrapper.style.left = "-9999px";
    hiddenWrapper.style.opacity = "0";
    hiddenWrapper.style.pointerEvents = "none";
    hiddenWrapper.appendChild(cloned);
    document.body.appendChild(hiddenWrapper);

    await new Promise((r) => setTimeout(r, 100));

    let boardCanvas = null;

    if (boardSection) {
      const cardContainers = boardSection.querySelectorAll('.sidebarCard');
      cardContainers.forEach((card) => {
        card.classList.add('no-flip-front-only');
        const inner = card.querySelector('.cardInner') as HTMLElement;
        if (inner) {
          inner.style.transform = 'none';
        }
      });

      const allFaces = boardSection.querySelectorAll('[data-face]');
      const originalDisplayMap: Map<Element, string> = new Map();

      allFaces.forEach((el) => {
        const face = el.getAttribute("data-face");
        if (face !== "front") {
          originalDisplayMap.set(el, (el as HTMLElement).style.display);
          (el as HTMLElement).style.display = "none";
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      forceUnflipElements(boardSection);

      boardCanvas = await html2canvas(boardSection, {
        backgroundColor: "#ffffff",
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      originalDisplayMap.forEach((display, el) => {
        (el as HTMLElement).style.display = display || "";
      });

      cardContainers.forEach((card) => {
        card.classList.remove('no-flip-front-only');
        const inner = card.querySelector('.cardInner') as HTMLElement;
        if (inner) {
          inner.querySelectorAll('*').forEach((el) => {
            (el as HTMLElement).style.transform = '';
          });
        }
      });
    }

    const imgWidth = 210;
    const pageHeight = 295;
    const pdf = new jsPDF("p", "mm", "a4");
    addFontSupport(pdf);

    pdf.setFillColor(139, 69, 193);
    pdf.rect(0, 0, 210, 295, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(32);
    pdf.text("Think Tool Session", 105, 80, { align: "center" });
    pdf.setFontSize(16);
    pdf.text("Professional Creativity Toolkit", 105, 100, { align: "center" });

    if (userName.trim()) {
      pdf.setFontSize(18);
      pdf.text(`Created by: ${userName}`, 105, 130, { align: "center" });
    }

    pdf.setFontSize(12);
    const dateText = `Generated on: ${new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`;
    pdf.text(dateText, 105, userName.trim() ? 150 : 120, { align: "center" });

    pdf.setFontSize(14);
    pdf.text(
      "Your creative journey captured",
      105,
      userName.trim() ? 180 : 160,
      { align: "center" }
    );

    pdf.addPage();
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(20);
    pdf.text("Creative Session Overview", 105, 20, { align: "center" });

    if (userName.trim()) {
      pdf.setFontSize(12);
      pdf.text(`Created by: ${userName}`, 105, 30, { align: "center" });
    }

    let currentY = userName.trim() ? 40 : 35;

    if (boardCanvas) {
      pdf.setFontSize(16);
      pdf.text("Creative Board", 20, currentY);
      currentY += 10;
      const maxBoardHeight = 110;
      const boardImgWidth = imgWidth - 40;
      let boardImgHeight = (boardCanvas.height * boardImgWidth) / boardCanvas.width;
      if (boardImgHeight > maxBoardHeight) {
        const scale = maxBoardHeight / boardImgHeight;
        boardImgHeight = maxBoardHeight;
        const scaledWidth = boardImgWidth * scale;
        const xOffset = (imgWidth - scaledWidth) / 2;
        pdf.addImage(
          boardCanvas.toDataURL("image/png"),
          "PNG",
          xOffset,
          currentY,
          scaledWidth,
          boardImgHeight
        );
      } else {
        pdf.addImage(
          boardCanvas.toDataURL("image/png"),
          "PNG",
          20,
          currentY,
          boardImgWidth,
          boardImgHeight
        );
      }
      currentY += boardImgHeight + 15;
    }

    if (brainstormNotes.trim()) {
      pdf.setFontSize(16);
      pdf.text("Brainstorming Notes", 20, currentY);
      currentY += 10;
      const notesBoxHeight = Math.max(80, pageHeight - currentY - 20);
      pdf.setDrawColor(200, 200, 200);
      pdf.setFillColor(248, 249, 250);
      pdf.roundedRect(15, currentY, 180, notesBoxHeight, 3, 3, "FD");
      pdf.setTextColor(60, 60, 60);
      pdf.setFontSize(11);
      let yPosition = currentY + 12;
      const lineHeight = 6;
      const leftMargin = 25;
      const maxTextHeight = currentY + notesBoxHeight - 20;
      const processedLines = processTextForPDF(brainstormNotes, pdf);

      processedLines.forEach((line) => {
        if (yPosition > maxTextHeight) {
          pdf.addPage();
          pdf.setFontSize(16);
          pdf.setTextColor(0, 0, 0);
          pdf.text("Brainstorming Notes (Continued)", 20, 30);
          pdf.setDrawColor(200, 200, 200);
          pdf.setFillColor(248, 249, 250);
          pdf.roundedRect(15, 40, 180, pageHeight - 60, 3, 3, "FD");
          pdf.setTextColor(60, 60, 60);
          pdf.setFontSize(11);
          yPosition = 52;
        }
        pdf.text(line, leftMargin, yPosition);
        yPosition += lineHeight;
      });

      const currentPage = pdf.getCurrentPageInfo().pageNumber;
      pdf.setPage(currentPage);
      const notesBoxBottom = pdf.getNumberOfPages() > 2 ? pageHeight - 20 : currentY + notesBoxHeight - 8;
      pdf.setFontSize(8);
      pdf.setTextColor(120, 120, 120);
      pdf.text(`Total characters: ${brainstormNotes.length}`, leftMargin, notesBoxBottom);
    }

    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      if (i > 1) {
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(`Think Tool Session - Page ${i - 1} of ${pageCount - 1}`, 105, 290, { align: "center" });
        if (userName.trim()) {
          pdf.text(`Created by: ${userName}`, 20, 290);
        }
      }
    }

    const cleanUserName = userName.trim().replace(/[^a-zA-Z0-9\u00C0-\u017F\u0E00-\u0E7F\u4E00-\u9FFF]/g, "-");
    const finalFilename = `${filename}${cleanUserName ? `-${cleanUserName}` : ""}.pdf`;
    pdf.save(finalFilename);
    return true;
  } catch (error) {
    console.error("Error exporting PDF:", error);
    return false;
  }
};