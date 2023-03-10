import { Box, Button, Container } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <Box w="full">
      <Container
        maxW="container.xl"
        h={24}
        px={[4, 10]}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src="/logo.png" width={160} height={80} alt="" style={{ marginLeft: "-16px" }} />
        <Button
          colorScheme="twitter"
          size="lg"
          borderRadius="2xl"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </Button>
      </Container>
    </Box>
  );
}
