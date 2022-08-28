import { createRoot, Root } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import { store, persistor } from './app/store';
import './styles/index.css';

const container: HTMLElement = document.getElementById('root') as HTMLElement;
const root: Root = createRoot(container);

root.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
