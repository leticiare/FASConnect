import "./style/index.css";
import Navbar from "./layouts/Navbar";

import { AppRoutes } from "./routes/routes";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <AppRoutes />
      </div>
      <footer>Todos os direitos reservados.</footer>
    </>
  );
}

export default App;
