import jsPDF from "jspdf";
import { SolicitacaoProps } from "../props/solicitacao.props";
import autoTable from "jspdf-autotable";
import { useGetColaboradores } from "./useGetColaboradores";

export const useHandleDownloadSolicitacoes = (idColaborador: string) => {
    const { colaboradores } = useGetColaboradores(); 
    // aqui pega todos os colaboradores. tenho que fazer outro hook para pegar somente 1 colaborador específico. verificar com a duda o endpoint correto

    const solicitacoesDoColaborador = solicitacoes.filter(
        (s) => s.solicitante === nomeColaborador
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