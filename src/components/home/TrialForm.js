import { BASE_URL } from "@/constant";
import { Api } from "@/libs/api";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Input,
  Link,
  Stack,
  useToast,
} from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function TrialForm() {
  const [history, setHistory] = useState([]);
  const [shortUrl, setShortUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error, data } = await Api.POST({
      real_url: inputUrl,
      expired_at: dayjs().add(7, "days"),
    });
    if (!error) {
      setShortUrl(`${BASE_URL}/${data?.slug}`);
      setHistory([
        {
          realUrl: inputUrl,
          shortUrl: `${BASE_URL}/${data?.slug}`,
          insertedAt: data?.inserted_at,
          expiredAt: data?.expired_at,
        },
        ...history,
      ]);
      setInputUrl("");
    }
    setLoading(false);
  };

  const clearForm = () => setShortUrl("");

  const copyShorten = () => {
    copy(shortUrl);
    toast({
      title: "Copied to clipboard",
      position: "top",
      status: "success",
      isClosable: true,
    });
  };

  useEffect(() => {
    if (localStorage.sevHash) setHistory(JSON.parse(localStorage.sevHash));
  }, []);

  useEffect(() => {
    if (shortUrl) localStorage.sevHash = JSON.stringify(history);
  }, [shortUrl, history]);

  return (
    <Box bg="blue.500">
      <Container py={16} maxW="container.lg">
        <form onSubmit={handleSubmit}>
          <Stack direction={["column", "row"]}>
            <Input
              value={inputUrl || shortUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              isDisabled={shortUrl}
              type="url"
              placeholder="Insert your long url here"
              bg="whiteAlpha.700"
              borderColor="white"
              _hover={{ borderColor: "white" }}
              _focus={{ borderColor: "white" }}
              size="lg"
              rounded="full"
              isRequired
            />
            {shortUrl ? (
              <>
                <Button
                  onClick={copyShorten}
                  bg="whiteAlpha.800"
                  size="lg"
                  rounded="full"
                  px="8"
                >
                  Copy
                </Button>
                <Button
                  onClick={clearForm}
                  bg="whiteAlpha.800"
                  size="lg"
                  rounded="full"
                  px="8"
                >
                  Clear
                </Button>
              </>
            ) : (
              <Button
                isLoading={loading}
                type="submit"
                bg="whiteAlpha.800"
                size="lg"
                rounded="full"
                px="8"
              >
                Shorten
              </Button>
            )}
          </Stack>
        </form>
        {!!history.length && (
          <Box mt="8">
            <Heading
              as="h5"
              fontSize="2xl"
              color="whiteAlpha.900"
              textAlign="center"
            >
              History
            </Heading>
            <Stack
              direction="column"
              maxW="2xl"
              mx="auto"
              mt="8"
              divider={<Divider />}
            >
              {history.map((item) => (
                <Link
                  fontSize="md"
                  color="whiteAlpha.900"
                  href={item.shortUrl}
                  rel="noopener"
                  isExternal
                >
                  {item.shortUrl}
                </Link>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
