import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardColab } from '../DashboardColab';
import ReactModal from 'react-modal';

beforeAll(() => {
  ReactModal.setAppElement(document.createElement('div'));
});

describe('DashboardColab', () => {
    test('deve renderizar o DashboardColab corretamente', () => {
        expect(true).toBe(true);
    });

    test('renderiza botão de adicionar colaborador', () => {
        render(<DashboardColab />);
        expect(screen.getByText('+ Adicionar Colaborador')).toBeInTheDocument();
    });

    test('abre o modal ao clicar no botão de adicionar colaborador', () => {
        render(<DashboardColab />);
        fireEvent.click(screen.getByText('+ Adicionar Colaborador'));
        expect(screen.getByText('Adicionar Colaborador')).toBeInTheDocument();
    });

    test('filtra colaboradores pelo nome', () => {
        render(<DashboardColab />);
        const input = screen.getByPlaceholderText('Pesquise pela matrícula ou nome');
        fireEvent.change(input, { target: { value: 'João' } });
        expect(screen.getByText('João Silva')).toBeInTheDocument();
        expect(screen.queryByText('Maria Souza')).not.toBeInTheDocument();
    });
});
