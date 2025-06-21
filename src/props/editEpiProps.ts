export interface EditEpiProps {
    idEpi: number | null;
    setModalIsOpen: (open: boolean) => void;
    setIdEpi?: (id: number | null) => void;
    modalIsOpen?: boolean;
}