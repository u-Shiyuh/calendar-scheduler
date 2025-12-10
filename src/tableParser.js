export function reconstructTable(cells) {
  const sorted = cells.sort((a,b) => a.bbox[1]-b.bbox[1]);
  const rows = [];
  let currentY = -1, row = [];
  sorted.forEach(cell => {
    if (currentY === -1 || Math.abs(cell.bbox[1]-currentY) < 10) {
      row.push(cell);
    } else {
      rows.push(row.sort((a,b)=>a.bbox[0]-b.bbox[0]));
      row = [cell];
    }
    currentY = cell.bbox[1];
  });
  if (row.length) rows.push(row.sort((a,b)=>a.bbox[0]-b.bbox[0]));
  return rows.map(r => r.map(c=>c.text));
}

export function downloadCSV(data) {
  const csv = data.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "table.csv";
  a.click();
}