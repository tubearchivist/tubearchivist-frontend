import type { GetServerSideProps, NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { Videos } from "../types/video";
import { CustomHead } from "../components/CustomHead";
import { Layout } from "../components/Layout";
import { VideoList } from "../components/VideoList";

const SignInOutButton = ({ isSignedIn }: { isSignedIn: boolean }) => {
  if (isSignedIn) {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }
  return <button onClick={() => signIn()}>Sign in</button>;
};

const Home: NextPage<{ videos: Videos }> = ({ videos }) => {
  const { data: session, status } = useSession();
  const authData = {
    session,
    status,
  };

  return (
    <>
      <CustomHead />

      <Layout>
        <VideoList videos={videos} />
        <SignInOutButton isSignedIn={!!session?.user} />
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch("http://localhost:8000/api/video/", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token b4d4330462c7fc16c51873e45579b29a1a12fc90`,
      mode: "no-cors",
    },
  });
  const videos = await response.json();

  return { props: { videos } };
};
