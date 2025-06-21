import React, { useEffect } from "react";
import * as S from "./EditarColaboradorModal.styles";
import "react-toastify/dist/ReactToastify.css";
import { InputStyled } from "../InputStyled/InputStyled";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import { TipoPermissao } from "../../enums/TipoPermissao";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { SelectStyled } from "../SelectStyled/SelectStyled";
import { useGetColaboradores } from "../../hooks/useGetColaboradores";
import { useEditColabForm } from "../../hooks/useEditColabForm";
import { EditColabProps } from "../../props/editColabProps";

const EditarColaboradorModal: React.FC<EditColabProps> = ({ idColab, setModalIsOpen, modalIsOpen }) => {
    const { colaboradores } = useGetColaboradores();
    const { onSubmit, register, responseError, reset, setValue, watch, errors } =
        useEditColabForm({ idColab, setModalIsOpen });

    useEffect(() => {
        if (!modalIsOpen || !colaboradores) return;

        const colaborador = colaboradores.find((c) => c.id === idColab);

        if (colaborador) {
            const colaboradorComPermissaoNormalizada = {
                nome_lideranca: colaborador.nome_lideranca ?? "Sem liderança",
                cargo: colaborador.cargo,
                setor: colaborador.setor,
                lideranca: !!colaborador.lideranca,
                permissao: colaborador.permissao as TipoPermissao,
            };
            reset(colaboradorComPermissaoNormalizada);
        }
    }, [modalIsOpen, idColab, colaboradores, reset]);


    const lideresList = colaboradores?.filter((c) => c.lideranca).map((c) => c.nome) ?? [];

    return (
        <S.FormContainer onSubmit={onSubmit}>
        <S.DivWrapper>
            <S.DivInputs>
                <InputStyled tipo="text" titulo="Setor" {...register("setor")} />
                <p style={{ color: "red" }}>{errors.setor?.message}</p>

                <InputStyled tipo="text" titulo="Cargo" {...register("cargo")} />
                <p style={{ color: "red" }}>{errors.cargo?.message}</p>
            </S.DivInputs>

            <S.DivInputs style={{ gap: "0" }}>
            <FormControl style={{ marginTop: "1vh" }}>
                <FormLabel>Cargo de liderança?</FormLabel>
                <RadioGroup
                    row
                    style={{ width: "14vw" }}
                    value={watch("lideranca") ? "true" : "false"}
                    onChange={(e) => setValue("lideranca", e.target.value === "true")}
                >
                    <FormControlLabel value="true" control={<Radio />} label="Sim" />
                    <FormControlLabel value="false" control={<Radio />} label="Não" />
                </RadioGroup>
                <p style={{ color: "red" }}>{errors.lideranca?.message}</p>
            </FormControl>

            <FormControl style={{ marginTop: "1vh" }}>
                <FormLabel>Tipo de permissão</FormLabel>
                <RadioGroup
                    row
                    style={{ width: "28vw" }}
                    value={watch("permissao")}
                    onChange={(e) => setValue("permissao", e.target.value as TipoPermissao)}
                >
                    <FormControlLabel value={TipoPermissao.COLABORADOR} control={<Radio />} label="Colaborador" />
                    <FormControlLabel value={TipoPermissao.ALMOXARIFADO} control={<Radio />} label="Almoxarifado" />
                    <FormControlLabel value={TipoPermissao.ADMIN} control={<Radio />} label="Administrador" />
                </RadioGroup>
                <p style={{ color: "red" }}>{errors.permissao?.message}</p>
            </FormControl>
            </S.DivInputs>

            <SelectStyled
                disabled={watch("lideranca")}
                titulo="Nome liderança"
                value={watch("nome_lideranca")}
                options={lideresList}
                onChange={(value) => setValue("nome_lideranca", value ?? "Sem liderança")}
                name="nome_lideranca"
            />
            <p style={{ color: "red" }}>{errors.nome_lideranca?.message}</p>

            {!!responseError && <p>{responseError}</p>}
        </S.DivWrapper>

        <BtnStyled type="submit" text="Salvar" />
        </S.FormContainer>
    );
};

export default EditarColaboradorModal;
