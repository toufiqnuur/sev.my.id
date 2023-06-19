import { BASE_URL } from "@/constant";
import { Api } from "@/libs/api";
import {
  Box,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { HiArrowRight, HiClipboard, HiX } from "react-icons/hi";

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
    <Box bgImg="linear-gradient(to bottom, #03001C, #301E67)" id="trial">
      <Container py={16} px={[8, 0]} maxW="container.lg">
        <Heading
          textAlign="center"
          color="white"
          fontSize={["4xl", "5xl"]}
          letterSpacing={-1}
          lineHeight={1}
        >
          Just try it out
        </Heading>
        <Text
          color="whiteAlpha.800"
          textAlign="center"
          mt={2}
          fontSize={["lg", "xl"]}
          letterSpacing={-0.5}
          mb={16}
        >
          You can try it out without logging in, just like magic.
        </Text>
        <form onSubmit={handleSubmit}>
          <InputGroup size="lg">
            <Input
              value={inputUrl || shortUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              pr={16}
              type="url"
              variant="filled"
              placeholder="Insert your long url here"
              _focus={{ background: "white" }}
              isReadOnly={shortUrl}
              isRequired
            />
            <InputRightElement w={shortUrl ? 24 : 12}>
              <IconButton
                display={shortUrl ? "flex" : "none"}
                mr={1}
                aria-label="clear"
                colorScheme="orange"
                icon={<HiX />}
                onClick={clearForm}
              />
              <IconButton
                type={shortUrl ? "button" : "submit"}
                aria-label="Short url"
                colorScheme="facebook"
                isLoading={loading}
                icon={shortUrl ? <HiClipboard /> : <HiArrowRight />}
                onClick={shortUrl ? copyShorten : null}
              />
            </InputRightElement>
          </InputGroup>
        </form>
      </Container>
    </Box>
  );
}
