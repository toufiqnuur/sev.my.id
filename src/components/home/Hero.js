import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Hero() {
  const router = useRouter();

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
      px={[8, 10]}
    >
      <Box order={{ md: 2 }} pos="relative" width={["80%", "100%"]}>
        <Image
          src="/hero.png"
          width={500}
          height={500}
          style={{ margin: "auto", position: "relative", zIndex: 10 }}
          alt=""
          priority
        />
        <Box
          pos="absolute"
          top="-50%"
          width="full"
          height="full"
          right="-25%"
          borderRadius="full"
          bgImg="radial-gradient(#B6EADA, #301E67, #03001C 60%)"
          overflow="hidden"
        >
          <Image
            src="/galaxy.png"
            width={1000}
            height={1000}
            alt=""
            style={{ opacity: 0.25 }}
            loading="lazy"
          />
        </Box>
      </Box>

      <Box pos="relative">
        <Heading
          order={{ md: 1 }}
          top={0}
          bgGradient="linear(to-t, #5B8FB9, #B6EADA)"
          bgClip="text"
          fontSize={{ base: "5xl", lg: "6xl", xl: "7xl" }}
          fontWeight="extrabold"
          letterSpacing={-1.5}
          lineHeight={1}
          pb={2}
        >
          Make it short make it simple
        </Heading>
        <Text
          color="whiteAlpha.700"
          fontSize={["md", "xl", "2xl"]}
          letterSpacing={-0.5}
          lineHeight={1.25}
          mt={[4, 8]}
        >
          <span style={{ color: "white", fontWeight: "semibold" }}>
            Shorten, track, and share
          </span>{" "}
          your links with our all-in-one URL shortener.
        </Text>
        <Button
          colorScheme="twitter"
          size="lg"
          rounded="full"
          mt={8}
          textTransform="uppercase"
          onClick={() => router.push("/#trial")}
        >
          Get started
        </Button>
      </Box>
    </Container>
  );
}
