import BaseLayout from "@/components/dashboard/BaseLayout";
import ListAddedLinks from "@/components/dashboard/ListAddedLinks";
import { ModalProvider } from "@/context/ModalContext";
import useUrls from "@/hooks/useUrls";
import { Api } from "@/libs/api";
import { Button, Card, CardBody, Heading, Input, Stack } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function DashboardLinksPage() {
  const user = useUser();
  const { data: res, mutate } = useUrls();
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const postUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    await Api.POST({
      user_id: user?.id,
      real_url: inputUrl,
    });
    mutate();
    setInputUrl("");
    setLoading(false);
  };

  return (
    <ModalProvider>
      <BaseLayout>
        <Card w="full">
          <CardBody>
            <Heading fontSize="lg" mb={4}>
              Short new url
            </Heading>
            <form style={{ width: "100%" }} onSubmit={postUrl}>
              <Stack direction={["column", "row"]} w="full">
                <Input
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Type your very long url here"
                />
                <Button type="submit" colorScheme="teal" isLoading={loading} isDisabled={!inputUrl}>
                  Shorten
                </Button>
              </Stack>
            </form>
          </CardBody>
        </Card>
        <Card w="full">
          <CardBody>
            <Stack
              direction={["column", "row"]}
              w="full"
              align={{ md: "center" }}
              justify="space-between"
            >
              <Heading fontSize="lg">Latest Shorten Urls</Heading>
              <Input
                w="auto"
                size="sm"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                isDisabled={!res?.data?.length}
              />
            </Stack>
            <ListAddedLinks
              data={
                searchQuery
                  ? res?.data?.filter((url) => url.slug.toLowerCase().includes(searchQuery))
                  : res?.data
              }
            />
          </CardBody>
        </Card>
      </BaseLayout>
    </ModalProvider>
  );
}
