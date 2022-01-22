import { createClient, Provider } from "urql";

const client = createClient({
  url: "https://colscom.herokuapp.com/graphql",
});

export default function ServerContextProvider({ children }) {
  return <Provider value={client}>{children}</Provider>;
}
