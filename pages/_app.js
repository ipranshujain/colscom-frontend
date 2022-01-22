import Navbar from "../components/Navbar";
import ServerContextProvider from "../context/ServerContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ServerContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </ServerContextProvider>
    </div>
  );
}

export default MyApp;
