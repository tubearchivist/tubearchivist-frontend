import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Script, { ScriptProps } from "next/script";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/globals.css";
import "../styles/dark.css"; // TODO: Setup themeing the React way
import { useState } from "react";

// TODO: Do these scripts need to be on every page?

type ClientOnlyScriptProps = {
  src: string;
} & ScriptProps;

/**
 * This wraps next/script and returns early if `window` is not detected
 * due to next using SSR
 */
const ClientOnlyScript = ({ src, ...props }: ClientOnlyScriptProps) => {
  if (typeof window === "undefined") {
    return;
  }
  return <Script src={src} {...props} />;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      {/* <Script
        strategy="lazyOnload"
        src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
      /> */}

      {/** TODO: Detect casting before loading this? */}
      {/* <ClientOnlyScript strategy="lazyOnload" src="/js/cast-videos.js" /> */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Hydrate state={pageProps.dehydratedState}>
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
