import { toast } from "react-toastify";
import * as S from "./AprovarSolicitacao.styles"
import { AprovarSolicitacoesProps } from "./AprovarSolicitacao.styles";
import { useState } from "react";
import { BtnStyled } from "../BtnStyled/BtnStyled";
import { SelectInput } from "../SelectInput/SelectInput";
import { InputDisable } from "../InputDisable/InputDisable";
import useHandleFormSolicitarEPI from "../../hooks/useHandleFormSolicitarEPI";
import { InputStyled } from "../InputStyled/InputStyled";
import moment from "moment";

interface SolicitacaoProps {
  id: string;
  descricaoItem: string;
  status: string;
  codigoEPI: string;
  prioridade: string;
}

export const AprovarSolicitacao: React.FC<AprovarSolicitacoesProps> = ({setModalIsOpen, id, onEdit}) => {
  const solicitacoes = JSON.parse(sessionStorage.getItem("Solicitacoes") || "[]");
  const solicitacao = solicitacoes.filter((element: SolicitacaoProps)=> element.id == id);  
  const [status, setStatus] = useState("");
  const [prioridade, setPrioridade] = useState(solicitacao[0].prioridade);
  const [patrimonio, setPatrimonio] = useState("");
  const [estado, setEstado] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "prioridade":
        setPrioridade(value);
        break;
      case "patrimonio":
        setPatrimonio(value);
        break;
      default:
        break;
    }
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    switch (estado) {
      case "Aprovar":
        if (!prioridade || !patrimonio ) {
          toast.warning("Por favor, preencha todos os campos.", {
            autoClose: 6000,
            closeOnClick: true,
          });
        } else {
            const solicitacaoAtualizada = {
              id: solicitacao[0].id,
              solicitante: solicitacao[0].solicitante,
              descricaoItem: solicitacao[0].descricaoItem,
              codigoEPI: solicitacao[0].codigoEPI,
              prioridade: prioridade,
              quantidade: solicitacao[0].quantidade,
              status: "Aprovada",
              dataSolicitacao: solicitacao[0].dataSolicitacao,
              dataConclusao: moment().format('DD/MM/YYYY'),
              numeroPatrimonio: patrimonio,
              certificadoAprovacao: solicitacao[0].certificadoAprovacao,
            }

            const storedData = sessionStorage.getItem('Solicitacoes');
            const solicitacoes = storedData ? JSON.parse(storedData) : [];

            const updatedSolicitacoes = solicitacoes.filter(epi => epi.id !== solicitacao[0].id);

            const updateSolicitacoes = [...updatedSolicitacoes, solicitacaoAtualizada];

            sessionStorage.setItem('Solicitacoes', JSON.stringify(updateSolicitacoes));
            toast.success("Solicitação Aprovada!", {
              autoClose: 6000,
              closeOnClick: true,
            });
            onEdit(solicitacaoAtualizada);
            setModalIsOpen(false)
        }
        break;
      case "Recusar":
        { setStatus("Recusada")
          const solicitacaoAtualizada = {
            id: solicitacao[0].id,
            solicitante: solicitacao[0].solicitante,
            descricaoItem: solicitacao[0].descricaoItem,
            codigoEPI: solicitacao[0].codigoEPI,
            prioridade: prioridade,
            quantidade: solicitacao[0].quantidade,
            status: "Recusada",
            dataSolicitacao: solicitacao[0].dataSolicitacao,
            dataConclusao: moment().format('DD/MM/YYYY'),
            numeroPatrimonio: patrimonio,
            certificadoAprovacao: solicitacao[0].certificadoAprovacao,
          }

          const storedData = sessionStorage.getItem('Solicitacoes');
          const solicitacoes = storedData ? JSON.parse(storedData) : [];

          const updatedSolicitacoes = solicitacoes.filter(epi => epi.id !== solicitacao[0].id);

          const updateSolicitacoes = [...updatedSolicitacoes, solicitacaoAtualizada];

          sessionStorage.setItem('Solicitacoes', JSON.stringify(updateSolicitacoes));
        toast.error("Solicitação Recusada!", {
          autoClose: 6000,
          closeOnClick: true,
        });
        onEdit(solicitacaoAtualizada);
        setModalIsOpen(false); }
    }
    };
  return (
      <S.FormContainer onSubmit={handleSave}>
      <S.DivWrapper>
      <InputDisable 
          text={solicitacao[0].dataSolicitacao}
          type="text"
          title="Data de Abertura"
          name="dataAbertura"
        />
        <InputDisable 
            text={solicitacao[0].dataConclusao}
            type="text"
            title="Data de Conclusão"
            name="dataConclusao"
        />
        <InputDisable 
            text={solicitacao[0].status}
            type="text"
            title="Status"
            name="dataConclusao"
        />
        <InputDisable 
          text={solicitacao[0].id}
          type="text"
          title="ID da Solicitação"
          name="idSolicitacao"
        />
        <InputDisable 
          text={solicitacao[0].solicitante}
          type="text"
          title="Solicitante"
          name="solicitante"
        />
        <InputDisable 
          text={solicitacao[0].descricaoItem}
          type="text"
          title="Descrição do Item"
          name="descricaoItem"
        />
        <InputDisable 
          text={solicitacao[0].codigoEPI}
          type="text"
          title="Código do EPI"
          name="codigo"
        />
        <SelectInput text={prioridade} title="Prioridade" disable={false} handle={(e) => setPrioridade(e.target.value)}/>
        <InputStyled 
          value={patrimonio}
          tipo="text"
          titulo="Número de Patrimônio"
          name="patrimonio"
          handle={(e) => setPatrimonio(e.target.value)}
        />
      </S.DivWrapper>
      <S.DivFlex>
        <BtnStyled onClick={() => setEstado('Aprovar')} type="submit" text="Aprovar" />
        <S.ButtonRecuse onClick={()=> setEstado('Recusar')} >Recusar</S.ButtonRecuse>
      </S.DivFlex>
      </S.FormContainer>
  )
}