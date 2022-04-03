import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Suspense } from "react";
import { CustomHead } from "../components/CustomHead";
import { DynamicHeader } from "../components/Header";

const SignInOutButton = ({ isSignedIn }: { isSignedIn: boolean }) => {
  if (isSignedIn) {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }
  return <button onClick={() => signIn()}>Sign in</button>;
};

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const authData = {
    session,
    status,
  };

  return (
    <>
      <CustomHead />

      <Suspense fallback={<h1>Loading</h1>}>
        <DynamicHeader authData={authData} />
      </Suspense>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100px",
        }}
      >
        <SignInOutButton isSignedIn={!!session?.user} />
      </div>
    </>
  );
};

export default Home;
