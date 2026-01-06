import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ContentProvider } from "./contexts/ContentContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Temas from "./pages/Temas";
import TemaDetalhes from "./pages/TemaDetalhes";
import Artigos from "./pages/Artigos";
import Graficos from "./pages/Graficos";
import GraficosInterativos from "./pages/GraficosInterativos";
import Tabelas from "./pages/Tabelas";


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
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <ContentProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ContentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
