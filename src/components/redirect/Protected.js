import { fetcher } from "@/libs/fetcher";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ProtectedLink({ urlId }) {
  const [passphrase, setPassphrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ redirect: null, error: null });

  useEffect(() => {
    result.redirect && window.location.assign(result.redirect);
  }, [result.redirect]);

  const validateSecret = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await fetcher("/api/urls/validate", {
      method: "POST",
      body: JSON.stringify({ id: urlId, passphrase }),
    });
    setResult(response);
    setLoading(false);
  };

  return (
    <Box maxW="2xl" mx="auto" mt={16}>
      <Heading>&#128272; Protected link</Heading>
      <Text fontSize="lg" color="gray.600" mt={2}>
        Type secret passphrase correctly to continue
      </Text>
      <form style={{ marginTop: "2rem" }} onSubmit={validateSecret}>
        {result.error && (
          <Alert status="error" mb={6}>
            <AlertIcon />
            {result.error?.message}
          </Alert>
        )}
        <FormControl isRequired>
          <FormLabel fontSize="md">Passphrase</FormLabel>
          <Input
            type="text"
            size="lg"
            placeholder="xxxxxx"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" size="lg" mt={4} isLoading={loading}>
          Validate
        </Button>
      </form>
    </Box>
  );
}
