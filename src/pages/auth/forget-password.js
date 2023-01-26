import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useState } from "react";

export default function ForgetPasswordPage() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      "http://localhost:3000/auth/new-password";
    url = url.includes("http") ? url : `https://${url}/auth/new-paswword`;
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { _, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: getURL() });
    !error && setEmailSent(true);
    setLoading(false);
  };

  return (
    <Container maxW="container.xl">
      <Box w={36} mx="auto" mt={{ base: 12, md: 14 }}>
        <Image src="/logo.png" width={144} height={72} alt="" priority />
      </Box>
      <Box mt={12} maxW="md" mx="auto">
        <Heading mb={8}>Lupa Sandi</Heading>
        <form onSubmit={handleSubmit}>
          {emailSent ? (
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
              rounded="lg"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Check your email to reset password
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Please check your email to confirm reset password to your account.
              </AlertDescription>
            </Alert>
          ) : (
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="email@domain.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Button
                type="submit"
                w="full"
                colorScheme="cyan"
                color="white"
                isDisabled={!email}
                isLoading={loading}
              >
                Reset password
              </Button>
            </VStack>
          )}
        </form>
      </Box>
    </Container>
  );
}
