import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Script, { ScriptProps } from "next/script";
import "../styles/globals.css";
import "../styles/dark.css"; // TODO: Setup themeing the React way

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
  return (
    <>
      {/* <Script
        strategy="lazyOnload"
        src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
      /> */}
      <Script
        onError={(e) => console.log(`Error loading script.js: ${e}`)}
        strategy="lazyOnload"
        src="/js/script.js"
      />

      {/** TODO: Detect casting before loading this? */}
      {/* <ClientOnlyScript strategy="lazyOnload" src="/js/cast-videos.js" /> */}

      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
