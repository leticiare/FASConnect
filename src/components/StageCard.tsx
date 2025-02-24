import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Collapse,
  ThemeProvider,
  Fab,
  Box,
} from "@mui/material";
import { Concert } from "../types/Concerts";
import { Stage } from "../types/Stage";
import darkTheme from "../style/theme";
import CardBar from "./CardBar";

type StageCardProps = {
  stage: Stage;
  artists: Concert[];
};

const StageCard: React.FC<StageCardProps> = ({ stage, artists }) => {
  const [showArtists, setShowArtists] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          height: "100%", // Garante altura uniforme para todos os cards
        }}
      >
        {/* Conteúdo do Card */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {stage.name}
          </Typography>
          <Typography variant="body2" color="gray">
            📍 {stage.location}
          </Typography>
          <Typography variant="body2" mt={1}>
            {stage.history}
          </Typography>

          {/* Lista de artistas (Expansível) */}
          <Collapse in={showArtists}>
            <Typography variant="body2" mt={2}>
              <strong>Artistas:</strong>
            </Typography>
            {artists.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {artists.map((artist, index) => (
                  <CardBar key={index} concert={artist} />
                ))}
              </ul>
            ) : (
              <Typography variant="body2" color="gray">
                Nenhum artista confirmado.
              </Typography>
            )}
          </Collapse>
        </CardContent>

        {/* Botão colado no final do Card */}
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <Fab
            variant="extended"
            size="small"
            onClick={() => setShowArtists(!showArtists)}
          >
            {showArtists ? "Ocultar artistas" : "Ver artistas"}
          </Fab>
        </Box>
      </Card>
    </ThemeProvider>
  );
};

export default StageCard;
