import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useGetColaboradorPorId } from "./useGetColaboradorPorId";
import { useGetSolicitacoes } from "./useGetSolicitacoes";

export const useHandleDownloadSolicitacoes = (idColaborador: string) => {
    const { colaborador } = useGetColaboradorPorId(idColaborador);
    const { solicitacoes } = useGetSolicitacoes();

    const solicitacoesDoColaborador = solicitacoes?.filter(
        (s) => s.solicitante.nome === colaborador?.nome
    );

    const doc = new jsPDF();
    doc.text(`Solicitações de ${colaborador?.nome}`, 14, 20);

    autoTable(doc, {
        startY: 30,
        head: [['Descrição', 'Setor', 'Data']],
        body: solicitacoesDoColaborador?.map((s) => [
            s.equipamento.descricao ?? '',
            s.solicitante.setor ?? '',
            s.dataAbertura instanceof Date
            ? s.dataAbertura.toLocaleDateString()
            : s.dataAbertura ?? '',
        ]) ?? [],
    });

    doc.save(`Solicitacoes_${colaborador?.nome.replace(/\s+/g, '_')}.pdf`);
};