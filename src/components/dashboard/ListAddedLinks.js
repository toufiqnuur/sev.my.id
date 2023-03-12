import { BASE_URL } from "@/constant";
import { ModalContext, ModalTypes } from "@/context/ModalContext";
import {
  Box,
  ButtonGroup,
  Heading,
  Highlight,
  IconButton,
  Link,
  Menu,
  MenuItem,
  MenuButton,
  Button,
  MenuList,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import copy from "copy-to-clipboard";
import dayjs from "dayjs";
import NextLink from "next/link";
import { useContext } from "react";
import { IoLockClosed, IoPencil, IoShare, IoTime } from "react-icons/io5";

export function ListItem({
  id,
  slug,
  real_url,
  inserted_at,
  expired_at,
  secret_key,
}) {
  const { toggleModal } = useContext(ModalContext);

  const toast = useToast();

  const copyToClipboard = () => {
    copy(`${BASE_URL}/${slug}`);
    toast({
      title: "Copied to clipboard",
      status: "success",
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Stack direction="column" spacing={4} justify="space-between" p={4}>
      <Stack direction="row" justify="space-between" alignItems="center">
        <Link
          as={NextLink}
          fontSize="2xl"
          fontWeight="semibold"
          href={`/${slug}`}
          noOfLines={1}
        >
          <Highlight query={BASE_URL + "/"} styles={{ color: "cyan.600" }}>
            {BASE_URL + "/"}
          </Highlight>
          {slug}
        </Link>
        <ButtonGroup size="sm">
          <IconButton
            colorScheme="gray"
            aria-label="Edit short"
            fontSize="16px"
            icon={<IoPencil />}
            onClick={() =>
              toggleModal(ModalTypes.SHORT, { id, slug, real_url })
            }
          />
          <Menu>
            <MenuButton as={Button}>
              <IoShare />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={copyToClipboard}>Copy to Clipboard</MenuItem>
              <MenuItem
                onClick={() =>
                  toggleModal(ModalTypes.QRCODE, {
                    shortUrl: `${BASE_URL}/${slug}`,
                  })
                }
              >
                Qr Code
              </MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </Stack>
      <Link href={real_url} isExternal noOfLines={1}>
        {real_url}
      </Link>
      <Stack direction="row" justify="space-between" alignItems="center">
        <Text fontSize="sm">
          {dayjs(inserted_at).format("DD MMM YYYY HH:mm")}
        </Text>
        <ButtonGroup size="sm">
          <IconButton
            colorScheme={secret_key ? "teal" : "gray"}
            aria-label="Edit Secret"
            fontSize="16px"
            icon={<IoLockClosed />}
            onClick={() => toggleModal(ModalTypes.SECRET, { id, secret_key })}
          />
          <IconButton
            colorScheme={expired_at ? "teal" : "gray"}
            aria-label="Edit time"
            fontSize="16px"
            icon={<IoTime />}
            onClick={() => toggleModal(ModalTypes.TIME, { id, expired_at })}
          />
        </ButtonGroup>
      </Stack>
    </Stack>
  );
}

export default function ListAddedLinks({ data }) {
  return (
    <Stack
      direction="column"
      mt="8"
      divider={<StackDivider borderColor="gray.300" />}
    >
      {data ? (
        data.map((url) => <ListItem key={url.id} {...url} />)
      ) : (
        <Box pt={12} pb={24} textAlign="center">
          <Text fontSize="4xl">&#x1f343;</Text>
          <Heading fontSize="2xl" mt={4}>
            It&apos;s empty!
          </Heading>
          <Text color="gray.500">No data available</Text>
        </Box>
      )}
    </Stack>
  );
}
