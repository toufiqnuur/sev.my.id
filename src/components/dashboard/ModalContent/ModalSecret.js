import { ModalContext } from "@/context/ModalContext";
import useUrls from "@/hooks/useUrls";
import { Api } from "@/libs/api";
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

export default function ModalSecret({ id, secret_key }) {
  const [stateEdit, setStateEdit] = useState(!secret_key);
  const [passphrase, setPassphrase] = useState("");
  const { mutate } = useUrls();
  const { toggleModal } = useContext(ModalContext);

  const patchUrl = async (e) => {
    e.preventDefault();
    await Api.PATCH(id, { secret_key: passphrase });
    mutate();
    toggleModal();
  };

  const removeSecret = async () => {
    await Api.PATCH(id, { secret_key: null });
    mutate();
    toggleModal();
  };

  return (
    <form onSubmit={patchUrl}>
      <ModalBody>
        <Alert status="info" fontSize="xs">
          <AlertIcon />
          Protected link is kind of link that can be given a Secret key / Passphrase before being
          redirected to the original link.
        </Alert>
        {stateEdit ? (
          <FormControl mt={4}>
            <FormLabel>Passphrase</FormLabel>
            <Input
              placeholder="xxxxxx"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
            />
          </FormControl>
        ) : (
          <>
            <Text fontWeight="semibold" mt={4}>
              Passphrase has been set
            </Text>
            <Text fontSize="sm" mt={4}>
              Click &quot;Change Key&quot; to change new Passphrase or &quot;Remove it&quot; to
              revert link to public.
            </Text>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        {stateEdit ? (
          <Button type="submit" colorScheme="blue">
            Save
          </Button>
        ) : (
          <>
            <Button colorScheme="red" onClick={removeSecret}>
              Remove it
            </Button>
            <ButtonGroup flex={1} justifyContent="end">
              <Button onClick={() => setStateEdit(true)}>Change key</Button>
              <Button colorScheme="blue" onClick={toggleModal}>
                Close
              </Button>
            </ButtonGroup>
          </>
        )}
      </ModalFooter>
    </form>
  );
}
