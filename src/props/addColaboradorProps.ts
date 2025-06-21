import { Dispatch, SetStateAction } from "react";

export interface AddColaboradorProps {
  setModalIsOpen: (value: boolean) => void;
  idColab?: number | null;
  setIdColab?: Dispatch<SetStateAction<number | null>>;
  modalIsOpen?: boolean;
}