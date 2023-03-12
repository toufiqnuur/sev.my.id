import ActionModal from "@/components/dashboard/ActionModal";
import { createContext, useContext, useState } from "react";

export const ModalContext = createContext({
  props: {},
  type: "",
  open: false,
  toggleModal: () => {},
});

export const useModalContext = () => useContext(ModalContext);

export const ModalTypes = {
  SHORT: "modal-short",
  TIME: "modal-time",
  SECRET: "modal-secret",
  QRCODE: "modal-qrcode",
};

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [props, setProps] = useState({});

  const toggleModal = (type, props) => {
    setOpen(!open);
    setType(type);
    setProps(props);
  };

  return (
    <ModalContext.Provider value={{ open, type, toggleModal, props }}>
      {children}
      <ActionModal />
    </ModalContext.Provider>
  );
};
