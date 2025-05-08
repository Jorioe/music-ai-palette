import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ScrollToTop component zorgt ervoor dat elke pagina automatisch naar boven scrollt na navigatie
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

export default ScrollToTop; 