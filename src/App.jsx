import { useState } from 'react';
import QRCode from 'react-qr-code';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { FirestoreAuthProvider } from './context/FirestoreAuthContext';

const App = () => {
  // const testSet = {
  //   "name": "John Doe",
  //   "age": 25,
  //   "city": "New York"
  // }

  // const qrValue = JSON.stringify(testSet.name);
  // return (
  //   <section style={{ background: 'white', padding: '16px', display: 'flex', justifyContent: 'center'}}>
  //   <QRCode value={qrValue.replace(/"/g, '')}
  //   size={512}
  //    />
  //   </section>
  // )
  return (
    <FirestoreAuthProvider>
      <RouterProvider router={router} />
    </FirestoreAuthProvider>
  );
};

export default App;
