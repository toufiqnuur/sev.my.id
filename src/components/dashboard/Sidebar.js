import { Flex, Link, Show, VStack } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { IoLink, IoPieChart, IoStatsChart } from "react-icons/io5";

export function NavLink({ icon, href, children }) {
  const router = useRouter();

  return (
    <Link
      as={NextLink}
      href={href}
      display="flex"
      alignItems="center"
      py={2}
      px={4}
      gap={4}
      rounded="lg"
      _hover={{ bg: "gray.200" }}
      bg={router.asPath === href && "gray.200"}
    >
      {icon}
      <Show above="lg">{children}</Show>
    </Link>
  );
}

export default function Sidebar({ open }) {
  const navlinks = [
    { name: "Dashboard", icon: <IoPieChart />, path: "/dashboard" },
    { name: "Links", icon: <IoLink />, path: "/dashboard/links" },
    { name: "Analytics", icon: <IoStatsChart />, path: "/dashboard/analytics" },
  ];

  return (
    <Flex
      pos="sticky"
      top={0}
      left={0}
      w={{ base: "16", lg: 80 }}
      h="100vh"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      display={{ base: `${open ? "block" : "none"}`, md: "block" }}
    >
      <VStack align="stretch" w="full" px={2} spacing={2}>
        <Flex h={16} alignItems="center">
          <Link
            as={NextLink}
            href="/dashboard"
            textAlign="center"
            w="full"
            fontSize="2xl"
            fontWeight="bold"
          >
            <Show above="lg">
              <Image src="/logo.png" width={120} height={60} alt="" />
            </Show>
            <Show below="lg">SV</Show>
          </Link>
        </Flex>
        {navlinks.map((nav, index) => (
          <NavLink href={nav.path} icon={nav.icon} key={index}>
            {nav.name}
          </NavLink>
        ))}
      </VStack>
    </Flex>
  );
}
