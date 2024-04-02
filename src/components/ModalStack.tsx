import { ReactNode, createContext, useContext, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

interface Modal {
  title: string;
  message: string;
  onClose?: () => void;
  element?: ReactNode;
}

interface ModalContextType {
  modals: Modal[];
  openModal: (modal: Modal) => void;
}

const ModalContext = createContext<ModalContextType>({
  modals: [],
  openModal: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: any }) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = (modal: Modal) => {
    setModals((prevModals) => [...prevModals, modal]);
  };

  const closeTopModal = () => {
    setModals((prevModals) => prevModals.slice(0, -1));
  };

  return (
    <ModalContext.Provider value={{ modals, openModal }}>
      {children}
      {modals.map((modal, index) => (
        <Sheet open={index === modals.length - 1} onOpenChange={closeTopModal}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{modal.title}</SheetTitle>
              <SheetDescription>{modal.message}</SheetDescription>
            </SheetHeader>
            {modal.element ?? <></>}
          </SheetContent>
        </Sheet>
      ))}
    </ModalContext.Provider>
  );
};
