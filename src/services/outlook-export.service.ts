import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OutlookExportService {
  async copyRichText(htmlContent: string, textContent: string): Promise<boolean> {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.write) {
        const typeHtml = "text/html";
        const typeText = "text/plain";
        const blobHtml = new Blob([htmlContent], { type: typeHtml });
        const blobText = new Blob([textContent], { type: typeText });

        const data = [
          new ClipboardItem({
            [typeHtml]: blobHtml,
            [typeText]: blobText,
          }),
        ];
        await navigator.clipboard.write(data);
        return true;
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(textContent);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to copy rich text", err);
      return false;
    }
  }

  async copyPlainText(text: string): Promise<boolean> {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        return true;
      } else if (typeof document !== "undefined") {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to copy plain text", err);
      return false;
    }
  }

  openOutlook(subject: string, toAddress?: string) {
    if (typeof window === "undefined") return;
    const to = toAddress ? encodeURIComponent(toAddress) : "";
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  }
}
