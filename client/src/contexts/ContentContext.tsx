import React, { createContext, useContext, useState } from "react";

export interface Tema {
  id: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  dataAdicionado: string;
}

export interface Artigo {
  id: string;
  titulo: string;
  autor: string;
  resumo: string;
  conteudo: string;
  dataAdicionado: string;
}

export interface Grafico {
  id: string;
  titulo: string;
  descricao: string;
  tipo: string;
  dados: string;
  dataAdicionado: string;
}

export interface Tabela {
  id: string;
  titulo: string;
  descricao: string;
  colunas: string[];
  dados: string[][];
  dataAdicionado: string;
}

interface ContentContextType {
  temas: Tema[];
  artigos: Artigo[];
  graficos: Grafico[];
  tabelas: Tabela[];
  addTema: (tema: Tema) => void;
  removeTema: (id: string) => void;
  addArtigo: (artigo: Artigo) => void;
  removeArtigo: (id: string) => void;
  addGrafico: (grafico: Grafico) => void;
  removeGrafico: (id: string) => void;
  addTabela: (tabela: Tabela) => void;
  removeTabela: (id: string) => void;
  searchContent: (query: string) => {
    temas: Tema[];
    artigos: Artigo[];
    graficos: Grafico[];
    tabelas: Tabela[];
  };
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temas, setTemas] = useState<Tema[]>([
    {
      id: "1",
      titulo: "O Sistema Ponzi Nazista",
      descricao: "Análise de como o sistema de saque funcionava como um esquema de Ponzi",
      conteudo: "O sistema financeiro nazista dependia de conquistas militares contínuas para financiar a guerra...",
      dataAdicionado: "2024-01-06",
    },
  ]);

  const [artigos, setArtigos] = useState<Artigo[]>([
    {
      id: "1",
      titulo: "A Economia da Segunda Guerra Mundial",
      autor: "Historiador Anônimo",
      resumo: "Uma análise profunda sobre os mecanismos econômicos que sustentavam a máquina de guerra nazista",
      conteudo: "A economia nazista era baseada em um modelo insustentável...",
      dataAdicionado: "2024-01-06",
    },
  ]);

  const [graficos, setGraficos] = useState<Grafico[]>([
    {
      id: "1",
      titulo: "Saque por País (em toneladas de ouro)",
      descricao: "Comparação visual do ouro saqueado de cada país ocupado",
      tipo: "barras",
      dados: "Áustria: 90, Tchecoslováquia: 32, Polônia: 80, França: 400",
      dataAdicionado: "2024-01-06",
    },
    {
      id: "2",
      titulo: "Distribuição de Despesas Militares",
      descricao: "Como os recursos foram gastos entre as diferentes divisões militares",
      tipo: "pizza",
      dados: "Wehrmacht: 40%, Luftwaffe: 25%, Kriegsmarine: 15%, Indústria: 12%, Operações: 8%",
      dataAdicionado: "2024-01-06",
    },
  ]);

  const [tabelas, setTabelas] = useState<Tabela[]>([
    {
      id: "1",
      titulo: "Saque de Ouro por País",
      descricao: "Quantidade de ouro saqueado de cada país ocupado",
      colunas: ["País", "Período", "Quantidade (ton)", "Valor (marcos)"],
      dados: [
        ["Áustria", "1938", "90", "~2.7 bilhões"],
        ["Tchecoslováquia", "1939", "32", "~960 milhões"],
        ["Polônia", "1939-1945", "80", "~2.4 bilhões"],
        ["França", "1940-1944", "400", "~12 bilhões"],
      ],
      dataAdicionado: "2024-01-06",
    },
  ]);

  const addTema = (tema: Tema) => setTemas([...temas, tema]);
  const removeTema = (id: string) => setTemas(temas.filter((t) => t.id !== id));

  const addArtigo = (artigo: Artigo) => setArtigos([...artigos, artigo]);
  const removeArtigo = (id: string) => setArtigos(artigos.filter((a) => a.id !== id));

  const addGrafico = (grafico: Grafico) => setGraficos([...graficos, grafico]);
  const removeGrafico = (id: string) => setGraficos(graficos.filter((g) => g.id !== id));

  const addTabela = (tabela: Tabela) => setTabelas([...tabelas, tabela]);
  const removeTabela = (id: string) => setTabelas(tabelas.filter((t) => t.id !== id));

  const searchContent = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return {
      temas: temas.filter(
        (t) =>
          t.titulo.toLowerCase().includes(lowerQuery) ||
          t.descricao.toLowerCase().includes(lowerQuery)
      ),
      artigos: artigos.filter(
        (a) =>
          a.titulo.toLowerCase().includes(lowerQuery) ||
          a.autor.toLowerCase().includes(lowerQuery) ||
          a.resumo.toLowerCase().includes(lowerQuery)
      ),
      graficos: graficos.filter(
        (g) =>
          g.titulo.toLowerCase().includes(lowerQuery) ||
          g.descricao.toLowerCase().includes(lowerQuery)
      ),
      tabelas: tabelas.filter(
        (t) =>
          t.titulo.toLowerCase().includes(lowerQuery) ||
          t.descricao.toLowerCase().includes(lowerQuery)
      ),
    };
  };

  return (
    <ContentContext.Provider
      value={{
        temas,
        artigos,
        graficos,
        tabelas,
        addTema,
        removeTema,
        addArtigo,
        removeArtigo,
        addGrafico,
        removeGrafico,
        addTabela,
        removeTabela,
        searchContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
};
