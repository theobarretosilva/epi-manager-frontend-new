import { PieChart } from '@mui/x-charts';
import * as S from './ModuloColabSetDash.styles';
import { ColaboradorProps } from '../../props/colaboradorProps';
import { useGetColaboradores } from '../../hooks/useGetColaboradores';

interface PieChartData {
  id: number;
  value: number;
  label: string;
}

export const ModuloColabSetDash = () => {
  const { colaboradores } = useGetColaboradores();
  const contarPorPerm = (colaboradores: ColaboradorProps[] = []): PieChartData[] => {
    const contagem: Record<string, number> = {};

    colaboradores.forEach(({ permissao }) => {
      contagem[permissao] = (contagem[permissao] ?? 0) + 1;
    });

    return Object.entries(contagem).map(([permissao, count], index) => ({
      id: index,
      value: count,
      label: permissao,
    }));
  };

  const colaboradoresAtivos = (colaboradores ?? []).filter(
    (colab) => colab.status_uso?.toUpperCase() === 'ATIVO'
  );

  const dadosGrafico = contarPorPerm(colaboradoresAtivos);

  return (
    <S.BoxStyled>
      <S.TituloBox>Distribuição por permissão</S.TituloBox>
      <S.LinhaStyled />
      <PieChart
        series={[
          {
            data: dadosGrafico,
          },
        ]}
        width={200}
        height={200}
      />
    </S.BoxStyled>
  );
};