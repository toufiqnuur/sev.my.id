import {
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IoLogOutOutline, IoMenu } from "react-icons/io5";

export default function Header({ user, logout, toggleSidebar }) {
  const router = useRouter();

  return (
    <Box
      bgColor="white"
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      left={0}
      w="full"
      zIndex={10}
    >
      <Container
        maxW="container.xl"
        h={16}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <IconButton
          colorScheme="gray"
          aria-label="Edit short"
          display={{ base: "flex", md: "none" }}
          fontSize="16px"
          icon={<IoMenu />}
          onClick={toggleSidebar}
        />
        <Text fontSize="lg" fontWeight="semibold">
          {router.asPath}
        </Text>
        <Menu>
          <MenuButton>
            <Avatar size="sm" name={user?.email} />
          </MenuButton>
          <MenuList>
            <MenuGroup title={user?.email}>
              <MenuItem icon={<IoLogOutOutline size={18} />} onClick={logout}>
                Sign out
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Container>
    </Box>
  );
}
