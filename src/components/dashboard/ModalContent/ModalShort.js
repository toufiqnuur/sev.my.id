import { ModalContext } from "@/context/ModalContext";
import useUrls from "@/hooks/useUrls";
import { Api } from "@/libs/api";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

export default function ModalShort({ id, slug, real_url }) {
  const [short, setShort] = useState(slug);
  const { toggleModal } = useContext(ModalContext);
  const { mutate } = useUrls();

  const patchUrl = async (e) => {
    e.preventDefault();
    await Api.PATCH(id, { slug: short });
    mutate();
    toggleModal();
  };

  return (
    <form onSubmit={patchUrl}>
      <ModalBody>
        <FormControl isInvalid={!short}>
          <FormLabel>Edit short</FormLabel>
          <InputGroup>
            <InputLeftAddon>sev.my.id/</InputLeftAddon>
            <Input type="text" value={short} onChange={(e) => setShort(e.target.value)} />
          </InputGroup>
          <FormErrorMessage>Short cant be empty</FormErrorMessage>
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Long url</FormLabel>
          <Input value={real_url} isDisabled />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="teal" type="submit">
          Save
        </Button>
      </ModalFooter>
    </form>
  );
}
