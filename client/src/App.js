import "./App.css";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";

function App() {
  //merging queries to avoid warning in console
  //Cache data may be lost when replacing the clients field of a Query object
  const cache = new InMemoryCache({
    typePolicies:{
      query:{
        fields:{
          clients: {
            merge(existing, incoming, { mergeObjects }){
              return mergeObjects(existing, incoming);
            }
          },
          projects: {
            merge(existing, incoming, { mergeObjects }){
              return mergeObjects(existing, incoming);
            }
          },
        }
      }
    }
  });

  const client = new ApolloClient({
    uri: "http://localhost:4444/graphql",
    // cache: new InMemoryCache(),
    cache,
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
