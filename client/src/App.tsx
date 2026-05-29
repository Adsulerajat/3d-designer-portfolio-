import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import ProjectDetails from "@/pages/ProjectDetails";
import Contact from "@/pages/Contact";
import PasswordGate, { useAuth, setAuth } from "@/components/PasswordGate";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={ProjectDetails} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [authenticated, setAuthenticated] = useState(() => useAuth());

  if (!authenticated) {
    return (
      <PasswordGate
        onSuccess={() => {
          setAuth();
          setAuthenticated(true);
        }}
      />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
