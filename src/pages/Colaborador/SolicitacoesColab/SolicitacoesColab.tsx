import { Paper } from '@mui/material';
import * as S from './SolicitacoesColab.styles';
import { Searchbar } from '../../../components/Searchbar/Searchbar';
import { DataGrid, GridActionsCellItem, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { OpenModalIcon } from '../../../components/OpenModalIcon/OpenModalIcon';
import { useCallback, useMemo, useState } from 'react';
import ReactModal from 'react-modal';
import { InputDisable } from '../../../components/InputDisable/InputDisable';
import { SelectInput } from '../../../components/SelectInput/SelectInput';
import { useModalDetalhesSolicitacao } from '../../../hooks/useModalDetalhesSolicitacao';
import { NoDataToShow } from '../../../components/NoDataToShow/NoDataToShow';
import { ModuloNSoliciDash } from '../../../components/ModuloNSoliciDash/ModuloNSoliciDash';
import { useGetEPIS } from '../../../hooks/useGetEPIS';
import { EPIProps } from '../../../props/episProps';
import { SolicitacaoProps } from '../../../props/solicitacao.props';
import { SolicitacaoModalProps } from '../../../props/solicitacaoModalProps';
import { useGetSolicitacoesUser } from '../../../hooks/useGetSolicitacoesUser';

export const SolicitacoesFunc = () => {
  const { isOpen, openModal, closeModal } = useModalDetalhesSolicitacao();
  const { solicitacoesUser } = useGetSolicitacoesUser();
  console.log(solicitacoesUser)
  const { epis } = useGetEPIS();
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<SolicitacaoModalProps | null>(null);

  const getValidadeEPI = useCallback((cod: number | undefined) => {
    const epi = epis?.find((epi: EPIProps) => epi.codigo === cod);
    return epi
      ? new Date(epi.data_validade).toLocaleDateString('pt-BR')
      : 'N/A';
  }, [epis]);

  const getCAEPI = (cod: number) => {
    const epi = epis?.find((epi: EPIProps) => epi.codigo === cod);
    return epi ? epi.ca : 'N/A';
  }

  const getSolicitacao = (params: SolicitacaoProps) => {
    const solicitacao = solicitacoesUser?.find((solicitacao: SolicitacaoProps) => solicitacao.id == params.id);
    return solicitacao;
  }

  const columns: GridColDef[] = [
    {
      field: 'open',
      type: 'actions',
      headerName: 'Abrir',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key={0}
          icon={<OpenModalIcon />}
          label="Abrir"
          onClick={() => {
            const solicitacao = getSolicitacao(params.row as SolicitacaoProps);
            if (solicitacao) {
              const dadosModal: SolicitacaoModalProps = {
                id: solicitacao.id,
                descricao: solicitacao.equipamento?.descricao ?? 'Descrição não informada',
                status: solicitacao.status,
                dataSolicitacao: solicitacao.dataAbertura ?? '-',
                dataConclusao: solicitacao.dataConclusao ?? '-',
                solicitante: solicitacao.solicitante,
                quantidade: solicitacao.qtd ?? 0,
                codigoEPI: solicitacao.equipamento?.codigo ?? 0,
                urgencia: solicitacao.urgencia ?? 'Normal',
              };
              setSolicitacaoSelecionada(dadosModal);
              openModal(dadosModal);
            }
          }}
        />,
      ],
      width: 70,
    },
    { field: 'id', headerName: 'ID', width: 90, align: 'center', headerAlign: 'center' },
    { field: 'dataAbertura', headerName: 'Data da solicitação', width: 180, align: 'center', headerAlign: 'center' },
    { field: 'descricao', headerName: 'EPI', width: 250, align: 'center', headerAlign: 'center' },
    { field: 'qtd', headerName: 'Quantidade', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'status', headerName: 'Status', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'urgencia', headerName: 'Urgência', width: 150, align: 'center', headerAlign: 'center' },
  ];

  const rows = useMemo(() => 
    solicitacoesUser?.map((solicitacao: SolicitacaoProps) => ({
      id: solicitacao.id,
      dataAbertura: new Date(solicitacao.dataAbertura).toLocaleDateString('pt-BR'),
      descricao: solicitacao.equipamento.descricao,
      qtd: solicitacao.qtd,
      status: solicitacao.status,
      urgencia: solicitacao.urgencia
    })) ?? [], [solicitacoesUser]
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (!value) {
      setFilteredRows(rows);
      return;
    }

    const normalized = (text: string | undefined) =>
      (text ?? '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    setFilteredRows(
      rows.filter((row) => {
        return (
          normalized(row.descricao).includes(normalized(value)) ||
          normalized(row.status).includes(normalized(value)) ||
          normalized(row.urgencia).includes(normalized(value)) ||
          row.id?.toString().includes(value)
        );
      })
    );
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      padding: '25px',
      borderRadius: '10px',
      backgroundColor: '#FCFCFC',
    },
  };

  return (
    <S.MainStyled>
      {rows && rows.length > 0 ? (
        <>
          <Paper sx={{ height: '100%', width: '100%', fontSize: 14, mt: 0 }}>
            <Searchbar value={searchTerm} onSearch={handleSearch} placeholder='Buscar por ID, item, status ou urgência...' />
            <DataGrid
              rows={filteredRows.length > 0 || searchTerm ? filteredRows : rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              autoHeight
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 3, page: 0 },
                },
              }}
              sx={{
                border: 0,
                '& .MuiDataGrid-cell': { textAlign: 'center'},
                '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' },
              }}
            />
          </Paper>
          <S.DivLayoutDash>
            <ModuloNSoliciDash solicitacoes={solicitacoesUser} />
            <ModuloNSoliciDash solicitacoes={solicitacoesUser} />
          </S.DivLayoutDash>
        </>
      ) : (
        <NoDataToShow mainText='Não foram feitas solicitações!' />
      )}

      {solicitacaoSelecionada && (
        <ReactModal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
          <S.MainWrapper>
            <S.ImageContent onClick={closeModal}>
              <S.Image src="../../src/assets/svg/Close.svg" />
            </S.ImageContent>
            <S.DivWrapper>
              <InputDisable text={solicitacaoSelecionada.dataSolicitacao?.toDateString()} title="Data de Abertura" type="text" />
              <InputDisable text={solicitacaoSelecionada.dataConclusao} title="Data de Conclusão" type="text" />
              <InputDisable text={solicitacaoSelecionada.status} title="Status" type="text" />
              <InputDisable text={solicitacaoSelecionada.id} title="ID da Solicitação" type="text" />
              <InputDisable text={String(solicitacaoSelecionada.solicitante)} title="Solicitante" type="text" />
              <InputDisable text={String(solicitacaoSelecionada.quantidade)} title="Quantidade" type="number" />
              <InputDisable text={solicitacaoSelecionada.descricao} title="Descrição do Item" type="text" />
              <InputDisable text={String(solicitacaoSelecionada.codigoEPI)} title="Código" type="text" />
              <SelectInput disable={true} text={solicitacaoSelecionada.urgencia ?? ''} title="Urgência" />
              <InputDisable text={getCAEPI(solicitacaoSelecionada.codigoEPI ?? 0)} title="Certificado de Aprovação" type="text" />
              <InputDisable text={getValidadeEPI(solicitacaoSelecionada.codigoEPI)} title="Data de Validade" type="text" />
            </S.DivWrapper>
          </S.MainWrapper>
        </ReactModal>
      )}
    </S.MainStyled>
  );
};