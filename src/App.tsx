import "./style/index.css";
import Navbar from "./layouts/Navbar";
import NSCimg from "../public/NSCimg.png";
import img2077 from "../public/2077.png";


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

      <div className="texto">  
        <p> 
            Em 2077, o Festival de Artes de São Cristóvão (FASC) completa 105 anos de celebração da cultura, da arte e da tradição. Ao longo de mais de um século, o FASC se consolidou como um dos maiores e mais importantes encontros artísticos do mundo, unindo gerações, estilos e manifestações culturais de todos os cantos do Brasil.
            <br /> <br /> Venha celebrar conosco 105 anos de arte e resistência. O FASC continua a ser o coração pulsante da cultura global.
        </p>
      </div>


      <div className="Img">
        <img src={NSCimg} alt="NSC" />
        <img src={img2077} alt="2077" />
      </div>


    </>
  );
}

export default App;
