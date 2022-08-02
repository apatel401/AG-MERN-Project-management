import "./App.css";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";
import Projects from "./components/Projects"
import AddClientModal from "./components/AddClientModal";

function App() {
  //merging queries to avoid warning in console
  //Cache data may be lost when replacing the clients field of a Query object
  const cache = new InMemoryCache({
    typePolicies:{
      query:{
        fields:{
          clients: {
           merge(existing, incoming, mergeObject){
return mergeObject(existing, incoming)
           }
          },
          projects: {
            merge(existing, incoming, mergeObject){
              return mergeObject(existing, incoming)
                         }
          },
        },
      },
    }
  });

  const client = new ApolloClient({
    uri: "http://localhost:4444/graphql",
    cache,
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModal />
          <Projects />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
