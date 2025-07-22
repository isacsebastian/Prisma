import "../../styles/global.css";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="secciones_home">
      <div className="texto_hero">
        <svg xmlns="http://www.w3.org/2000/svg" width="765" height="223" viewBox="0 0 765 223" fill="none">
          {/* ...SVG paths aquí, puedes copiar el SVG completo de tu HTML original... */}
          <path d="M0 60.3376V3.75045H20.7797V58.7481C20.7797 78.813 28.7148 88.9214 44.0139 88.9214C59.3131 88.9214 67.3911 78.813 67.3911 58.7481V3.75045H88.3135V60.3376C88.3135 90.3591 72.3003 106.959 44.1568 106.959C16.0132 106.959 0 90.3591 0 60.3376Z" fill="white" />
          {/* ...agrega el resto de los <path> aquí... */}
        </svg>
      </div>
    </section>
  );
};

export default Hero;