import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  children: React.ReactElement;
}

export const AuthGuard = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const authorized = sessionStatus === "authenticated";
  const unAuthorized = sessionStatus === "unauthenticated";
  const loading = sessionStatus === "loading";

  useEffect(() => {
    if (loading || !router.isReady) return;

    if (unAuthorized) {
      router
        .push({
          pathname: "/",
          query: { returnUrl: router.asPath },
        })
        .catch((e) => console.error(e));
    }
  }, [loading, unAuthorized, sessionStatus, router]);

  if (loading) return <>Loading app...</>;

  return authorized ? <div>{children}</div> : <></>;
};
