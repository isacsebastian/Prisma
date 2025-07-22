import React, { useEffect, useRef } from "react";

type LoaderProps = {
  loading?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ loading = true }) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Aquí puedes agregar animaciones GSAP si lo deseas
    // Ejemplo: import { gsap } from "gsap"; gsap.to(loaderRef.current, { rotate: 360, repeat: -1, duration: 1, ease: "linear" });
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader" />
    </div>
  );
};

export default Loader;
