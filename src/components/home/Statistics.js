import { Container, Stack, Box, Heading, Text } from "@chakra-ui/react";
import { FaLink, FaUserAstronaut } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";

export default function Statistics({ data }) {
  return (
    <Container
      maxW="container.lg"
      alignSelf="center"
      bg={{ md: "blackAlpha.50" }}
      rounded="3xl"
    >
      <Stack
        direction={["column", "row"]}
        justify="space-evenly"
        py="16"
        rowGap="10"
      >
        <Box display="flex" alignItems="center" alignSelf="center">
          <FaUserAstronaut size={48} color="royalblue" />
          <Heading fontSize="6xl" ml="4">
            {data.userCount.length}
          </Heading>
          <Text alignSelf="end" fontSize="xl">
            Active users
          </Text>
        </Box>
        <Box display="flex" alignItems="center" alignSelf="center">
          <HiCursorClick size={48} color="royalblue" />
          <Heading fontSize="6xl" ml="4">
            {data.userClicks.reduce((acc, item) => acc + item.count, 0)}
          </Heading>
          <Text alignSelf="end" fontSize="xl">
            Clicks
          </Text>
        </Box>
        <Box display="flex" alignItems="center" alignSelf="center">
          <FaLink size={48} color="royalblue" />
          <Heading fontSize="6xl" ml="4">
            {data.linkCount.length}
          </Heading>
          <Text alignSelf="end" fontSize="xl">
            Shorten links
          </Text>
        </Box>
      </Stack>
    </Container>
  );
}
