import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Demo1 from "@/pages/Demo1";
import Demo2 from "@/pages/Demo2";
import Demo3 from "@/pages/Demo3";
import DemoSwitcher from "@/components/DemoSwitcher";
import { useEffect } from "react";

function Router() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (location === "/") {
      setLocation("/demo1");
    }
  }, [location, setLocation]);

  return (
    <Switch>
      <Route path="/demo1" component={Demo1} />
      <Route path="/demo2" component={Demo2} />
      <Route path="/demo3" component={Demo3} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <DemoSwitcher />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
