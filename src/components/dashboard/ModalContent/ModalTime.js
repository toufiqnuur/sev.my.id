import { ModalContext } from "@/context/ModalContext";
import useUrls from "@/hooks/useUrls";
import { Api } from "@/libs/api";
import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  Center,
  ModalBody,
  ModalFooter,
  Text,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import ReactDatePicker from "react-datepicker";

export default function ModalTime({ id, expired_at }) {
  const { mutate } = useUrls();
  const { toggleModal } = useContext(ModalContext);
  const [selectedDate, setSelectedDate] = useState(() =>
    expired_at ? new Date(expired_at) : null
  );

  const patchUrl = async () => {
    await Api.PATCH(id, { expired_at: selectedDate });
    mutate();
    toggleModal();
  };

  const removeTimer = async () => {
    await Api.PATCH(id, { expired_at: null });
    mutate();
    toggleModal();
  };

  return (
    <>
      <ModalBody>
        <VStack alignItems="stretch">
          <Alert status="info" fontSize="xs">
            <AlertIcon />
            Time based link is kind of link that only lasts of certain period time. When the link
            has expired, then the link will no longer accessible
          </Alert>
          <Text fontSize="sm" py={4}>
            Link will be accessible until:{" "}
            <strong>
              {selectedDate ? dayjs(selectedDate).format("DD MMM YYYY HH:mm") : "- Not set"}
            </strong>
          </Text>
          <Center>
            <ReactDatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              monthsShown={1}
              inline
              showTimeInput
            />
          </Center>
          <Text fontSize="xs">*Date & Time based on browser time</Text>
        </VStack>
      </ModalBody>
      <ModalFooter display="flex">
        <Button colorScheme="red" display={!expired_at && "none"} onClick={removeTimer}>
          Remove it
        </Button>
        <ButtonGroup flex={1} justifyContent="end">
          <Button onClick={toggleModal}>Cancel</Button>
          <Button colorScheme="blue" onClick={patchUrl}>
            Save
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
}
