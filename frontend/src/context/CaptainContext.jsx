import { createContext, useState, useEffect } from "react";

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(() => {
    // Load from localStorage on first render
    const saved = localStorage.getItem("captain");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData);
    localStorage.setItem("captain", JSON.stringify(captainData));
  };

  // Optional: keep captain updated in localStorage
  useEffect(() => {
    if (captain) {
      localStorage.setItem("captain", JSON.stringify(captain));
    }
  }, [captain]);

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };
console.log("captain context", captain);


  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;