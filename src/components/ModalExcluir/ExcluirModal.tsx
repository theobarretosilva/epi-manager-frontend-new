import { ExcluirProps } from "./ExcluirModal.styles";
import * as S from "./ExcluirModal.styles"
import { useDeleteColaborador } from "../../hooks/useDeleteColaborador";
import { useDeleteEPI } from "../../hooks/useDeleteEPI";

export const ExcluirModal: React.FC<ExcluirProps> = ({ Id, setModalIsOpen, tipo }) => {
  const { deleteColaboradorMutation } = useDeleteColaborador();
  const { deleteEPIMutation } = useDeleteEPI();

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleDelete = () => {
    if ( tipo == "colaborador") {
      deleteColaboradorMutation.mutate(Id)
    } else {
      deleteEPIMutation.mutate(Id)
    }
    setModalIsOpen(false); 
  };

  return (
      <S.DivContainer>
        <S.TituloBox>Você deseja excluir esse {tipo}?</S.TituloBox>
        <S.SubtituloBox>Ao realizar essa operação não é possível reverter a ação ou recuperar os dados deletados.</S.SubtituloBox>
        <S.DivButton>
          <S.ButtonDelete onClick={handleDelete}>Deletar</S.ButtonDelete>
          <S.ButtonCancel onClick={handleClose} >Cancelar</S.ButtonCancel>
        </S.DivButton>
      </S.DivContainer>
  );
};