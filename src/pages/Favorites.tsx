import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import useFavorites from "../hooks/useFavorites";
import html2canvas from "html2canvas";
import { Concert } from "../types/Concerts";

const sortByDate = (a: any, b: any) =>
  new Date(a.startDate).getTime() - new Date(b.startDate).getTime();

const groupByStage = (favorites: Concert[]) => {
  return favorites.reduce((acc, artist) => {
    if (!acc[artist.location]) {
      acc[artist.location] = [];
    }
    acc[artist.location].push(artist);
    return acc;
  }, {} as Record<string, any[]>);
};

const FavoriteArtists = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const captureRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  // Ordenar favoritos por data
  const sortedFavorites = [...favorites].sort(sortByDate);
  // Agrupar por palco
  const groupedFavorites = groupByStage(sortedFavorites);

  // Função para gerar a imagem
  const saveAsImage = () => {
    setIsSaving(true);
    setTimeout(() => {
      if (captureRef.current) {
        html2canvas(captureRef.current, {
          backgroundColor: "#FFFF",
        }).then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "favoritos.png";
          link.click();
          setIsSaving(false);
        });
      }
    }, 500);
  };

  return (
    <div className="p-4">
      <div className="w-4/5 m-auto text-center my-8">
        <h1 className="text-white font-primary text-4xl">Minha programação</h1>
        <p className="text-white text-xl">
          Abaixo, confira a lista dos shows que você favoritou para o FASC 2077!
          Veja os artistas, locais e datas rapidamente e compartilhe com seus
          amigos!
        </p>
      </div>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 500,
          margin: "auto",
        }}
      >
        <CardContent ref={captureRef}>
          <Typography variant="h6" fontWeight="bold">
            🎶 Meus shows favoritos
          </Typography>

          {favorites.length > 0 ? (
            Object.entries(groupedFavorites).map(([stage, artists], index) => (
              <div key={index}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mt: 2, color: "primary.main" }}
                >
                  📍 {stage}
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <List>
                  {artists.map((artist, idx) => (
                    <ListItem
                      key={idx}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ListItemText
                        primary={artist.name}
                        secondary={`📅 ${artist.startDate}`}
                      />
                      {!isSaving && (
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            color="error"
                            onClick={() => toggleFavorite(artist)}
                          >
                            <DeleteOutline />
                          </IconButton>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                  ))}
                </List>
              </div>
            ))
          ) : (
            <Typography variant="body2" color="gray">
              Nenhum artista favoritado ainda.
            </Typography>
          )}
        </CardContent>

        {/* Botão para exportar a lista */}
        <Button
          variant="contained"
          sx={{
            mt: 2,
            width: "100%",
            backgroundColor: "#000",
            color: "#fff",
          }}
          onClick={saveAsImage}
          disabled={favorites.length === 0}
        >
          📸 Salvar como Imagem
        </Button>
      </Card>
    </div>
  );
};

export default FavoriteArtists;
