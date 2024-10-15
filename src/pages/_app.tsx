import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import AllRutinesContext from "@/contexts/AllRutinesContext";
import ThemeProvider from "@/contexts/ThemeProvider";
import useGetMainData from "@/hooks/useGetMainData";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { UserProvider } from "@/contexts/UserContext";
import { useRouter } from "next/router";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
        <TooltipProvider>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <AppWrapper>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
              </AppWrapper>
            </QueryClientProvider>
          </ThemeProvider>
        </TooltipProvider>
      </UserProvider>
    </>
  );
}

const AppWrapper = ({ children }: any) => {
  const router = useRouter();

  if (router.pathname === "/login") {
    return <>{children}</>;
  }

  return <AppWrapper2>{children} </AppWrapper2>;
};

const AppWrapper2 = ({ children }: any) => {

  return <Layout>{children} </Layout>;
};
