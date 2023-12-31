import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return <p>Signed in as {session.user.email}</p>;
  }
  return <p>Not signed in</p>;
}
