/**
 * Hook para exportar dados em diferentes formatos
 * - Gráficos como PNG/SVG
 * - Tabelas como CSV
 */

export const useExport = () => {
  const exportTableToCSV = (titulo: string, colunas: string[], dados: string[][]) => {
    // Criar conteúdo CSV
    const csvContent = [
      [titulo],
      [],
      colunas,
      ...dados,
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    // Criar blob e download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `${titulo.replace(/\s+/g, "_")}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportChartAsImage = (chartRef: HTMLDivElement | null, titulo: string) => {
    if (!chartRef) return;

    // Usar html2canvas para capturar o gráfico
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Dimensões do gráfico
    const width = chartRef.offsetWidth;
    const height = chartRef.offsetHeight;

    canvas.width = width;
    canvas.height = height;

    // Preencher fundo
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);

    // Copiar conteúdo SVG se existir
    const svg = chartRef.querySelector("svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        downloadCanvas(canvas, titulo);
        URL.revokeObjectURL(url);
      };

      img.src = url;
    }
  };

  const downloadCanvas = (canvas: HTMLCanvasElement, titulo: string) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${titulo.replace(/\s+/g, "_")}.png`;
    link.click();
  };

  return {
    exportTableToCSV,
    exportChartAsImage,
  };
};
