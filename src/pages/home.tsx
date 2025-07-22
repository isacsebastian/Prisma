
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../components/home/Loader";
import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import WeAre from "../components/home/WeAre";
import Services from "../components/home/Services";
import Carousel from "../components/home/Carousel";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Loader logic
    document.body.classList.add("loading");
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.classList.remove("loading");
      document.body.classList.add("loaded");
    }, 1200);
    return () => {
      clearTimeout(timer);
      document.body.classList.remove("loading");
      document.body.classList.remove("loaded");
    };
  }, []);

  useEffect(() => {
    // Animaciones de entrada (fade + translate)
    gsap.to(".portfolio-container", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".portfolio-container",
        start: "top 80%",
      },
    });
    gsap.to(".secciones_home", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".secciones_home",
        start: "top 90%",
      },
    });
    gsap.to(".weare", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".weare",
        start: "top 95%",
      },
    });
    gsap.to(".servicios", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".servicios",
        start: "top 95%",
      },
    });
    gsap.to(".carousel-preview", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".carousel-preview",
        start: "top 95%",
      },
    });

    // ===== Pin y scroll horizontal avanzado para servicios =====
    // Pin de la sección 'weare' (como el JS original)
    ScrollTrigger.create({
      trigger: ".weare",
      start: "top bottom",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
    });

    // Scroll horizontal para servicios (scrub, pin, largo)
    gsap.to(".servicios", {
      x: () => {
        const servicios = document.querySelector(".servicios");
        return servicios ? -(servicios.scrollWidth - window.innerWidth) : 0;
      },
      ease: "none",
      scrollTrigger: {
        trigger: ".secciones_home",
        pin: true,
        scrub: true,
        start: "bottom bottom",
        end: () => "+=3000",
      },
    });

    // Pin de 'scene-inner' durante el scroll horizontal (si existe)
    // Si tienes un id #scene-inner, activa el pin aquí
    if (document.getElementById("scene-inner")) {
      ScrollTrigger.create({
        trigger: ".secciones_home",
        start: "bottom bottom",
        end: "+=3000",
        pin: "#scene-inner",
      });
    }

    // ===== Timeline dinámico para iconos/textos (como el JS original) =====
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".secciones_home",
        start: "bottom bottom",
        end: "+=3000",
        scrub: true,
      },
    });
    // Fases: web, digital, brand
    timeline.to(".web_ico", { opacity: 1, duration: 1 }, 0);
    timeline.to(".web", { opacity: 1, y: 0, duration: 1 }, 0);
    timeline.to(".web_ico", { opacity: 0, duration: 1 }, 1);
    timeline.to(".web", { opacity: 0, y: -20, duration: 1 }, 1);
    timeline.to(".digital_ico", { opacity: 1, duration: 1 }, 2);
    timeline.to(".digital", { opacity: 1, y: 0, duration: 1 }, 2);
    timeline.to(".digital_ico", { opacity: 0, duration: 1 }, 3);
    timeline.to(".digital", { opacity: 0, y: -20, duration: 1 }, 3);
    timeline.to(".brand_ico", { opacity: 1, duration: 1 }, 4);
    timeline.to(".brand", { opacity: 1, y: 0, duration: 1 }, 4);

    // ===== Animaciones de entrada para el header =====
    gsap.to(".menu-wrapper", {
      duration: 1.25,
      x: 0,
      delay: 0.5,
    });
    gsap.to(".logo-wrapper", {
      duration: 1.25,
      x: 0,
      delay: 0.5,
    });

    // Limpieza de triggers al desmontar
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black min-h-screen w-full overflow-x-hidden relative">
      {/* Orange Circle background */}
      <img src="/Orange Circle.png" alt="Orange Circle" className="absolute top-0 right-0 w-[400px] opacity-40 pointer-events-none select-none z-0" style={{maxWidth: '40vw'}} />
      {loading && <Loader loading={true} />}
      <Header />
      <main>
        {/* Hero Section */}
        <div className="secciones_home" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <Hero />
        </div>
        {/* WeAre Section */}
        <div className="weare" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <WeAre />
        </div>
        {/* Services Section */}
        <Services />
        {/* Carousel Section */}
        <div className="carousel-preview" style={{ opacity: 0, transform: 'translateY(40px)' }}>
          <Carousel />
        </div>
      </main>
    </div>
  );
}

export default Home;
