import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Hero() {
  return (
    <Container
      maxW="container.xl"
      py={12}
      display="grid"
      alignItems="center"
      gap={4}
      gridTemplateColumns={{ md: "repeat(2, 1fr)" }}
      pos="relative"
    >
      <Box order={{ md: 2 }} mt={{ base: 10, md: 12 }}>
        <Image src="/hero.png" width={800} height={600} alt="" priority />
      </Box>
      <Box pos="relative">
        <Heading
          order={{ md: 1 }}
          top={0}
          bgGradient="linear(to-r, #4299E1, #805AD5)"
          bgClip="text"
          fontSize={{ base: "5xl", lg: "6xl", xl: "7xl" }}
          fontWeight="extrabold"
        >
          Make it short make it simple
        </Heading>
        <Text fontSize={["xl", "2xl"]} mt={4}>
          Shorten, track, and share your links with our all-in-one URL shortener.
        </Text>
        <Button colorScheme="twitter" size="lg" rounded="2xl" mt={8}>
          Get started
        </Button>
      </Box>
    </Container>
  );
}
