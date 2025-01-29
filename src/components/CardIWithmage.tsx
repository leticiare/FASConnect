import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { Concert } from "../types/Concerts";
import darkTheme from "../style/theme";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
export interface CardWithImageProps {
  content: Concert;
}
function CardWithImage({ content }: CardWithImageProps) {
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
        }}
      >
        {content?.imgUrl && (
          <CardMedia
            component="img"
            sx={{
              height: 200, // Altura fixa para a imagem
              width: 500,
              objectFit: "cover",
            }}
            image={content.imgUrl}
            alt="Descrição da imagem"
          />
        )}

        <CardContent>
          <div className="h-18">
            <Typography variant="h5" component="div">
              {content.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content.description}
            </Typography>
          </div>

          <div className="flex mt-4 gap-1 ">
            <LocationOnIcon />
            {content.location}
          </div>
          <div className="flex mt-4 gap-1">
            <DateRangeIcon />
            {content.startDate}
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default CardWithImage;
