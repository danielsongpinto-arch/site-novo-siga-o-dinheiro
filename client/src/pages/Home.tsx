import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import Timeline from "@/components/Timeline";

/**
 * Design Philosophy: Dark Historical Archive
 * - Fundo preto (#0a0a0a) com acentos em ouro (#d4af37)
 * - Layout de duas colunas assimétricas (Receitas vs Despesas)
 * - Tipografia: Playfair Display para títulos, Inter para dados
 * - Tema educativo e histórico sobre saque nazista na WWII
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/hero-background.png')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
            Siga o Dinheiro
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            O Sistema Financeiro de Saque Nazista (1938-1945)
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Uma análise educativa sobre como a Alemanha nazista confiscou ouro, recursos e riquezas de países ocupados durante a Segunda Guerra Mundial.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <Timeline />

      {/* Main Content - Two Column Layout */}
      <section className="bg-background py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Receitas - Left Column (Gold/Income) */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-900/30 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-amber-400" />
                </div>
                <h2 className="text-3xl md:text-4xl text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Receitas
                </h2>
              </div>

              {/* Austria */}
              <Card className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-amber-400">Áustria</CardTitle>
                      <CardDescription className="text-gray-400">Anschluss (1938)</CardDescription>
                    </div>
                    <span className="text-2xl text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>90 ton</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Ouro saqueado após a anexação da Áustria pela Alemanha</p>
                </CardContent>
              </Card>

              {/* Czechoslovakia */}
              <Card className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-amber-400">Tchecoslováquia</CardTitle>
                      <CardDescription className="text-gray-400">1939</CardDescription>
                    </div>
                    <span className="text-2xl text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>32 ton</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Equipamentos e ouro confiscados + 469 tanques e 1.500 aviões</p>
                </CardContent>
              </Card>

              {/* Poland */}
              <Card className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-amber-400">Polônia</CardTitle>
                      <CardDescription className="text-gray-400">1939-1945</CardDescription>
                    </div>
                    <span className="text-2xl text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>80 ton</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Ouro, tributos e recursos contínuos durante ocupação</p>
                </CardContent>
              </Card>

              {/* France */}
              <Card className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-amber-400">França</CardTitle>
                      <CardDescription className="text-gray-400">1940-1944</CardDescription>
                    </div>
                    <span className="text-2xl text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>400 ton</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">6.3 bilhões de marcos/ano + 650.000 trabalhadores forçados</p>
                </CardContent>
              </Card>

              {/* Belgium & Netherlands */}
              <Card className="bg-card border-amber-900/30 hover:border-amber-400/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-amber-400">Bélgica & Holanda</CardTitle>
                      <CardDescription className="text-gray-400">1940-1944</CardDescription>
                    </div>
                    <span className="text-2xl text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>110 mi</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Bélgica: 50 mi marcos/mês | Holanda: 60 mi marcos/mês</p>
                </CardContent>
              </Card>

              {/* Total Receitas */}
              <div className="bg-gradient-to-r from-amber-900/20 to-amber-900/5 border border-amber-400/30 rounded-lg p-6 mt-8">
                <p className="text-sm text-gray-400 mb-2">Total Saqueado</p>
                <p className="text-4xl text-amber-400" style={{ fontFamily: "'Playfair Display', serif" }}>121 bilhões</p>
                <p className="text-sm text-gray-400 mt-2">de marcos (1938-1945)</p>
              </div>
            </div>

            {/* Despesas - Right Column (Red/Expenses) */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-900/30 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-3xl md:text-4xl text-red-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Despesas
                </h2>
              </div>

              {/* Wehrmacht */}
              <Card className="bg-card border-red-900/30 hover:border-red-400/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-red-400">Wehrmacht</CardTitle>
                      <CardDescription className="text-gray-400">Exército</CardDescription>
                    </div>
                    <span className="text-2xl text-red-400" style={{ fontFamily: "'Playfair Display', serif" }}>~40%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Equipamento, armamentos e operações militares terrestres</p>
                </CardContent>
              </Card>

              {/* Luftwaffe */}
              <Card className="bg-card border-red-900/30 hover:border-red-400/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-red-400">Luftwaffe</CardTitle>
                      <CardDescription className="text-gray-400">Força Aérea</CardDescription>
                    </div>
                    <span className="text-2xl text-red-400" style={{ fontFamily: "'Playfair Display', serif" }}>~25%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Aviões, combustível e operações aéreas</p>
                </CardContent>
              </Card>

              {/* Kriegsmarine */}
              <Card className="bg-card border-red-900/30 hover:border-red-400/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-red-400">Kriegsmarine</CardTitle>
                      <CardDescription className="text-gray-400">Marinha</CardDescription>
                    </div>
                    <span className="text-2xl text-red-400" style={{ fontFamily: "'Playfair Display', serif" }}>~15%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Navios, submarinos e operações navais</p>
                </CardContent>
              </Card>

              {/* Indústria Bélica */}
              <Card className="bg-card border-red-900/30 hover:border-red-400/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-red-400">Indústria Bélica</CardTitle>
                      <CardDescription className="text-gray-400">Produção</CardDescription>
                    </div>
                    <span className="text-2xl text-red-400" style={{ fontFamily: "'Playfair Display', serif" }}>~12%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Fábricas, matérias-primas e manutenção de produção</p>
                </CardContent>
              </Card>

              {/* Operações Militares */}
              <Card className="bg-card border-red-900/30 hover:border-red-400/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-red-400">Operações</CardTitle>
                      <CardDescription className="text-gray-400">Campanha Militar</CardDescription>
                    </div>
                    <span className="text-2xl text-red-400" style={{ fontFamily: "'Playfair Display', serif" }}>~8%</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-300">Logística, transporte e operações especiais</p>
                </CardContent>
              </Card>

              {/* Total Despesas */}
              <div className="bg-gradient-to-r from-red-900/20 to-red-900/5 border border-red-400/30 rounded-lg p-6 mt-8">
                <p className="text-sm text-gray-400 mb-2">Total Gasto</p>
                <p className="font-display text-4xl text-red-400">414 bilhões</p>
                <p className="text-sm text-gray-400 mt-2">de marcos (1939-1945)</p>
              </div>
            </div>
          </div>

          {/* Deficit Section */}
          <div className="mt-16 pt-16 border-t border-amber-900/30">
            <div className="bg-gradient-to-r from-red-900/10 to-transparent border border-red-400/20 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl text-red-400 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Déficit Final</h3>
                <p className="text-5xl text-red-400 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>-293 bilhões</p>
              <p className="text-gray-300 mb-4">
                O esquema de saque de Ponzi só funcionava com expansão contínua. Quando a expansão parou, o colapso foi inevitável.
              </p>
              <p className="text-sm text-gray-400">
                A Alemanha nunca conseguiu equilibrar suas contas. O sistema dependia de conquistas militares contínuas para financiar a guerra. Sem novas vitórias e recursos, o déficit cresceu exponencialmente até a rendição em 1945.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-amber-900/30 py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            © 2024 Siga o Dinheiro - Análise Educativa | Baseado em dados históricos da Segunda Guerra Mundial
          </p>
        </div>
      </footer>
    </div>
  );
}
