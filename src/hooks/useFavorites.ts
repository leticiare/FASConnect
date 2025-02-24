import { useState, useEffect } from "react";
import { Concert } from "../types/Concerts";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Concert[]>([]);

  // Carregar os favoritos do Local Storage ao iniciar
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteArtists");
    if (storedFavorites) {
      const parsedFavorites: Concert[] = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
    }
  }, []);

  // Atualizar o Local Storage quando os favoritos mudam
  useEffect(() => {
    if (favorites.length > 0) {
      // Verificar se a lista de favoritos tem algo antes de salvar no Local Storage
      localStorage.setItem("favoriteArtists", JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = (artist: Concert) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.name === artist.name);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.name !== artist.name);
      } else {
        return [...prevFavorites, artist];
      }
    });
  };

  return { favorites, toggleFavorite };
};

export default useFavorites;
