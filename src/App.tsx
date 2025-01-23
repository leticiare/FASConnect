import "./App.css";

import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <>
      <header>
        <h1>FASConnect</h1>
      </header>
      <div>
        <AppRoutes />
      </div>
      <footer>Todos os direitos reservados.</footer>
    </>
  );
}

export default App;
