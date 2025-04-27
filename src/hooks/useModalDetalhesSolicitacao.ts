import { useState } from "react";

interface ModalProps {
  descricaoItem: string;
  id: string;
  status: string;
  dataSolicitacao: string;
  solicitante: string;
  quantidade: string;
  codigoEPI: string;
  numeroPatrimonio: string;
  prioridade: string;
  dataConclusao: string;
}

export const useModalDetalhesSolicitacao = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [descricaoItem, setDescricaoItem] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [dataSolicitacao, setdataSolicitacao] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [codigoEPI, setCodigoEPI] = useState("");
  const [numeroPatrimonio, setNumeroPatrimonio] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const [dataConclusao, setDataConclusao] = useState("");
  const openModal = ({ dataConclusao, descricaoItem, id, status, dataSolicitacao, solicitante, quantidade, codigoEPI, numeroPatrimonio, prioridade }: ModalProps) => {
    setDescricaoItem(descricaoItem);
    setId(id);
    setStatus(status);
    setdataSolicitacao(dataSolicitacao);
    setSolicitante(solicitante);
    setQuantidade(quantidade);
    setCodigoEPI(codigoEPI);
    setNumeroPatrimonio(numeroPatrimonio)
    setPrioridade(prioridade);
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
    numeroPatrimonio,
    prioridade,
    dataConclusao,
    openModal,
    closeModal,
  };
};