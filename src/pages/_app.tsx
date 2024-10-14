import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import AllRutinesContext from "@/contexts/AllRutinesContext";
import ThemeProvider from "@/contexts/ThemeProvider";
import useGetMainData from "@/hooks/useGetMainData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TooltipProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <AppWrapper>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
              </AppWrapper>
            </Layout>
          </QueryClientProvider>
        </ThemeProvider>
      </TooltipProvider>
    </>
  );
}

const AppWrapper = ({ children }: any) => {
  useGetMainData();
  return <>{children}</>;
};
