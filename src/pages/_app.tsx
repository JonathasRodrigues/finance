import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppProps, type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
import RootLayout from "~/components/layout";
import { type NextComponentType } from "next";
import { AuthGuard } from "~/components/auth-guard";

type Props = AppProps & {
  session: Session | null;
  Component: NextComponentType & { auth?: boolean };
};

const MyApp: AppType<Props> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <RootLayout>
        {(Component as NextComponentType & { auth?: boolean }).auth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          <Component {...pageProps} />
        )}
      </RootLayout>
      <Toaster />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
