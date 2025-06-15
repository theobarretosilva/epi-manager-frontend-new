import { EPIProps } from '../../props/episProps';
import { SolicitacaoProps } from '../../props/solicitacao.props';
import * as S from './ModuloEPIVencProx.styles'
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export const ModuloEPIVencProx = () => {
  const solicitacoes: SolicitacaoProps[] = JSON.parse(sessionStorage.getItem('Solicitacoes') || '[]');
  const EPIsCadastrados = JSON.parse(sessionStorage.getItem('EPIsCadastrados') || '[]');

  const getValidadeEPI = (cod: number) => {
    const epi = EPIsCadastrados.find((epi: EPIProps) => epi.codigo === cod);
    return epi ? epi.validade : 'N/A';
  };

  const isValidadeProxima = (validadeStr: string) => {
    const hoje = new Date();
    const validade = new Date(validadeStr);
    const dias30 = new Date();
    dias30.setDate(hoje.getDate() + 30);
    return validade >= hoje && validade <= dias30;
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Código', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'descricaoItem', headerName: 'Descrição do Item', width: 230, align: 'center', headerAlign: 'center' },
    { field: 'validadeEPI', headerName: 'Validade EPI', width: 130, align: 'center', headerAlign: 'center' },
  ];

  const rows = solicitacoes
    .map((solicitacao: SolicitacaoProps) => {
      const validade = getValidadeEPI(solicitacao.codigo);
      return {
        id: solicitacao.id,
        descricaoItem: solicitacao.equipamento.descricao,
        validadeEPI: validade,
      };
    })
    .filter((row) => row.validadeEPI !== 'N/A' && isValidadeProxima(row.validadeEPI));

  if (rows.length === 0) {
    return (
      <S.BoxStyled>
        <S.TituloBox>EPI's com vencimento próximo</S.TituloBox>
        <S.LinhaStyled />
        <p style={{ textAlign: 'center', padding: '1rem', fontStyle: 'italic' }}>
          Nenhum EPI com vencimento nos próximos 30 dias.
        </p>
      </S.BoxStyled>
    );
  }

  return (
    <S.BoxStyled>
      <S.TituloBox>EPI's com vencimento próximo</S.TituloBox>
      <S.LinhaStyled />
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: { pageSize: 2, page: 0 },
          },
        }}
        sx={{
          border: 0,
          '& .MuiDataGrid-cell': { textAlign: 'center' },
          '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' },
        }}
      />
    </S.BoxStyled>
  );
};
