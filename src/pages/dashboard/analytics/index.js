import BaseLayout from "@/components/dashboard/BaseLayout";
import ListView from "@/components/dashboard/ListView";
import StatCard from "@/components/dashboard/StatCard";
import useUrls from "@/hooks/useUrls";
import useViews from "@/hooks/useViews";
import { Card, CardBody, Grid, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoLink, IoPeople } from "react-icons/io5";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardAnalytisPage() {
  const { data: res } = useUrls();
  const { data: views } = useViews();
  const [chartData, setChartData] = useState({});

  const joinViewByDate = (data) => {
    const _data = JSON.parse(JSON.stringify(data));
    const res = [];

    _data.forEach((item) => {
      const exist = res.find((_) => _.date === item.date);
      exist ? (exist.count += item.count) : res.push(item);
    });

    setChartData(res);
  };

  useEffect(() => {
    views?.data && joinViewByDate(views?.data);
  }, [views]);

  const latestAdded = (data) =>
    new Array(...data).sort((a, b) => b.inserted_at - a.inserted_at).slice(0, 10);

  const popularLinks = (data) => new Array(...data).sort((a, b) => b.hit - a.hit).slice(0, 10);

  return (
    <BaseLayout>
      <VStack w="full" spacing={4}>
        <Grid
          templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
          gap={4}
          w="full"
        >
          <StatCard
            icon={IoPeople}
            accent="green"
            count={res?.data?.reduce((sum, { hit }) => sum + hit, 0) || 0}
            label="Visitors"
          />
          <StatCard icon={IoLink} accent="blue" count={res?.data?.length || 0} label="Links" />
        </Grid>

        <Card w="full" h={96}>
          <CardBody>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 24,
                  left: 8,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Grid templateColumns={["1fr", "repeat(2, 1fr)"]} gap={4} w="full">
          <Card>
            <CardBody>
              <Heading fontSize="xl">Popular Urls</Heading>
              <ListView data={res ? popularLinks(res?.data) : null} />
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Heading fontSize="xl">Latest Urls</Heading>
              <ListView data={res ? latestAdded(res?.data) : null} />
            </CardBody>
          </Card>
        </Grid>
      </VStack>
    </BaseLayout>
  );
}
