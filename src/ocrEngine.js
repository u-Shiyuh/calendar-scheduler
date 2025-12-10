import * as paddleocr from "paddleocr";

let ocrEngine;

export async function loadOCR() {
  if (!ocrEngine) {
    ocrEngine = new paddleocr.PaddleOCR({ lang: "en" });
    await ocrEngine.load();
  }
  return ocrEngine;
}

export async function runOCR(file) {
  const engine = await loadOCR();
  const arrayBuffer = await file.arrayBuffer();
  const result = await engine.recognize(new Uint8Array(arrayBuffer));
  return result; // [{text, bbox}, ...]
}