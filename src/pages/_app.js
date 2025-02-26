import "../pages/globals.css";
import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuBar from "../components/layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      {router.pathname === "/login  " ? (
        <>
          <Component {...pageProps} />
        </>
      ) : (
        <MenuBar>
          <Component {...pageProps} />
        </MenuBar>
      )}
    </>
  );
}

export default MyApp;
