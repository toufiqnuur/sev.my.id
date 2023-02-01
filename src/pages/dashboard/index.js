import BaseLayout from "@/components/dashboard/BaseLayout";
import StatCard from "@/components/dashboard/StatCard";
import useUrls from "@/hooks/useUrls";
import { Button, Card, CardBody, Grid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import NextLink from "next/link";
import { IoAdd, IoArrowForward, IoLink, IoPeople } from "react-icons/io5";

export default function DashboardPage() {
  const { data: res, _ } = useUrls();

  return (
    <BaseLayout>
      <Grid
        templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
        gap={4}
        w="full"
      >
        <StatCard
          icon={IoPeople}
          accent="green"
          count={res?.data?.reduce((sum, { hit }) => sum + hit, 0) || 0}
          label="Visitor"
        />
        <StatCard icon={IoLink} accent="blue" count={res?.data?.length || 0} label="Links" />
        <NextLink href="/dashboard/analytics">
          <Card variant="outline">
            <CardBody display="flex" alignItems="center" gap={4}>
              <Stat>
                <StatNumber>More</StatNumber>
                <StatLabel>See analytics...</StatLabel>
              </Stat>
              <IoArrowForward />
            </CardBody>
          </Card>
        </NextLink>
      </Grid>
      <Button
        as={NextLink}
        href="/dashboard/links"
        leftIcon={<IoAdd />}
        w="full"
        size="lg"
        colorScheme="cyan"
        color="white"
      >
        Create Links
      </Button>
    </BaseLayout>
  );
}
