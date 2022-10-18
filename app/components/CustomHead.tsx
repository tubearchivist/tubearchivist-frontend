/**
 * TODO: Dynamically get the title
 * TODO: NextJS recommended pattern for SEO
 */
export const CustomHead = ({ title }: { title?: string }) => {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#01202e"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="apple-mobile-web-app-title" content="TubeArchivist" />
      <meta name="application-name" content="TubeArchivist" />
      <meta name="msapplication-TileColor" content="#01202e" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#01202e" />

      {title ? <title>TA | {title}</title> : <title>TubeArchivist</title>}

      {/* {% if colors == "dark" %} */}
      {/* <link rel="stylesheet" href="/css/dark.css" /> */}
      {/* {% else %} */}
      {/* <link rel="stylesheet" href="/css/light.css" /> */}
      {/* {% endif %} */}
    </head>
  );
};
