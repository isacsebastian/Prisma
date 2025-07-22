import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const menuLinks = [
  { label: "About", href: "#home", aria: "Home" },
  { label: "Services", href: "#services", aria: "Services" },
  { label: "Projects", href: "#portfolios", aria: "Portfolios" },
  { label: "Contact", href: "#contact", aria: "Contact" },
];


const LogoSVG = React.lazy(() =>
  Promise.resolve({
    default: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="53" viewBox="0 0 34 53" fill="none">
        <path d="M33.53 8.89C32.46 3.81 27.95 0 22.56 0C22.35 0 21.69 0.03 21.69 0.03C9.66 0.83 0.13 10.77 0 22.97C0 22.97 0 24.07 0.03 24.49C0.09 26.38 0.22 28.26 0.44 30.11C1.33 37.9 3.57 45.27 6.91 52C7.13 52.44 7.57 52.71 8.06 52.71H9.89C10.61 52.71 11.17 52.12 11.17 51.41C11.17 48.74 11.61 46.19 12.42 43.81C14.24 38.44 17.95 33.96 22.75 31.16C22.9 31.08 23.04 31 23.18 30.92C29.54 27.22 33.82 20.33 33.82 12.43C33.82 11.76 33.74 9.9 33.53 8.89ZM20.11 23.73L19.43 24.12C15.57 26.37 12.27 29.42 9.72 33.02C6.17 15.38 12.61 9.33 18.54 8.17C18.54 8.17 19.48 8.01 20 8C23.53 7.92 26.4 10.86 26.4 14.4C26.4 18.86 22.85 22.1 20.12 23.74L20.11 23.73Z" fill="#EE3F00" />
      </svg>
    ),
  })
);

const MenuLinks = React.memo(({ open }: { open: boolean }) => (
  <>
    {menuLinks.map((link) => (
      <a
        key={link.label}
        href={link.href}
        aria-label={link.aria}
        className="menu-child"
        style={open ? { opacity: 1, width: '100%' } : {}}
      >
        {link.label}
      </a>
    ))}
  </>
));

const Header = React.memo(() => {
  const menuRef = useRef(null);
  const logoRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.to(menuRef.current, { x: 0, duration: 1.25, delay: 0.5 });
    gsap.to(logoRef.current, { x: 0, duration: 1.25, delay: 0.5 });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        gsap.to(menuRef.current, { y: -30, opacity: 0.7, duration: 0.5 });
        gsap.to(logoRef.current, { y: -30, opacity: 0.7, duration: 0.5 });
      } else {
        gsap.to(menuRef.current, { y: 0, opacity: 1, duration: 0.5 });
        gsap.to(logoRef.current, { y: 0, opacity: 1, duration: 0.5 });
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Overlay y menú móvil accesible
    let overlay = document.querySelector('.menu-overlay') as HTMLDivElement | null;
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);
    }
    function isMobile() { return window.innerWidth <= 768; }
    function closeMenu() {
      setMenuOpen(false);
      overlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
    function openMenu() {
      setMenuOpen(true);
      overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    overlay.onclick = () => { if (menuOpen) closeMenu(); };
    const handleResize = () => { if (!isMobile() && menuOpen) closeMenu(); };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('resize', handleResize);
      overlay && (overlay.onclick = null);
    };
  }, [menuOpen]);

  const handleMenuToggle = (e?: React.MouseEvent) => {
    if (window.innerWidth <= 768 && e) {
      e.preventDefault();
      setMenuOpen(open => !open);
    } else if (!e) {
      setMenuOpen(open => !open);
    }
  };

  return (
    <header>
      <div ref={logoRef} className="logo-wrapper">
        <React.Suspense fallback={null}>
          <LogoSVG />
        </React.Suspense>
        <div className="logo-wrapper-pseudo" />
      </div>
      <nav ref={menuRef} className={`menu-wrapper${menuOpen ? " open" : ""}`}>
        <button
          className="menu-toggle menu-title"
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          <span></span>
          Menu
        </button>
        <MenuLinks open={menuOpen} />
        <div className="menu-wrapper-pseudo" />
      </nav>
    </header>
  );
});

export default Header;
