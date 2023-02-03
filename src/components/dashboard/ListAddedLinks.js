import { ModalContext, ModalTypes } from "@/context/ModalContext";
import {
  Box,
  ButtonGroup,
  Heading,
  Highlight,
  IconButton,
  Link,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useContext } from "react";
import { IoLockClosed, IoPencil, IoShare, IoTime } from "react-icons/io5";

export function ListItem({ id, slug, real_url, inserted_at, expired_at, secret_key }) {
  const { toggleModal } = useContext(ModalContext);

  return (
    <Stack direction="column" spacing={4} justify="space-between" p={4}>
      <Stack direction="row" justify="space-between" alignItems="center">
        <Link fontSize="2xl" fontWeight="semibold" href="#" noOfLines={1}>
          <Highlight query="sev.my.id/" styles={{ color: "cyan.600" }}>
            sev.my.id/
          </Highlight>
          {slug}
        </Link>
        <ButtonGroup size="sm">
          <IconButton
            colorScheme="gray"
            aria-label="Edit short"
            fontSize="16px"
            icon={<IoPencil />}
            onClick={() => toggleModal(ModalTypes.SHORT, { id, slug, real_url })}
          />
          <IconButton
            colorScheme="gray"
            aria-label="Edit short"
            fontSize="16px"
            icon={<IoShare />}
          />
        </ButtonGroup>
      </Stack>
      <Link href="#" isExternal noOfLines={1}>
        {real_url}
      </Link>
      <Stack direction="row" justify="space-between" alignItems="center">
        <Text fontSize="sm">{dayjs(inserted_at).format("DD MMM YYYY HH:mm")}</Text>
        <ButtonGroup size="sm">
          <IconButton
            colorScheme={secret_key ? "teal" : "gray"}
            aria-label="Edit short"
            fontSize="16px"
            icon={<IoLockClosed />}
            onClick={() => toggleModal(ModalTypes.SECRET, { id, secret_key })}
          />
          <IconButton
            colorScheme={expired_at ? "teal" : "gray"}
            aria-label="Edit short"
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
    <Stack direction="column" mt="8" divider={<StackDivider borderColor="gray.300" />}>
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
