import { useState } from "react";
import { SolicitacaoModalProps } from "../props/solicitacaoModalProps";

export const useModalDetalhesSolicitacao = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [solicitacao, setSolicitacao] = useState<SolicitacaoModalProps | null>(null);

  const openModal = (dados: SolicitacaoModalProps) => {
    setSolicitacao(dados);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSolicitacao(null);
  };

  return {
    isOpen,
    solicitacao,
    openModal,
    closeModal,
  };
};
