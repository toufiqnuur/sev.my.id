import { Box, Container, Grid, Heading, Show, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export default function Features() {
  const features = [
    {
      title: <>&#9203; Time based link</>,
      desc: "Automatically closed your shorten url in certain time",
    },
    {
      title: <>&#128272; Protected link</>,
      desc: "Protect your shorten url with password",
    },
    {
      title: <>&#9999;&#65039; Custom link</>,
      desc: "Define your shorten url name by yourself",
    },
  ];

  return (
    <Container maxW="container.lg" alignSelf="center" pos="relative">
      <Box
        bgGradient="linear(to-l, pink.400, cyan.300)"
        w={72}
        h={72}
        pos="absolute"
        rounded="full"
        filter="blur(70px)"
        zIndex={-10}
        top={-16}
        left={16}
      />
      <Box
        maxW="2xl"
        bg="whiteAlpha.400"
        border="1px"
        borderColor="white"
        borderRadius="lg"
        backdropFilter="auto"
        backdropBlur="lg"
        pos="relative"
        mx="auto"
        p={8}
      >
        <Heading textAlign="center">It&apos;s more than url shortener</Heading>
        <Grid templateColumns={{ md: "repeat(2, 1fr)" }} mt={[10, 0]} alignItems="center">
          <Show above="md">
            <Image src="/feature.png" width={300} height={400} alt="" />
          </Show>
          <VStack align="start" spacing={8}>
            {features.map((item, index) => (
              <Box key={index}>
                <Heading as="h5" fontSize="2xl">
                  {item.title}
                </Heading>
                <Text mt={2}>{item.desc}</Text>
              </Box>
            ))}
          </VStack>
        </Grid>
      </Box>
      <Box
        bgGradient="linear(to-t, teal.400, purple.400)"
        w={80}
        h={80}
        pos="absolute"
        rounded="full"
        filter="blur(70px)"
        zIndex={-10}
        bottom={-32}
        right={16}
      />
    </Container>
  );
}
