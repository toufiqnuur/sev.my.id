import { Box, Divider, Heading, Text, VStack } from "@chakra-ui/react";

export default function ListView({ data }) {
  return (
    <>
      {data ? (
        <VStack align="stretch" mt={6} divider={<Divider borderColor="gray.300" />}>
          <Box display="flex" alignItems="center" flexDir="row" gap={4}>
            <Text color="gray.500" fontWeight="semibold" w={5}>
              #
            </Text>
            <Text flex={1} fontWeight="semibold">
              short
            </Text>
            <Text fontWeight="semibold">views</Text>
          </Box>
          {data.map((item, index) => (
            <Box key={index} display="flex" flexDir="row" gap={4}>
              <Text color="gray.500" w={5}>
                {index + 1}
              </Text>
              <Text flex={1}>/{item.slug}</Text>
              <Text>{item.hit}</Text>
            </Box>
          ))}
        </VStack>
      ) : (
        <Box textAlign="center" py={32}>
          <Text fontSize="5xl">&#x1f343;</Text>
          <Heading fontSize="xl" mt={2}>
            It&apos;s empty
          </Heading>
          <Text mt={1}>No data available</Text>
        </Box>
      )}
    </>
  );
}
