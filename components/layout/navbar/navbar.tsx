import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";

export default async function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <NavbarMobile />
        <NavbarDesktop />
      </div>
    </header>
  );
}
