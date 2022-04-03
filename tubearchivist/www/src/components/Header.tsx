const Header = ({ authData }) => {
  const { session, status } = authData;

  return (
    <>
      <h1>Name: {session?.user?.name}</h1>
      <h1>Status: {status}</h1>
      <h1>Token: {session?.ta_token?.token}</h1>
      <h1>User ID: {session?.ta_token?.user_id}</h1>
    </>
  );
};

export default Header;
