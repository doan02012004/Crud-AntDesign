import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StyleProvider } from '@ant-design/cssinjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
 <Provider store={store}>
   <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <StyleProvider layer>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </StyleProvider>
    </BrowserRouter>
  </QueryClientProvider>
 </Provider>
)
