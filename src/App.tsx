import "./style/index.css";
import Navbar from "./layouts/Navbar/index";

import { AppRoutes } from "./routes/routes";
import ParallaxText from "./components/Text";

function App() {
  return (
    <div className="bg-[url(../assets/fundo.jpg)] bg-no-repeat bg-fixed bg-cover bg-center ">
      <Navbar />

      <div>
        <AppRoutes />
      </div>
      <footer>
        <ParallaxText baseVelocity={2}>arte resistência tradição</ParallaxText>
        <div></div>
      </footer>
    </div>
  );
}

export default App;
