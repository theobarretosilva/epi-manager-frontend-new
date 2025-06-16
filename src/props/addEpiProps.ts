import { Dispatch, SetStateAction } from "react";

export interface AddEpiProps {
  setModalIsOpen: (value: boolean) => void;
  setIdEpi?: Dispatch<SetStateAction<number | null>>;
  idEpi?: number;
  modalIsOpen: boolean;
}