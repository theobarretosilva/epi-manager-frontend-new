import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Login } from '../Login';
import '@testing-library/jest-dom';

jest.spyOn(console, 'warn').mockImplementation(() => {});
jest.spyOn(api, 'post').mockResolvedValue({
  data: { token: 'fake-token' },
});

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

beforeAll(() => {
  Object.defineProperty(global, 'crypto', {
    value: {
      subtle: {
        digest: jest.fn(async () => {
          const mockHash = new Uint8Array(32).fill(1);  // Gerando hash mockado
          return mockHash.buffer;
        }),
      },
      getRandomValues: (arr: any) => arr,
    },
  });
});

describe('Login page', () => {
  const salt = '01010101010101010101010101010101';
  const fakePassword = 'senha123';

  const generateFakeHash = async () => {
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(fakePassword);
    const saltBytes = new Uint8Array(salt.match(/.{1,2}/g)!.map(b => parseInt(b, 16)));

    const combined = new Uint8Array([...passwordBytes, ...saltBytes]);
    const hashBuffer = await crypto.subtle.digest('SHA-256', combined);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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
    const mockedNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockedNavigate);

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

    // Aguarda a navegação
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/administrador/solicitacoes');
    });
  });

  it('exibe erro ao digitar senha incorreta', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Matrícula/i), {
      target: { value: '123' },
    });

    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: 'senhaErrada' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await screen.findByText((content) => content.includes('Senha incorreta'));
  });

  it('exibe erro ao digitar matrícula inválida', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Preenche os campos com dados inválidos
    fireEvent.change(screen.getByLabelText(/Matrícula/i), {
      target: { value: '000' },
    });

    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: 'qualquer' },
    });

    // Clica no botão de login
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    // Verifica se a mensagem de erro foi exibida
    await waitFor(() => {
      expect(screen.getByText(/Usuário não encontrado/i)).toBeInTheDocument();
    });
  });

  it('exibe erro ao digitar senha incorreta', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Preenche os campos com matrícula válida, mas senha errada
    fireEvent.change(screen.getByLabelText(/Matrícula/i), {
      target: { value: '123' },
    });

    fireEvent.change(screen.getByLabelText(/Senha/i), {
      target: { value: 'senhaErrada' },
    });

    // Clica no botão de login
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    // Verifica se a mensagem de erro foi exibida
    await waitFor(() => {
      expect(screen.getByText(/Senha incorreta/i)).toBeInTheDocument();
    });
  });
});
