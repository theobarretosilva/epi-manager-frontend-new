import { Dispatch, SetStateAction } from "react";

export interface AddEpiProps {
  setModalIsOpen: (value: boolean) => void;
  setIdEpi?: Dispatch<SetStateAction<number>>;
  idEpi?: number;
  modalIsOpen: boolean;
}