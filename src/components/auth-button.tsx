import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <Button variant="outline" onClick={() => void signOut()}>
        Sign out
      </Button>
    );
  }
  return (
    <Button variant="outline" onClick={() => void signIn()}>
      Sign in
    </Button>
  );
}
