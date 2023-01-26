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
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [authState, setAuthState] = useState("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    session && router.push("/dashboard");
  }, [session]);

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    clearForm();
  };

  const handleRegister = async () => {
    setLoading(true);
    const { _, error } = await supabase.auth.signUp({ email, password });
    !error && setRegistered(true);
    setLoading(false);
    clearForm();
  };

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ??
      process?.env?.NEXT_PUBLIC_VERCEL_URL ??
      "http://localhost:3000/dashboard";
    url = url.includes("http") ? url : `https://${url}/dashboard`;
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const handleOauth = async (provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: getURL() },
    });
  };

  return (
    <Container maxW="container.xl">
      <Box w={36} mx="auto" mt={{ base: 12, md: 14 }}>
        <Image src="/logo.png" width={144} height={72} alt="" priority />
      </Box>
      <Box maxW="md" mx="auto" mt={12}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            authState === "LOGIN" ? handleLogin() : handleRegister();
          }}
        >
          <VStack spacing={4}>
            <Button
              isDisabled={loading}
              w="full"
              colorScheme="gray"
              type="button"
              leftIcon={<FcGoogle />}
              onClick={() => handleOauth("google")}
            >
              Continue with Google
            </Button>
            <Text color="gray">- or -</Text>
            {registered ? (
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
                  Check your email to confirm
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  You&apos;ve successfully signed up. Please check your email to confirm your
                  account before signing in to the SevMyId dashboard
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <FormControl isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    placeholder="email@domain.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="******"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </FormControl>
                <Button
                  w="full"
                  colorScheme="cyan"
                  color="white"
                  type="submit"
                  isLoading={loading}
                  isDisabled={!email && !password}
                >
                  {authState === "LOGIN" ? "Login" : "Register"}
                </Button>
              </>
            )}
            <VStack pt={4} justify="center">
              {authState === "LOGIN" ? (
                <>
                  <Text>
                    Lupa sandi?{" "}
                    <Button
                      variant="link"
                      colorScheme="cyan"
                      onClick={() => router.push("/auth/forget-password")}
                    >
                      Reset
                    </Button>
                  </Text>
                  <Text>
                    Belum punya akun?{" "}
                    <Button
                      variant="link"
                      colorScheme="cyan"
                      onClick={() => setAuthState("SIGNUP")}
                    >
                      Register
                    </Button>
                  </Text>
                </>
              ) : (
                <Text>
                  Sudah punya akun?{" "}
                  <Button
                    variant="link"
                    colorScheme="cyan"
                    onClick={() => {
                      setRegistered(false);
                      setAuthState("LOGIN");
                    }}
                  >
                    Login
                  </Button>
                </Text>
              )}
            </VStack>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}
