import { Box, Container, Grid, Heading, Text } from "@chakra-ui/react";
import { FaLink, FaUserAstronaut } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";

export function StatColumn({ icon, count, desc }) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
    >
      {icon}
      <Text fontSize={["5xl", "6xl"]} ml="4" fontWeight="black" color="white">
        {count}
      </Text>
      <Text
        w="full"
        textAlign="center"
        color="#B6EADA"
        letterSpacing={-0.5}
        fontSize={{ lg: "lg" }}
      >
        {desc}
      </Text>
    </Box>
  );
}

export default function Statistics({ data }) {
  return (
    <Container
      maxW="container.lg"
      alignSelf="center"
      bg={{ md: "blackAlpha.50" }}
      rounded="3xl"
      pt={12}
      pb={20}
    >
      <Heading
        textAlign="center"
        color="white"
        fontSize={["4xl", "5xl"]}
        letterSpacing={-1}
        lineHeight={1}
      >
        Described in number
      </Heading>

      <Grid
        gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]}
        mt={16}
        rowGap="10"
      >
        <StatColumn
          icon={<FaUserAstronaut size={[48]} color="rgba(255,255,255,0.5)" />}
          count={data.userCount.length}
          desc="Active users arround the world"
        />
        <StatColumn
          icon={<HiCursorClick size={48} color="rgba(255,255,255,0.5)" />}
          count={data.userClicks.reduce((acc, item) => acc + item.count, 0)}
          desc="Shorten urls have been visited"
        />
        <StatColumn
          icon={<FaLink size={42} color="rgba(255,255,255,0.5)" />}
          count={data.linkCount.length}
          desc="Long links have been shortened"
        />
      </Grid>
    </Container>
  );
}
