import {
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";

const footGroupUrls = [
  {
    title: "Policy",
    urls: [
      {
        name: "Privacy Policy",
        href: "/privacy",
        external: false,
      },
      {
        name: "Terms of Service",
        href: "/terms",
        external: false,
      },
    ],
  },
  {
    title: "Resources",
    urls: [
      {
        name: "Report Bug",
        href: "https://github.com/toufiqnuur/sev.my.id/issues",
        external: true,
      },
      {
        name: "Support Trakteer",
        href: "https://trakteer.id/toufiqnuurr/tip",
        external: true,
      },
    ],
  },
  {
    title: "Other Projects",
    urls: [
      {
        name: "Anihub",
        href: "https://github.com/toufiqnuur/anihub",
        external: true,
      },
      {
        name: "Skanesga",
        href: "https://github.com/toufiqnuur/skanesga",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  const [year, setYear] = useState(null);

  useEffect(() => {
    const y = new Date().getFullYear();
    y > "2023" && setYear(y);
  }, []);

  return (
    <footer style={{ background: "#301E67" }}>
      <Container maxW="container.xl" px={[8, 10]} pt={12} pb={6}>
        <Grid
          templateColumns={["repeat(2, 1fr)", "200px repeat(3, 250px)"]}
          gap={8}
        >
          <GridItem colSpan={[2, 1]}>
            <Image
              src="/brand.svg"
              width={60}
              height={80}
              alt=""
              loading="lazy"
            />
          </GridItem>

          {footGroupUrls.map((group, index) => (
            <GridItem key={index}>
              <Heading
                as="h5"
                color="white"
                fontSize="xl"
                fontWeight="semibold"
              >
                {group.title}
              </Heading>
              <VStack align="start" spacing={1} mt={4}>
                {group.urls.map((url, index) => (
                  <Link
                    as={url.external ? null : NextLink}
                    color="whiteAlpha.800"
                    fontSize="lg"
                    href={url.href}
                    isExternal={url.external}
                    key={index}
                  >
                    {url.name}
                  </Link>
                ))}
              </VStack>
            </GridItem>
          ))}
        </Grid>
        <Text color="whiteAlpha.600" mt={12} fontSize={["sm", "md"]}>
          &copy; Sev 2023 {year && "- " + year} | Project by{" "}
          <Link href="https://github.com/toufiqnuur" isExternal>
            @toufiqnuur
          </Link>
        </Text>
      </Container>
    </footer>
  );
}
