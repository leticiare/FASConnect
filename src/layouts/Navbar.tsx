import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  return (
    <>
      <div className="bg-primary w-full h-16 flex items-center p-2 justify-around">
        <h1 className="text-white font-primary text-4xl">FASConnect</h1>
        <NavbarLinks />
      </div>
    </>
  );
}
