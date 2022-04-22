import NextAuth, { DefaultSession } from "next-auth";

type TA_token = {
  token: string;
  user_id: number;
};

declare module "next-auth" {
  interface Session {
    ta_token: TA_token & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    ta_token: TA_token & JWT;
  }
}
