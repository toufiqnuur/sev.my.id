import { Box, Heading, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

export default function ExpiredLink({ expired }) {
  return (
    <Box maxW="4xl" mx="auto" mt={48} textAlign="center">
      <Heading>
        &#9203; Link was expired at {dayjs(expired.date).format("DD MMM YYYY HH:mm")}
      </Heading>
      <Text fontSize="lg" color="gray.600" mt={2}>
        Message the creator if there is something wrong
      </Text>
    </Box>
  );
}
