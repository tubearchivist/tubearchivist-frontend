import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type TA_Token = {
  token: string;
  user_id: number;
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Tube Archivist",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const payload = {
          username: credentials.username,
          password: credentials.password,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_TUBEARCHIVIST_URL}/api/login/`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
            },
          }
        );

        const ta_token: TA_Token = await res.json();
        // If no error and we have user data, return it
        if (res.ok && ta_token) {
          // debug
          return {
            name: "TA User",
            email: "test@example.com",
            image: "test",
            ta_token,
          };
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    strategy: "jwt",
  },
  // customer sign in page
  // pages: {
  //   signIn: "/login",
  // },
  callbacks: {
    async session({ session, token, user }) {
      session.ta_token = token.ta_token;
      return session;
    },
    async jwt({ token, user }) {
      if (user?.ta_token) {
        // @ts-ignore
        token.ta_token = user?.ta_token;
      }
      return token;
    },
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code #33FF5D
    logo: "/img/banner-tube-archivist-dark.png", // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
