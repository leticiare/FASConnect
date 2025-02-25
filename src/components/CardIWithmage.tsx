import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  ThemeProvider,
  IconButton,
} from "@mui/material";
import { Concert } from "../types/Concerts";
import darkTheme from "../style/theme";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { Star, StarBorder } from "@mui/icons-material";
import useFavorites from "../hooks/useFavorites"; // Hook para favoritar artistas
import { formatDateTime } from "../utils/dateUtils";

export interface CardWithImageProps {
  content: Concert;
}

function CardWithImage({ content }: CardWithImageProps) {
  const { favorites, toggleFavorite } = useFavorites(); // Hook para gerenciar favoritos

  return (
    <ThemeProvider theme={darkTheme}>
      <Card
        sx={{
          maxWidth: 345,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "rgba(150, 150, 150, 0.2)",
          backdropFilter: "blur(5px)",
          color: "text.primary",
          position: "relative",
        }}
      >
        {/* Imagem */}
        {content?.imgUrl && (
          <CardMedia
            component="img"
            sx={{
              height: 200,
              width: 500,
              objectFit: "cover",
            }}
            image={content.imgUrl}
            alt={content.name}
          />
        )}

        <CardContent>
          <div className="h-18 flex items-center justify-between">
            <Typography variant="h5" component="div">
              {content.name}
            </Typography>

            {/* Botão de Favoritar */}
            <IconButton onClick={() => toggleFavorite(content)}>
              {favorites.some((fav) => fav.name === content.name) ? (
                <Star color="warning" />
              ) : (
                <StarBorder />
              )}
            </IconButton>
          </div>

          {/* Descrição */}
          <Typography variant="body2" color="text.secondary">
            {content.description}
          </Typography>

          {/* Localização */}
          <div className="flex mt-4 gap-1">
            <LocationOnIcon />
            {content.location}
          </div>
          <div className="flex mt-4 gap-1">
            <DateRangeIcon />
            {formatDateTime(content.startDate)}
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default CardWithImage;
