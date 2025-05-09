import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Login';
import '@testing-library/jest-dom';

const mockedNavigate = jest.fn();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockedNavigate,
}));

beforeAll(() => {
    global.crypto = {
      subtle: {
        digest: jest.fn(async () => {
          const mockHash = new Uint8Array(32).fill(1);
          return mockHash.buffer;
        }),
      },
      getRandomValues: (arr: any) => arr,
    } as unknown as Crypto;
});

describe('Login page', () => {
  const salt = '01010101010101010101010101010101';
  const fakePassword = 'senha123';

  const generateFakeHash = async () => {
    const encoder = new TextEncoder();
    const combined = new Uint8Array([
      ...encoder.encode(fakePassword),
      ...new Uint8Array(salt.match(/.{1,2}/g)!.map(b => parseInt(b, 16))),
    ]);
    const buffer = await crypto.subtle.digest('SHA-256', combined);
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  beforeEach(async () => {
    const hash = await generateFakeHash();

    sessionStorage.setItem('TipoAcesso', 'Administrador');
    sessionStorage.setItem(
      'ColaboradoresCadastrados',
      JSON.stringify([
        {
          matricula: '123',
          salt,
          hash,
          cargo: 'Administrador',
          nome: 'João',
        },
      ])
    );
  });

  it('realiza login com sucesso e redireciona', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Matrícula/i), {
      target: { value: '123' },
    });

    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: fakePassword },
    });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/administrador/solicitacoes');
    });
  });

  it('exibe erro ao digitar matrícula inválida', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Matrícula/i), {
      target: { value: '000' },
    });

    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: 'qualquer' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Usuário não encontrado/i)).toBeInTheDocument();
    });
  });
});
