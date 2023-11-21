import "@/styles/bootstrap.min.css";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import "@/styles/globals.css";
import RouteGuard from "@/components/RouteGuard";

export default function App({ Component, pageProps }) {
  return (
    <RouteGuard>
      <Layout>
        <SWRConfig
          value={{
            fetcher: async (url) => {
              const res = await fetch(url);
              if (res.ok) return res.json();
              else {
                const error = new Error(
                  "An error occured while fetching the data."
                );
                error.info = await res.json();
                error.status = res.status;
                throw error;
              }
            },
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
    </RouteGuard>
  );
}
