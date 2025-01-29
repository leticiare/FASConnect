import ParallaxText from "../../components/Text";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <footer className="w-full py-4 bg-[url(../assets/footer_sem_texto.png)]  bg-no-repeat bg-fixed bg-cover bg-center  text-white flex flex-col items-center justify-center">
      <ParallaxText baseVelocity={2}>arte resistência tradição</ParallaxText>

      <div className="mt-8 flex items-center gap-2 group">
        <a
          href="https://github.com/leticiare/FASConnect"
          target="_blank"
          className="flex items-center gap-2 text-white hover:text-gray-300 transition"
        >
          <GitHubIcon fontSize="small" />
          <span>Projeto no GitHub</span>
        </a>

        <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
      </div>
    </footer>
  );
}
