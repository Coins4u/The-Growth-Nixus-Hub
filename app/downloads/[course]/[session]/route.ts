import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { courseCatalog } from "../../../portal/courses/course-catalog";

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/\.pdf$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function wrapText(text: string, maxLength = 95) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxLength) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });

  if (current) lines.push(current);
  return lines;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ course: string; session: string }> },
) {
  const { course, session } = await params;

  const matchedCourse = courseCatalog.find((item) => item.slug === course);
  if (!matchedCourse) {
    return new Response("Course not found", { status: 404 });
  }

  const normalizedSession = normalize(session);
  const matchedSession = matchedCourse.sessions.find(
    (item) => normalize(item.title) === normalizedSession || normalize(item.resourceName) === normalizedSession,
  );

  if (!matchedSession) {
    return new Response("Session resource not found", { status: 404 });
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  page.drawRectangle({
    x: 40,
    y: height - 120,
    width: 515,
    height: 80,
    color: rgb(0.09, 0.1, 0.2),
    opacity: 1,
  });

  page.drawText("The Growth Hub - Session Implementation Guide", {
    x: 56,
    y: height - 78,
    size: 14,
    font: boldFont,
    color: rgb(0.9, 0.92, 0.98),
  });

  page.drawText(`Course: ${matchedCourse.title}`, {
    x: 56,
    y: height - 99,
    size: 10,
    font,
    color: rgb(0.77, 0.8, 0.9),
  });

  let cursorY = height - 150;

  const headings = [
    `Session: ${matchedSession.title}`,
    `Instructor: ${matchedCourse.instructor}`,
    `Category: ${matchedCourse.category} | Level: ${matchedCourse.level}`,
    `File Metadata: ${matchedSession.fileSize} | ${matchedSession.lastUpdated}`,
    "",
    "Technical Summary",
  ];

  headings.forEach((line, index) => {
    page.drawText(line, {
      x: 50,
      y: cursorY,
      size: index === 5 ? 11 : 10,
      font: index === 5 ? boldFont : font,
      color: rgb(0.12, 0.14, 0.2),
    });
    cursorY -= index === 5 ? 20 : 16;
  });

  const noteLines = wrapText(matchedSession.sessionNotes, 100);
  noteLines.slice(0, 26).forEach((line) => {
    page.drawText(line, {
      x: 50,
      y: cursorY,
      size: 9.5,
      font,
      color: rgb(0.16, 0.17, 0.24),
    });
    cursorY -= 14;
  });

  cursorY -= 8;
  page.drawText("Key Learning Pillars", {
    x: 50,
    y: cursorY,
    size: 11,
    font: boldFont,
    color: rgb(0.12, 0.14, 0.2),
  });
  cursorY -= 18;

  matchedSession.pillars.forEach((pillar) => {
    const pillarLines = wrapText(`- ${pillar}`, 95);
    pillarLines.forEach((line) => {
      page.drawText(line, {
        x: 50,
        y: cursorY,
        size: 9.5,
        font,
        color: rgb(0.16, 0.17, 0.24),
      });
      cursorY -= 14;
    });
    cursorY -= 4;
  });

  const pdfBytes = await pdfDoc.save();
  const downloadName = `${matchedCourse.slug}-${normalize(matchedSession.title)}.pdf`;

  return new Response(new Uint8Array(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${downloadName}"`,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
