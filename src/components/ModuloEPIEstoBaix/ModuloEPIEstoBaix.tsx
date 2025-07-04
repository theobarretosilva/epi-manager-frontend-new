import { DataGrid, GridColDef } from '@mui/x-data-grid';
import * as S from './ModuloEPIEstoBaix.styles';
import { useGetEPIS } from '../../hooks/useGetEPIS';
import { EPIProps } from '../../props/episProps';

export const ModuloEPIEstoBaix = () => {
  const { epis } = useGetEPIS();

  const columns: GridColDef[] = [
    { field: 'codigo', headerName: 'Código', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'descricaoItem', headerName: 'Descrição do Item', width: 230, align: 'center', headerAlign: 'center' },
    { field: 'quantidadeAtual', headerName: 'Qtd Atual', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'quantidadeMinima', headerName: 'Qtd Mínima', width: 100, align: 'center', headerAlign: 'center' },
  ];

  const rows = epis?.filter((epi: EPIProps) => epi.qtd <= 20)
    .map((epi: EPIProps) => ({
      id: epi.codigo,
      codigo: epi.codigo,
      descricaoItem: epi.descricao,
      quantidadeAtual: epi.qtd,
      quantidadeMinima: 20
    }));

  return (
    <S.BoxStyled>
      <S.TituloBox>EPI's com Estoque Baixo</S.TituloBox>
      <S.LinhaStyled />
      {rows?.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '1rem', fontStyle: 'italic' }}>
          Nenhum EPI com estoque baixo.
        </p>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { pageSize: 3, page: 0 },
            },
          }}
          pageSizeOptions={[3, 5, 10]}
          sx={{
            border: 0,
            '& .MuiDataGrid-cell': { textAlign: 'center' },
            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' },
          }}
        />
      )}
    </S.BoxStyled>
  );
};
