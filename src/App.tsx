import "./style/index.css";
import Navbar from "./layouts/Navbar/index";

import { AppRoutes } from "./routes/routes";

import Footer from "./layouts/Footer";

function App() {
  return (
    <div className="bg-[url(../assets/fundo.jpg)] bg-no-repeat bg-fixed bg-cover bg-center h-screen flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
