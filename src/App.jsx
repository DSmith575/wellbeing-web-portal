import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { FirestoreAuthProvider } from "./context/FirestoreAuthContext";

const App = () => {
  return (
    <FirestoreAuthProvider>
      <RouterProvider router={router} />
    </FirestoreAuthProvider>
  );
};

export default App;
