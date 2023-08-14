import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <Button onClick={() => void signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <Button onClick={() => void signIn()}>Sign in</Button>
    </>
  );
}
