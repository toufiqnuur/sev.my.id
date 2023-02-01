import { Box, Card, CardBody, Icon, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

export default function StatCard({ icon, accent, count, label }) {
  return (
    <Card display="flex">
      <CardBody display="flex" alignItems="center" gap={4}>
        <Box
          w={12}
          h={12}
          bgGradient={`linear(to-t, ${accent}.500, ${accent}.100)`}
          color="white"
          rounded="full"
        >
          <Icon as={icon} w={8} h={8} />
        </Box>
        <Stat>
          <StatNumber>{count}</StatNumber>
          <StatLabel>{label}</StatLabel>
        </Stat>
      </CardBody>
    </Card>
  );
}
