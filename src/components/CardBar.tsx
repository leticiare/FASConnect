import { Card, Typography, IconButton, Avatar } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import useFavorites from "../hooks/useFavorites"; // Importa o hook de favoritos
import { Concert } from "../types/Concerts";

interface CardProps {
  concert: Concert;
}

export default function CardBar({ concert }: CardProps) {
  const { favorites, toggleFavorite } = useFavorites(); // Hook para gerenciar favoritos

  return (
    <Card
      sx={{
        width: "full",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 1,
        boxShadow: 3,
      }}
    >
      <Avatar
        src={concert.imgUrl}
        alt={concert.name}
        sx={{ width: 50, height: 50, marginRight: 2 }}
      />

      <Typography variant="h6">{concert.name}</Typography>

      <IconButton onClick={() => toggleFavorite(concert)}>
        {favorites.some((fav) => fav.name === concert.name) ? (
          <Star color="warning" />
        ) : (
          <StarBorder />
        )}
      </IconButton>
    </Card>
  );
}
