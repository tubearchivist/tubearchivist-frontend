import type { GetServerSideProps, NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { CustomHead } from "../components/CustomHead";
import { Layout } from "../components/Layout";
import { VideoList } from "../components/VideoList";
import { getVideos } from "../lib/getVideos";
import { Videos } from "../types/video";

type HomeProps = {
  videos: Videos;
  imagePlaceholders?: string[];
};

const SignInOutButton = ({ isSignedIn }: { isSignedIn: boolean }) => {
  if (isSignedIn) {
    return <button onClick={() => signOut()}>Sign Out</button>;
  }
  return <button onClick={() => signIn()}>Sign in</button>;
};

const Home: NextPage<HomeProps> = ({ videos }) => {
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

// http://localhost:8000/cache/videos/3/37Kn-kIsVu8.jpg

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const videos = await getVideos();

  return { props: { videos } };
};
