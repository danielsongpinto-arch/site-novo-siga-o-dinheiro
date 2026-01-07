import { useState } from "react";

/**
 * Design Philosophy: Dark Historical Archive
 * - Timeline interativa mostrando evolução do saque nazista 1938-1945
 * - Animações suaves ao passar do mouse
 */

const timelineEvents = [
  {
    year: 1938,
    title: "Anschluss - Anexação da Áustria",
    description: "Alemanha anexa a Áustria. Primeiro grande saque de ouro: ~90 toneladas",
    value: "~2.7 bilhões de marcos",
    highlight: true,
  },
  {
    year: 1939,
    title: "Invasão da Tchecoslováquia e Polônia",
    description: "Conquista da Tchecoslováquia (32 ton) e invasão da Polônia (80 ton)",
    value: "~3.4 bilhões de marcos",
    highlight: false,
  },
  {
    year: 1940,
    title: "Ocupação da França e Benelux",
    description: "Maior saque: França (400 toneladas) + Bélgica e Holanda",
    value: "~12+ bilhões de marcos",
    highlight: true,
  },
  {
    year: 1941,
    title: "Operação Barbarossa",
    description: "Invasão da União Soviética. Saques contínuos de recursos",
    value: "Bilhões em recursos",
    highlight: false,
  },
  {
    year: 1942,
    title: "Auge do Saque",
    description: "Pico da extração de recursos de territórios ocupados",
    value: "Máxima capacidade de saque",
    highlight: false,
  },
  {
    year: 1943,
    title: "Mudança de Maré",
    description: "Primeiras derrotas militares. Saques ainda continuam",
    value: "Recursos diminuem",
    highlight: false,
  },
  {
    year: 1944,
    title: "Colapso Iminente",
    description: "Alemanha em retirada. Tentativa de recuperar ouro",
    value: "Desespero financeiro",
    highlight: false,
  },
  {
    year: 1945,
    title: "Fim da Guerra",
    description: "Rendição incondicional. Fim do sistema de saque",
    value: "Total: ~293 bilhões de marcos",
    highlight: true,
  },
];

export default function Timeline() {
  const [activeYear, setActiveYear] = useState(1940);

  const activeEvent = timelineEvents.find((e) => e.year === activeYear);

  return (
    <section className="py-16 bg-gradient-to-b from-black/50 to-transparent">
      <div className="container max-w-7xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl font-bold mb-4 text-amber-400 text-center"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Evolução do Saque (1938-1945)
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Acompanhe ano a ano como o sistema de saque nazista se desenvolveu durante a Segunda Guerra Mundial
        </p>

        {/* Timeline Interactive */}
        <div className="space-y-8">
          {/* Active Event Card */}
          {activeEvent && (
            <div className="bg-card border border-amber-900/50 rounded-lg p-8 mb-8 animate-in fade-in duration-300">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-amber-400 text-lg font-bold">{activeEvent.year}</div>
                  <h3 className="text-2xl font-bold text-white mt-2">{activeEvent.title}</h3>
                </div>
                {activeEvent.highlight && (
                  <div className="bg-red-900/30 border border-red-600/50 rounded px-3 py-1 text-red-400 text-sm font-semibold">
                    Evento Chave
                  </div>
                )}
              </div>
              <p className="text-gray-300 mb-4">{activeEvent.description}</p>
              <div className="bg-black/30 rounded p-4 border-l-4 border-amber-400">
                <p className="text-amber-400 font-semibold">Valor Saqueado:</p>
                <p className="text-white text-lg">{activeEvent.value}</p>
              </div>
            </div>
          )}

          {/* Timeline Track */}
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-amber-900/30 via-amber-600/50 to-amber-900/30" />

            {/* Timeline Points */}
            <div className="flex justify-between items-start gap-2">
              {timelineEvents.map((event) => (
                <button
                  key={event.year}
                  onClick={() => setActiveYear(event.year)}
                  className="flex flex-col items-center group relative z-10"
                >
                  {/* Year Label */}
                  <div className="text-xs text-gray-400 mb-2 group-hover:text-amber-400 transition-colors">
                    {event.year}
                  </div>

                  {/* Circle Point */}
                  <div
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      activeYear === event.year
                        ? "bg-amber-400 w-6 h-6 ring-4 ring-amber-400/30"
                        : event.highlight
                          ? "bg-red-600 hover:bg-red-500"
                          : "bg-amber-900/50 hover:bg-amber-600"
                    }`}
                  />

                  {/* Tooltip */}
                  <div className="absolute top-full mt-2 bg-black/90 border border-amber-900/50 rounded px-2 py-1 text-xs text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {event.title.substring(0, 20)}...
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-black/40 border border-amber-900/30 rounded p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">Período</p>
              <p className="text-amber-400 font-bold text-lg">7 Anos</p>
            </div>
            <div className="bg-black/40 border border-amber-900/30 rounded p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">Países Saqueados</p>
              <p className="text-amber-400 font-bold text-lg">6+</p>
            </div>
            <div className="bg-black/40 border border-amber-900/30 rounded p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">Ouro Roubado</p>
              <p className="text-amber-400 font-bold text-lg">~700 ton</p>
            </div>
            <div className="bg-black/40 border border-amber-900/30 rounded p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">Total em Marcos</p>
              <p className="text-amber-400 font-bold text-lg">~293 bi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
