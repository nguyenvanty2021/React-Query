import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { RQSuperManPage } from "./components/RQSuperHeroes.page";
import { SuperHeroesPage } from "./components/SuperHeroes.page";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider, QueryClient } from "react-query";
import { RQSuperHeroesPage } from "./components/RQSuperMan.page";
import { RQSuperPage } from "./components/RQSuperPage.page";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/a">
            <SuperHeroesPage />
          </Route>
          <Route path="/b">
            <RQSuperManPage />
          </Route>
          <Route path="/c">
            <RQSuperManPage />
          </Route>
          <Route path="/d">
            <RQSuperPage />
          </Route>
          <Route path="/e">
            <RQSuperHeroesPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
