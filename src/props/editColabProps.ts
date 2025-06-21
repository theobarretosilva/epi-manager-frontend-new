import { Dispatch, SetStateAction } from "react";

export interface EditColabProps {
    idColab: number | null;
    setModalIsOpen: (value: boolean) => void;
    setIdColab?: Dispatch<SetStateAction<number | null>>;
    modalIsOpen?: boolean;
}