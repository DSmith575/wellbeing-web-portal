import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { FirestoreAuthProvider } from './context/FirestoreAuthContext';
import QRCode from './components/qrCode/QrCode';

const App = () => {
  return (
    <FirestoreAuthProvider>
      <RouterProvider router={router} />
      <QRCode />
    </FirestoreAuthProvider>
  );
};

export default App;
