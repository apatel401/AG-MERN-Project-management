import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";


function App() {
  //merging queries to avoid warning in console
  //Cache data may be lost when replacing the clients field of a Query object
  const cache = new InMemoryCache({
    typePolicies: {
      query: {
        fields: {
          clients: {
            merge(existing, incoming, mergeObject) {
              return mergeObject(existing, incoming);
            },
          },
          projects: {
            merge(existing, incoming, mergeObject) {
              return mergeObject(existing, incoming);
            },
          },
        },
      },
    },
  });

  const client = new ApolloClient({
    uri: "http://localhost:4444/graphql",
    cache,
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
