export const getTAUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      client: process.env.NEXT_PUBLIC_TUBEARCHIVIST_URL,
      server: process.env.NEXT_PUBLIC_TUBEARCHIVIST_URL,
    };
  }
  return {
    client: process.env.NEXT_PUBLIC_TUBEARCHIVIST_URL,
    server: process.env.TUBEARCHIVIST_URL,
  };
};
