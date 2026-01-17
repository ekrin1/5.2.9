import App from './App.tsx'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import { theme } from './theme.ts';
import { MantineProvider } from "@mantine/core";

import { store } from "./store/store";
import { Provider } from "react-redux";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <MantineProvider theme={theme}>
            <App />
        </MantineProvider>
      </Provider>
    </StrictMode>
)
