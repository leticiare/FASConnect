import { Link } from "react-router-dom";
import NSCimg from "../../public/NSCimg.png";
import img2077 from "../../public/2077.png";

export const LandingPage = () => {
  return (
    <>
      <div className=" bg-[url(../../wallpaper.jpg)] flex flex-col md:flex-row items-center md:items-start justify-between p-6 md:p-12 mt-12 gap-3">
        {/* Definindo a div que conterá as imagens */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start mt-4">
          {/* Primeira imagem */}
          <div className="w-full flex justify-center">
            <img src={NSCimg} alt="NSC" className="max-w-3/4 h-auto md:w-2/3" />
          </div>

          {/* Segunda imagem */}
          <div className="w-full flex justify-center mt-3">
            <img
              src={img2077}
              alt="2077"
              className="max-w-5/8 h-auto md:w-2/3 shadow-xl shadow-neutral-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-400/50"
            />
          </div>
        </div>

        {/* Container do texto */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left">
          <p className="text-lg md:text-xl text-neutral-500 leading-relaxed w-full md:w-8/12">
            Em 2077, o Festival de Artes de São Cristóvão (FASC) completa 105
            anos de celebração da cultura, da arte e da tradição. Ao longo de
            mais de um século, o FASC se consolidou como um dos maiores e mais
            importantes encontros artísticos do mundo, unindo gerações, estilos
            e manifestações culturais de todos os cantos do Brasil.
            <br /> <br /> Venha celebrar conosco 105 anos de arte e resistência.
            O FASC continua a ser o coração pulsante da cultura global.
          </p>

          {/* Botão centralizado no mobile e abaixo do texto na Landing Page */}
          <div className="flex justify-center items-center  mt-12 w-full">
            <Link to="/shows">
              {" "}
              {/* Redireciona para a rota dos shows */}
              <button
                className="py-3 px-11 rounded-3xl border border-white text-center text-lg text-white transition delay-100 duration-300 ease-in-out hover:-translate-y-1
                   hover:scale-110 hover:shadow-lg active:bg-neutral-900 active:opacity-80 active:shadow-none shadow-neutral-700 font-medium cursor-pointer"
                type="button"
              >
                Conheça as atrações
                <span className="ml-2 text-xl glow animate-pulse"> &gt; </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
