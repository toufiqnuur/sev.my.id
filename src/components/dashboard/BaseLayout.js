import { Container, Flex, useBoolean, VStack } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function BaseLayout({ children }) {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [show, setShow] = useBoolean(false);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push("/");
  };

  return (
    <Flex direction="row" bg="gray.100" alignItems="start" flexWrap="nowrap">
      <Sidebar open={show} />
      <VStack flex={1} spacing={4} minW={0}>
        <Header user={user} logout={handleLogout} toggleSidebar={setShow.toggle} />
        <Container maxW="container.xl" pb={4}>
          <VStack spacing={4}>{children}</VStack>
        </Container>
      </VStack>
    </Flex>
  );
}
