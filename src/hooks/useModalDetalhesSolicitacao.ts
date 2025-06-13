import { useState } from "react";
import { SolicitacaoModalProps } from "../props/solicitacaoModalProps";

export const useModalDetalhesSolicitacao = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [descricaoItem, setDescricaoItem] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [dataSolicitacao, setdataSolicitacao] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [codigoEPI, setCodigoEPI] = useState();
  const [urgencia, setUrgencia] = useState("");
  const [dataConclusao, setDataConclusao] = useState("");
  const openModal = ({ dataConclusao, descricaoItem, id, status, dataSolicitacao, solicitante, quantidade, codigoEPI, urgencia }: SolicitacaoModalProps) => {
    setDescricaoItem(descricaoItem);
    setId(id);
    setStatus(status);
    setdataSolicitacao(dataSolicitacao);
    setSolicitante(solicitante);
    setQuantidade(quantidade);
    setCodigoEPI(codigoEPI);
    setUrgencia(urgencia);
    setDataConclusao(dataConclusao);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    descricaoItem,
    id,
    status,
    dataSolicitacao,
    solicitante,
    quantidade,
    codigoEPI,
    prioridade,
    dataConclusao,
    openModal,
    closeModal,
  };
};