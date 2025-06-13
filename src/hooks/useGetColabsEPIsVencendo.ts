import { useMemo } from "react";
import { SolicitacaoProps } from "../props/solicitacao.props";

export const useGetColabsComEPIsVencendo = (
  solicitacoes: SolicitacaoProps[] | undefined
) => {
  const totalColabsComEPIVencido = useMemo(() => {
    const hoje = new Date();

    if (!solicitacoes) return 0;

    const colaboradoresComEPIvencido = new Set<string>();

    solicitacoes.forEach((solicitacao) => {
      const { solicitante, epi } = solicitacao;

      if (!solicitante || !epi || !epi.dataValidade) return;

      const validade = new Date(epi.dataValidade);

      if (validade < hoje) {
        colaboradoresComEPIvencido.add(solicitante.cpf);
      }
    });

    return colaboradoresComEPIvencido.size;
  }, [solicitacoes]);

  return totalColabsComEPIVencido;
};
