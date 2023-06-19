import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";

export default function Features() {
  const features = [
    {
      icon: <>&#9203;</>,
      title: "Time based link",
      desc: "Automatically closed your shorten url in certain time",
    },
    {
      icon: <>&#128272;</>,
      title: "Protected link",
      desc: "Protect your shorten url with password",
    },
    {
      icon: <>&#9999;&#65039;</>,
      title: "Custom link",
      desc: "Define your shorten url name by yourself",
    },
  ];

  return (
    <Container maxW="container.xl" alignSelf="center" pos="relative" pb="12">
      <Box
        bgGradient="linear(to-l, pink.400, cyan.600)"
        w={72}
        h={72}
        pos="absolute"
        rounded="full"
        filter="blur(70px)"
        top={-16}
        left={16}
      />
      <Box
        bg="whiteAlpha.50"
        border="1px"
        borderColor="whiteAlpha.200"
        borderRadius={["lg", "3xl"]}
        backdropFilter="auto"
        backdropBlur="lg"
        pos="relative"
        mx="auto"
        p={8}
        py={{ md: 16 }}
        zIndex={10}
      >
        <Heading
          textAlign="center"
          color="white"
          fontSize={["4xl", "5xl"]}
          letterSpacing={-1}
          lineHeight={1}
        >
          It&apos;s more than url shortener
        </Heading>
        <Text
          color="whiteAlpha.800"
          textAlign="center"
          mt={2}
          fontSize={["lg", "xl"]}
          letterSpacing={-0.5}
        >
          We provide customizable features to suit your needs
        </Text>
        <Grid templateColumns={{ md: "1fr" }} mt={16} justifyContent="center">
          <Grid templateColumns={["1fr", "repeat(3, 1fr)"]} gap={8}>
            {features.map((feature, index) => (
              <Box key={index} textAlign="center">
                <Box
                  w={16}
                  h={16}
                  mx="auto"
                  rounded="full"
                  textAlign="center"
                  lineHeight={2}
                  fontSize="3xl"
                  background="blackAlpha.700"
                  border="1px solid rgba(255,255,255,0.5)"
                  sx={{ boxShadow: "0 0 1rem rgba(255, 255, 255, 0.5)" }}
                >
                  {feature.icon}
                </Box>
                <Heading
                  as="h5"
                  fontSize={["2xl", "3xl"]}
                  color="whiteAlpha.900"
                  letterSpacing="-1"
                  mt={4}
                >
                  {feature.title}
                </Heading>
                <Text mt={2} color="whiteAlpha.600">
                  {feature.desc}
                </Text>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
