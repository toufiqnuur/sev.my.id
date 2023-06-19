import { Box, Button, Container } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiOutlineArrowCircleRight } from "react-icons/hi";

export default function Header() {
  const router = useRouter();

  return (
    <Box w="full" pos="relative" zIndex={100}>
      <Container
        maxW="container.xl"
        h={28}
        px={[4, 10]}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image src="/brand.svg" width={60} height={80} alt="" priority />
        <Button
          colorScheme="gray"
          size="lg"
          borderRadius="full"
          textTransform="uppercase"
          rightIcon={<HiOutlineArrowCircleRight />}
          onClick={() => router.push("/auth/login")}
        >
          Login
        </Button>
      </Container>
    </Box>
  );
}
