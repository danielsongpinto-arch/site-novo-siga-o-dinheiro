import { jsPDF } from "jspdf";
import { Tema, Artigo, Grafico, Tabela } from "@/contexts/ContentContext";

interface ReportItem {
  type: "tema" | "artigo" | "grafico" | "tabela";
  data: Tema | Artigo | Grafico | Tabela;
}

export function usePDFReport() {
  const generateReport = (items: ReportItem[], reportTitle: string = "Relatório - Siga o Dinheiro") => {
    const pdf = new jsPDF();
    let yPosition = 20;
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;

    // Função para adicionar nova página se necessário
    const checkNewPage = (spaceNeeded: number) => {
      if (yPosition + spaceNeeded > pageHeight - 10) {
        pdf.addPage();
        yPosition = 20;
      }
    };

    // Cabeçalho
    pdf.setFontSize(20);
    pdf.setTextColor(212, 175, 55); // Cor ouro
    pdf.text(reportTitle, margin, yPosition);
    yPosition += 15;

    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, margin, yPosition);
    yPosition += 10;

    // Linha divisória
    pdf.setDrawColor(212, 175, 55);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Processar cada item
    items.forEach((item, index) => {
      checkNewPage(30);

      const typeLabel = {
        tema: "Tema",
        artigo: "Artigo",
        grafico: "Gráfico",
        tabela: "Tabela",
      }[item.type];

      // Título do item
      pdf.setFontSize(12);
      pdf.setTextColor(212, 175, 55);
      pdf.text(`${index + 1}. ${typeLabel}: ${item.data.titulo}`, margin, yPosition);
      yPosition += 8;

      // Conteúdo baseado no tipo
      pdf.setFontSize(10);
      pdf.setTextColor(50, 50, 50);

      if (item.type === "tema") {
        const tema = item.data as Tema;
        pdf.text(`Categoria: ${tema.categoria || "Sem categoria"}`, margin + 5, yPosition);
        yPosition += 6;
        pdf.text(`Descrição: ${tema.descricao}`, margin + 5, yPosition, { maxWidth: maxWidth - 10 });
        yPosition += 10;
        if (tema.conteudo) {
          const wrappedContent = pdf.splitTextToSize(tema.conteudo, maxWidth - 10);
          pdf.text(wrappedContent, margin + 5, yPosition);
          yPosition += wrappedContent.length * 5 + 5;
        }
      } else if (item.type === "artigo") {
        const artigo = item.data as Artigo;
        pdf.text(`Autor: ${artigo.autor}`, margin + 5, yPosition);
        yPosition += 6;
        pdf.text(`Categoria: ${artigo.categoria || "Sem categoria"}`, margin + 5, yPosition);
        yPosition += 6;
        pdf.text(`Resumo: ${artigo.resumo}`, margin + 5, yPosition, { maxWidth: maxWidth - 10 });
        yPosition += 10;
        if (artigo.conteudo) {
          const wrappedContent = pdf.splitTextToSize(artigo.conteudo, maxWidth - 10);
          pdf.text(wrappedContent, margin + 5, yPosition);
          yPosition += wrappedContent.length * 5 + 5;
        }
      } else if (item.type === "grafico") {
        const grafico = item.data as Grafico;
        pdf.text(`Tipo: ${grafico.tipo}`, margin + 5, yPosition);
        yPosition += 6;
        pdf.text(`Descrição: ${grafico.descricao}`, margin + 5, yPosition, { maxWidth: maxWidth - 10 });
        yPosition += 10;
      } else if (item.type === "tabela") {
        const tabela = item.data as Tabela;
        pdf.text(`Categoria: ${tabela.categoria || "Sem categoria"}`, margin + 5, yPosition);
        yPosition += 6;
        pdf.text(`Descrição: ${tabela.descricao}`, margin + 5, yPosition, { maxWidth: maxWidth - 10 });
        yPosition += 10;

        // Adicionar tabela
        checkNewPage(tabela.dados.length * 8 + 20);
        const tableData = [
          tabela.colunas,
          ...tabela.dados.slice(0, 10), // Limitar a 10 linhas
        ];

        pdf.setFontSize(9);
        let tableY = yPosition;
        tableData.forEach((row, rowIndex) => {
          const isHeader = rowIndex === 0;
          if (isHeader) {
            pdf.setFillColor(212, 175, 55);
            pdf.setTextColor(0, 0, 0);
          } else {
            pdf.setFillColor(240, 240, 240);
            pdf.setTextColor(50, 50, 50);
          }

          const cellWidth = maxWidth / row.length;
          row.forEach((cell, cellIndex) => {
            pdf.rect(
              margin + cellIndex * cellWidth,
              tableY,
              cellWidth,
              6,
              isHeader ? "F" : "S"
            );
            pdf.text(
              String(cell).substring(0, 20),
              margin + cellIndex * cellWidth + 2,
              tableY + 4
            );
          });
          tableY += 6;
        });

        yPosition = tableY + 5;
      }

      // Espaço entre itens
      yPosition += 5;
    });

    // Rodapé
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(
      "Siga o Dinheiro - Sistema Financeiro de Saque Nazista (1938-1945)",
      margin,
      pageHeight - 10
    );

    // Salvar PDF
    pdf.save(`relatorio-siga-o-dinheiro-${Date.now()}.pdf`);
  };

  return { generateReport };
}
