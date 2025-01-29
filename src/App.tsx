import "./style/index.css";
import Navbar from "./layouts/Navbar/index";

import { AppRoutes } from "./routes/routes";

import Footer from "./layouts/Footer";

function App() {
  return (
    <div className="bg-[url(../assets/fundo.jpg)] bg-no-repeat bg-fixed bg-cover bg-center ">
      <Navbar />

      <div>
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
