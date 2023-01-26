import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewPasswordPage() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { _, error } = await supabase.auth.updateUser({ password });
    !error && router.push("/dashboard");
    setLoading(false);
  };

  return (
    <Container maxW="container.xl">
      <Box w={36} mx="auto" mt={{ base: 12, md: 14 }}>
        <Image src="/logo.png" width={144} height={72} alt="" priority />
      </Box>
      <Box maxW="md" mx="auto" mt={12}>
        <Heading mb={8}>Reset Sandi</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Kata sandi baru</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired isInvalid={password !== confirmPassword}>
              <FormLabel>Konfirmasi kata sandi baru</FormLabel>
              <Input
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <FormErrorMessage>Password and confirm password must be match</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              w="full"
              colorScheme="cyan"
              color="white"
              isLoading={loading}
              isDisabled={password !== confirmPassword}
            >
              Simpan
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}
