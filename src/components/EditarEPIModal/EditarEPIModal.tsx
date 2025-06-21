import { useEffect } from "react";
import { useEditEPIForm } from "../../hooks/useEditEPIForm";
import { EditEpiProps } from "../../props/editEpiProps";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import { InputStyled } from "../InputStyled/InputStyled";
import * as S from './EdiarEPIModal.styles'
import { useGetEPIS } from "../../hooks/useGetEPIS";

export const EditarEPIModal = ({ idEpi, setModalIsOpen, modalIsOpen}: EditEpiProps) => {
    const { epis } = useGetEPIS();
    const { 
        register,
        errors,
        handleSubmit,
        responseError,
        onSubmit,
        setValue
    } = useEditEPIForm({ idEpi, setModalIsOpen });

    useEffect(() => {
        if (!modalIsOpen || !idEpi || !epis) return;
        console.log(idEpi)
        const epi = epis.find((epi) => epi.id === idEpi);
        if (epi) {
            setValue('descricao', epi.descricao ?? '');
            setValue('preco', epi.preco ?? 0);
        }
    }, [modalIsOpen, idEpi, epis, setValue]);

    return (
        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
        <InputStyled {...register("descricao")} tipo="text" titulo="Descrição" />
        <p style={{ color: "red" }}>{errors.descricao?.message}</p>

        <InputStyled {...register("preco")} tipo="number" titulo="Preço" />
        <p style={{ color: "red" }}>{errors.preco?.message}</p>

        {!!responseError && <p>{responseError}</p>}

        <BtnStyled type="submit" text="Salvar alterações" />
        </S.FormContainer>
    );
}