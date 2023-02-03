import { ModalContext, ModalTypes } from "@/context/ModalContext";
import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { useContext } from "react";
import ModalSecret from "./ModalContent/ModalSecret";
import ModalShort from "./ModalContent/ModalShort";
import ModalTime from "./ModalContent/ModalTime";

export default function ActionModal() {
  const { open, toggleModal, type, props } = useContext(ModalContext);

  const ModalBody = {
    [ModalTypes.SHORT]: {
      title: "Edit Short Url",
      component: <ModalShort {...props} />,
    },
    [ModalTypes.TIME]: {
      title: "Time based link",
      component: <ModalTime {...props} />,
    },
    [ModalTypes.SECRET]: {
      title: "Protected Link",
      component: <ModalSecret {...props} />,
    },
  };

  return (
    <Modal isOpen={open} onClose={toggleModal} closeOnOverlayClick={false} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{ModalBody[type]?.title}</ModalHeader>
        <ModalCloseButton />
        {ModalBody[type]?.component}
      </ModalContent>
    </Modal>
  );
}
