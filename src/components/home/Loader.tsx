import React, { useEffect, useRef } from "react";

type LoaderProps = {
  loading?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ loading = true }) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && loaderRef.current) {
      loaderRef.current.style.opacity = "0";
      setTimeout(() => {
        if (loaderRef.current) loaderRef.current.style.display = "none";
      }, 500);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <div id="loader-container" className="loader-container" ref={loaderRef}>
      <div className="loader" />
    </div>
  );
};

export default Loader;
