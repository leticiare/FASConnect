import { useNavigate } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-primary w-full h-16 flex items-center p-2 justify-around">
        <h1
          onClick={() => navigate("/")}
          className="text-white font-primary text-4xl cursor-pointer"
        >
          FASConnect
        </h1>
        <NavbarLinks />
      </div>
    </>
  );
}
