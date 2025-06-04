import { Dispatch, SetStateAction } from "react";

export interface AddColaboradorProps {
  setModalIsOpen: (value: boolean) => void;
  idColab: string | null;
  setIdColab: Dispatch<SetStateAction<string | null>>;
  modalIsOpen: boolean;
}