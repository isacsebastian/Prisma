import React, { useRef, useState, useEffect } from "react";

type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "Nova Green",
    description: "Driving a Sustainable Future",
    image: "https://prismaecuador.com/wp-content/uploads/2025/02/Nova-Green-Behance-01.jpg",
    link: "https://prismaecuador.com/nova-green/",
  },
  {
    title: "Cable Hogar",
    description: "Staying connected IS NOT AN OPTION",
    image: "https://prismaecuador.com/wp-content/uploads/2025/02/Cable-hogar_Mesa-de-trabajo-1.jpg",
    link: "https://prismaecuador.com/cable-hogar",
  },
  {
    title: "Dezik",
    description: "The Future in Your Ideas",
    image: "https://prismaecuador.com/wp-content/uploads/2025/03/Dezik_Mesa-de-trabajo-1.jpg",
    link: "https://prismaecuador.com/dezik/",
  },
  {
    title: "Tumipamba",
    description: "TumiPamba by PauTi Rustic Cuisine",
    image: "https://prismaecuador.com/wp-content/uploads/2025/03/Behance_Mesa-de-trabajo-1.jpg",
    link: "https://prismaecuador.com/tumipamba",
  },
  {
    title: "Polis",
    description: "Shaping Leaders for the Future",
    image: "https://prismaecuador.com/wp-content/uploads/2025/03/Polis_Mesa-de-trabajo-1.jpg",
    link: "https://prismaecuador.com/polis/",
  },
  {
    title: "Thunder Contractor",
    description: "User Experience Redesign",
    image: "https://prismaecuador.com/wp-content/uploads/2025/05/thundercover.png",
    link: "https://prismaecuador.com/thunder-contractor/",
  },
  {
    title: "Agree",
    description: "Branding Redesign",
    image: "https://prismaecuador.com/wp-content/uploads/2025/05/agreecover.png",
    link: "/proyecto5",
  },
];

const Carousel = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const followButtonRef = useRef<HTMLButtonElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const slideCount = projects.length;

  // Función para mover el carrusel
  const moveToSlide = (targetIndex: number) => {
    let newIndex = targetIndex;
    const maxIndex = Math.max(0, slideCount - slidesToShow);
    if (newIndex < 0) newIndex = 0;
    if (newIndex > maxIndex) newIndex = maxIndex;
    setSlideIndex(newIndex);
    const track = trackRef.current;
    if (track) {
      const translateX = newIndex * 320; // ancho fijo por slide
      track.style.transform = `translateX(-${translateX}px)`;
    }
  };

  // Efecto de botón
  const addButtonPressEffect = (button: HTMLButtonElement | null) => {
    if (!button) return;
    button.classList.add('active');
    setTimeout(() => button.classList.remove('active'), 300);
  };

  // Responsive slidesToShow
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let slides = 3;
      if (windowWidth < 480) slides = 1;
      else if (windowWidth < 768) slides = 2;
      setSlidesToShow(slides);
      moveToSlide(slideIndex);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [slideIndex]);

  // Teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const carouselContainer = trackRef.current?.parentElement;
      if (!carouselContainer || (document.activeElement && !carouselContainer.contains(document.activeElement))) return;
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveToSlide(slideIndex - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveToSlide(slideIndex + 1);
          break;
        case 'Home':
          e.preventDefault();
          moveToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          moveToSlide(slideCount - slidesToShow);
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [slideIndex, slidesToShow, slideCount]);

  // Touch/swipe
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    const track = trackRef.current;
    if (!track) return;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      const deltaX = touchStartX - touchEndX;
      const deltaY = Math.abs(touchStartY - touchEndY);
      if (Math.abs(deltaX) > deltaY && Math.abs(deltaX) > 50) {
        if (deltaX > 0) moveToSlide(slideIndex + 1);
        else moveToSlide(slideIndex - 1);
      }
    };
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      track.removeEventListener('touchstart', handleTouchStart);
      track.removeEventListener('touchend', handleTouchEnd);
    };
  }, [slideIndex, slidesToShow]);

  // Auto-play
  useEffect(() => {
    const track = trackRef.current;
    const maxIndex = Math.max(0, slideCount - slidesToShow);
    const interval = setInterval(() => {
      const nextIndex = slideIndex >= maxIndex ? 0 : slideIndex + 1;
      moveToSlide(nextIndex);
    }, 5000);
    if (track) {
      track.addEventListener('mouseenter', () => clearInterval(interval));
      track.addEventListener('mouseleave', () => {
        setTimeout(() => {
          setInterval(() => {
            const nextIndex = slideIndex >= maxIndex ? 0 : slideIndex + 1;
            moveToSlide(nextIndex);
          }, 5000);
        }, 5000);
      });
    }
    return () => {
      clearInterval(interval);
      if (track) {
        track.removeEventListener('mouseenter', () => clearInterval(interval));
        track.removeEventListener('mouseleave', () => {});
      }
    };
  }, [slideIndex, slidesToShow, slideCount]);

  // Accesibilidad
  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.setAttribute('role', 'region');
      track.setAttribute('aria-label', 'Carrusel de proyectos');
      Array.from(track.children).forEach((slide, index) => {
        (slide as HTMLElement).setAttribute('role', 'group');
        (slide as HTMLElement).setAttribute('aria-label', `Slide ${index + 1} de ${slideCount}`);
      });
    }
  });

  // Botón seguir
  const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = followButtonRef.current;
    if (!button) return;
    const currentText = button.textContent?.trim();
    if (currentText === 'Siguiendo' || currentText === 'Following') {
      button.textContent = 'Seguir';
    } else {
      button.textContent = 'Siguiendo';
    }
    addButtonPressEffect(button);
  };

  return (
    <section className="carousel-preview">
      <div className="portfolio-container">
        {/* Encabezado perfil */}
        <div className="profile-container">
          <div className="profile-image">
            <img src="https://prismaecuador.com/wp-content/uploads/2025/03/Prisma.png" alt="Prisma Logo" />
          </div>
          <div className="profile-info">
            <h2>Nuestros Proyectos</h2>
          </div>
        </div>
        {/* Carrusel */}
        <div className="carousel-container">
          <button
            className="carousel-button prev-button"
            ref={prevButtonRef}
            onClick={(e) => {
              e.preventDefault();
              moveToSlide(slideIndex - 1);
              addButtonPressEffect(prevButtonRef.current);
            }}
            aria-label="Anterior"
          >&#10094;</button>
          <div
            className="carousel-track"
            ref={trackRef}
            tabIndex={0}
            style={{ minWidth: `${slidesToShow * 320}px`, outline: 'none' }}
          >
            {projects.map((project, idx) => (
              <a
                key={project.title + idx}
                href={project.link}
                className="carousel-slide"
                aria-label={project.title}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
              >
                <img src={project.image} alt={project.title} />
                <div className="slide-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </a>
            ))}
          </div>
          <button
            className="carousel-button next-button"
            ref={nextButtonRef}
            onClick={(e) => {
              e.preventDefault();
              moveToSlide(slideIndex + 1);
              addButtonPressEffect(nextButtonRef.current);
            }}
            aria-label="Siguiente"
          >&#10095;</button>
          <button
            className="follow-button"
            ref={followButtonRef}
            onClick={handleFollowClick}
          >Seguir</button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;