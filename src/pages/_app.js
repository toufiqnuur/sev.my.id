import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient({
      cookieOptions: {
        maxAge: 604800,
      },
    })
  );

  return (
    <ChakraProvider>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </ChakraProvider>
  );
}
