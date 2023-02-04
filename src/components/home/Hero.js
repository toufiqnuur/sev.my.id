import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Hero() {
  return (
    <Container
      maxW="container.xl"
      pt={4}
      pb={12}
      display="grid"
      alignItems="center"
      gap={4}
      gridTemplateColumns={{ md: "repeat(2, 1fr)" }}
      pos="relative"
      px={[4, 10]}
    >
      <Box order={{ md: 2 }} pos="relative">
        <Box
          bgColor="white"
          w="full"
          h="full"
          pos="absolute"
          zIndex={-10}
          bgSize="20px 20px"
          bgImage="linear-gradient(#444cf7 1px, transparent 1px), linear-gradient(to right, #444cf7 1px, white 1px)"
        >
          <Box pos="absolute" w="full" h="full" bgGradient="radial(whiteAlpha.500, white 75%)" />
        </Box>
        <Image
          src="/hero.png"
          width={500}
          height={500}
          style={{ margin: "auto" }}
          alt=""
          priority
        />
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
