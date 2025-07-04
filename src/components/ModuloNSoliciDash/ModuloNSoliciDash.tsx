import { BarChart } from '@mui/x-charts';
import * as S from './ModuloNSoliciDash.styles';
import { SolicitacaoProps } from '../../props/solicitacao.props';

interface ModuloNSoliciDashProps {
  solicitacoes: SolicitacaoProps[] | undefined;
}

export const ModuloNSoliciDash = ({ solicitacoes }: ModuloNSoliciDashProps) => {
  function contarSolicitacoes() {
    let pendentes = 0;
    let aprovadas = 0;
    let recusadas = 0;
    let entregues = 0;

    solicitacoes?.forEach((s) => {
      const status = s.status.toLowerCase();
      if (status === 'pendente') {
        pendentes += 1;
      } else if (status === 'aprovada') {
        aprovadas += 1;
      } else if (status === 'recusada') {
        recusadas += 1;
      } else if (status === 'entregue') {
        entregues += 1;
      }
    });

    return { pendentes, aprovadas, recusadas, entregues };
  }

  const { pendentes, aprovadas, recusadas, entregues } = contarSolicitacoes();

  const dataset = [
    {
      status: 'Solicitações',
      pendentes,
      aprovadas,
      recusadas,
      entregues
    },
  ];

  function valueFormatter(value: number | null) {
    return `${value}`;
  }

  const chartSetting = {
    height: 200,
  };

  return (
    <S.BoxStyled>
      <S.TituloBox>N° e Status de Solicitações</S.TituloBox>
      <S.LinhaStyled />
      <BarChart
        dataset={dataset}
        xAxis={[{ dataKey: 'status', scaleType: 'band' }]}
        series={[
          { dataKey: 'pendentes', label: 'Pendentes', valueFormatter },
          { dataKey: 'aprovadas', label: 'Aprovadas', valueFormatter },
          { dataKey: 'recusadas', label: 'Recusadas', valueFormatter },
          { dataKey: 'entregues', label: 'Entregues', valueFormatter },
        ]}
        {...chartSetting}
      />
    </S.BoxStyled>
  );
};
