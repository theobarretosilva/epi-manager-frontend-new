import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from './lib/tanstack-query.ts'
import 'react-toastify/dist/ReactToastify.css' ;

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClientInstance}>
    <App />
    <ToastContainer position='top-right' />
  </QueryClientProvider>
)
