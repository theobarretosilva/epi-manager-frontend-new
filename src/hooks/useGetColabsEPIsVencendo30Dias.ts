import { useMemo } from "react";
import { SolicitacaoProps } from "../props/solicitacao.props";

export const useGetColabsEPIsVencendo30Dias = (solicitacoes: SolicitacaoProps[] | undefined) => {
  const colaboradoresComEPIsVencendo30Dias = useMemo(() => {
    if (!solicitacoes) return 0;

    const hoje = new Date();
    const daqui30Dias = new Date();
    daqui30Dias.setDate(hoje.getDate() + 30);

    const colaboradoresSet = new Set<number>();

    solicitacoes.forEach(solicitacao => {
      const validade = new Date(solicitacao.epi.dataValidade);
      if (validade >= hoje && validade <= daqui30Dias) {
        colaboradoresSet.add(solicitacao.solicitante.id);
      }
    });

    return colaboradoresSet.size;
  }, [solicitacoes]);

  return colaboradoresComEPIsVencendo30Dias;
};
