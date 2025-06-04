import jsPDF from "jspdf";
import { SolicitacaoProps } from "../props/solicitacao.props";
import autoTable from "jspdf-autotable";
import { useGetColaboradorPorId } from "./useGetColaboradorPorId";

export const useHandleDownloadSolicitacoes = (idColaborador: string) => {
    const { colaborador } = useGetColaboradorPorId(idColaborador);
    const { solicitacoes } = useGetSolicit

    const solicitacoesDoColaborador = solicitacoes.filter(
        (s) => s.solicitante === colaborador.nome
    );

    const doc = new jsPDF();
    doc.text(`Solicitações de ${nomeColaborador}`, 14, 20);

    autoTable(doc, {
        startY: 30,
        head: [['Descrição', 'Setor', 'Data']],
        body: solicitacoesDoColaborador.map((s) => [
            s.descricaoItem,
            s.setor,
            s.dataSolicitacao,
        ]),
    });

    doc.save(`Solicitacoes_${nomeColaborador.replace(/\s+/g, '_')}.pdf`);
};