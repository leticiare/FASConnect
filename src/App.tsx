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

      { /* Definindo a div das imagens e texto da Landing Page */ }
      <div className="min-h-screen flex flex-col mt-12 md:flex-row items-center md:items-start justify-between p-6 md:p-12">

        { /* Definindo a div que conterá as imagens */ }
        <div className="w-full md:w-1/2 justify-center md:justify-start p-5">
          { /* Primeira imagem */ }
          <div className="w-full flex justify-center mb-8">
            <img src={NSCimg} alt="NSC" className="w-2/3 md:w-2/3 z-10" />
          </div>
          
          { /* Segunda imagem */ }
          <div className="w-full flex justify-center">
            <img src={img2077} alt="2077" className="w-2/3 md:w-2/3" />
          </div>
        </div>

        { /* Container do texto da direita */ }
        <div className="w-full md:w-1/2 mt-12 md:mt-0 text-center md:text-left md:pl-22">
          <div className="fasc-text">
            <p className="text-lg md:text-xl text-neutral-500 leading-relaxed w-full md:w-8/12">
              Em 2077, o Festival de Artes de São Cristóvão (FASC) completa 105 anos de celebração da cultura, da arte e da tradição.
              Ao longo de mais de um século, o FASC se consolidou como um dos maiores e mais importantes encontros artísticos do mundo,
              unindo gerações, estilos e manifestações culturais de todos os cantos do Brasil.
              <br /> <br /> Venha celebrar conosco 105 anos de arte e resistência. O FASC continua a ser o coração pulsante da cultura global.
            </p>
          </div>

          { /* Div para construir o botão que direciona as outras informações contidas no site*/ }
          <div className="flex justify-center md:justify-start mt-8">
            <button
              className="py-3 px-16 rounded-3xl border border-white text-center text-lg text-white transition-all shadow-md cursor-pointer
              hover:shadow-lg active:bg-neutral-900 active:shadow-none"
              type="button">
              Conheça as atrações 
              <span className="ml-4 text-xl glow"> &gt; </span>
            </button>
          </div>

        </div>


      </div>


      

    </>
  );
}

export default App;
