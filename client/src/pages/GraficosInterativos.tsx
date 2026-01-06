import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useContent } from "@/contexts/ContentContext";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { X } from "lucide-react";

/**
 * Design Philosophy: Dark Historical Archive
 * - Página para visualizar gráficos interativos
 * - Suporta múltiplos tipos: barras, pizza, linhas, área
 */

const COLORS = ["#d4af37", "#c41e3a", "#8b0000", "#a68857", "#ff6b6b"];

const parseChartData = (dados: string, tipo: string) => {
  try {
    if (tipo === "pizza") {
      return dados.split(",").map((item) => {
        const [label, value] = item.trim().split(":");
        return {
          name: label.trim(),
          value: parseInt(value.trim()) || 0,
        };
      });
    } else {
      return dados.split(",").map((item) => {
        const [label, value] = item.trim().split(":");
        return {
          name: label.trim(),
          value: parseInt(value.trim()) || 0,
        };
      });
    }
  } catch {
    return [];
  }
};

export default function GraficosInterativos() {
  const { graficos, removeGrafico } = useContent();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-900/20 to-transparent border-b border-amber-900/30 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
            Gráficos Interativos
          </h1>
          <p className="text-gray-300 text-lg">
            Visualize dados e estatísticas de forma interativa
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {graficos.length === 0 ? (
            <Card className="bg-card border-amber-900/30">
              <CardContent className="py-12 text-center">
                <p className="text-gray-400">Nenhum gráfico adicionado ainda.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8">
              {graficos.map((grafico) => {
                const chartData = parseChartData(grafico.dados, grafico.tipo);

                return (
                  <Card key={grafico.id} className="bg-card border-amber-900/30">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-amber-400">{grafico.titulo}</CardTitle>
                          <CardDescription className="text-gray-400">
                            {grafico.tipo} | {grafico.descricao}
                          </CardDescription>
                        </div>
                        <button
                          onClick={() => removeGrafico(grafico.id)}
                          className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-96 flex items-center justify-center">
                        {grafico.tipo === "barras" && (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
                              <XAxis dataKey="name" stroke="#a8a8a8" />
                              <YAxis stroke="#a8a8a8" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#1a1a1a",
                                  border: "1px solid #d4af37",
                                }}
                                labelStyle={{ color: "#d4af37" }}
                              />
                              <Bar dataKey="value" fill="#d4af37" />
                            </BarChart>
                          </ResponsiveContainer>
                        )}

                        {grafico.tipo === "pizza" && (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}%`}
                                outerRadius={100}
                                fill="#d4af37"
                                dataKey="value"
                              >
                                {chartData.map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#1a1a1a",
                                  border: "1px solid #d4af37",
                                }}
                                labelStyle={{ color: "#d4af37" }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        )}

                        {grafico.tipo === "linhas" && (
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
                              <XAxis dataKey="name" stroke="#a8a8a8" />
                              <YAxis stroke="#a8a8a8" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#1a1a1a",
                                  border: "1px solid #d4af37",
                                }}
                                labelStyle={{ color: "#d4af37" }}
                              />
                              <Line type="monotone" dataKey="value" stroke="#d4af37" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        )}

                        {grafico.tipo === "area" && (
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
                              <XAxis dataKey="name" stroke="#a8a8a8" />
                              <YAxis stroke="#a8a8a8" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "#1a1a1a",
                                  border: "1px solid #d4af37",
                                }}
                                labelStyle={{ color: "#d4af37" }}
                              />
                              <Area type="monotone" dataKey="value" fill="#d4af37" stroke="#d4af37" />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-4">
                        Adicionado em: {grafico.dataAdicionado}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
