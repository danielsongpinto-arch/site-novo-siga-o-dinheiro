import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { useServiceWorker } from "./hooks/useServiceWorker";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ContentProvider } from "./contexts/ContentContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { CommentsProvider } from "./contexts/CommentsContext";
import { TagsProvider } from "./contexts/TagsContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { FollowProvider } from "./contexts/FollowContext";
import { RecommendationsProvider } from "./contexts/RecommendationsContext";
import { useAnalytics } from "./hooks/useAnalytics";
import Dashboard from "./pages/Dashboard";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Temas from "./pages/Temas";
import TemaDetalhes from "./pages/TemaDetalhes";
import Artigos from "./pages/Artigos";
import Graficos from "./pages/Graficos";
import GraficosInterativos from "./pages/GraficosInterativos";
import Tabelas from "./pages/Tabelas";
import Favoritos from "./pages/Favoritos";
import Relatorios from "./pages/Relatorios";
import Trending from "./pages/Trending";
import Recomendacoes from "./pages/Recomendacoes";

function Router() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/temas" component={Temas} />
        <Route path="/temas/:id" component={TemaDetalhes} />
        <Route path="/artigos" component={Artigos} />
        <Route path="/graficos" component={Graficos} />
        <Route path="/graficos-interativos" component={GraficosInterativos} />
        <Route path="/tabelas" component={Tabelas} />
        <Route path="/favoritos" component={Favoritos} />
        <Route path="/relatorios" component={Relatorios} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/trending" component={Trending} />
        <Route path="/recomendacoes" component={Recomendacoes} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  useServiceWorker();
  useAnalytics();
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <ContentProvider>
          <FavoritesProvider>
            <CommentsProvider>
              <TagsProvider>
                <NotificationsProvider>
                  <FollowProvider>
                    <RecommendationsProvider>
                      <TooltipProvider>
                      <Toaster />
                      <Router />
                      </TooltipProvider>
                    </RecommendationsProvider>
                  </FollowProvider>
                </NotificationsProvider>
              </TagsProvider>
            </CommentsProvider>
          </FavoritesProvider>
        </ContentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
