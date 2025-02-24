import { useNavigate } from "react-router-dom";
interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}
const NavLink = ({ to, children }: NavLinkProps) => {
  const navigate = useNavigate();
  return (
    <a
      onClick={() => navigate(to)}
      className="relative group text-cyan-50 hover:text-white cursor-pointer text-xl"
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
};

export default NavLink;
