// App.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routesConfig from "./Routes.js";

function App() {
  const router = createBrowserRouter(routesConfig);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
