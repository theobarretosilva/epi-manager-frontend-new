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
  const contarPorCargo = (colaboradores: ColaboradorProps[] = []): PieChartData[] => {
    const contagem: Record<string, number> = {};

    colaboradores.forEach(({ cargo }) => {
      contagem[cargo] = (contagem[cargo] ?? 0) + 1;
    });

    return Object.entries(contagem).map(([cargo, count], index) => ({
      id: index,
      value: count,
      label: cargo,
    }));
  };

  const dadosGrafico = contarPorCargo(colaboradores);

  return (
    <S.BoxStyled>
      <S.TituloBox>Distribuição por cargo</S.TituloBox>
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