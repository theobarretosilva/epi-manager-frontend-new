import { BarChart } from '@mui/x-charts';
import * as S from './ModuloNSoliciDash.styles';

type Solicitacao = {
  id: string;
  solicitante: string;
  status: string;
  descricaoItem: string;
  codigoEPI: string;
  prioridade: string;
};

type Props = {
  solicitacoes: Solicitacao[];
};

export const ModuloNSoliciDash = ({ solicitacoes }: Props) => {
  function contarSolicitacoes() {
    let pendentes = 0;
    let aprovadas = 0;
    let recusadas = 0;

    solicitacoes.forEach((s) => {
      const status = s.status.toLowerCase();
      if (status === 'pendente') {
        pendentes += 1;
      } else if (status === 'aprovada') {
        aprovadas += 1;
      } else if (status === 'recusada') {
        recusadas += 1;
      }
    });

    return { pendentes, aprovadas, recusadas };
  }

  const { pendentes, aprovadas, recusadas } = contarSolicitacoes();

  const dataset = [
    {
      status: 'Solicitações',
      pendentes,
      aprovadas,
      recusadas
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
        ]}
        {...chartSetting}
      />
    </S.BoxStyled>
  );
};
