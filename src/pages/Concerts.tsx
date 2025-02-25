import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Autocomplete,
  ThemeProvider,
  Typography,
  Paper,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { useEffect, useState, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Concert as ConcertType } from "../types/Concerts";
import { getConcerts } from "../services/api";
import CardWithImage from "../components/CardIWithmage";
import Calendar from "../components/Calendar"; // ✅ Agora usando o nome correto do componente
import theme from "../style/theme";
import "../style/calendarStyles.css";

export const Concert = () => {
  const [concerts, setConcerts] = useState<ConcertType[]>([]);
  const [originalConcerts, setOriginalConcerts] = useState<ConcertType[]>([]); // ✅ Lista completa de eventos
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<"alpha" | "newest" | "oldest">(
    "alpha"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    const fetchConcerts = async () => {
      const res = await getConcerts();
      setConcerts(res);
      setOriginalConcerts(res); // ✅ Armazena os shows originais
      setLoading(false);
    };
    fetchConcerts();
  }, []);

  const handleFilterByDate = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      setConcerts(
        originalConcerts.filter(
          (concert) =>
            dayjs(concert.startDate).format("YYYY-MM-DD") === formattedDate
        )
      );
      setPage(1); // ✅ Reinicia para a primeira página ao filtrar
    }
  };

  const handleClearFilter = () => {
    setConcerts(originalConcerts); // ✅ Restaura os shows originais
    setPage(1); // ✅ Reinicia para a primeira página ao limpar o filtro
  };

  const filteredConcerts = concerts.filter((concert) =>
    concert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedConcerts = useMemo(() => {
    return [...filteredConcerts].sort((a, b) => {
      if (sortOption === "alpha") {
        return a.name.localeCompare(b.name);
      }
      if (sortOption === "newest") {
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      }
      if (sortOption === "oldest") {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
      }
      return 0;
    });
  }, [filteredConcerts, sortOption]);

  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const displayedConcerts = sortedConcerts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="h-full flex flex-col items-center">
      <div className="w-full max-w-4xl text-center my-8 px-4 ">
        <Typography
          variant="h3"
          component="div"
          color="#fff"
          fontFamily="Modak"
        >
          Shows
        </Typography>
        <p className="text-white text-xl">
          Abaixo, confira os artistas mais aclamados que vão agitar o FASC 2077!
          Veja as datas, horários e palcos dos shows!
        </p>
        {/* 🔍 Seção de busca e filtros */}
        <div className="flex flex-col sm:flex-row w-full max-w-2xl gap-2 mx-auto mt-8 justify-center bg-gray-300 p-2 rounded-lg shadow-md">
          <Autocomplete
            options={originalConcerts.map((concert) => concert.name)} // ✅ Usa a lista completa para buscar shows
            value={searchTerm}
            fullWidth
            onChange={(_event, newValue) => {
              setSearchTerm(newValue || "");
              setPage(1);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar Show"
                variant="outlined"
                className="w-full max-w-xs rounded-md"
              />
            )}
          />
          <FormControl className="w-full max-w-xs">
            <InputLabel id="sortSelectLabel" sx={{ color: "gray" }}>
              Ordenar
            </InputLabel>
            <Select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value as "alpha" | "newest" | "oldest")
              }
              label="Ordenar"
              id="sortSelect"
              aria-labelledby="sortSelectLabel"
            >
              <MenuItem value="alpha">
                <SortByAlphaIcon className="mr-2 text-gray-600" /> Nome (A-Z)
              </MenuItem>
              <MenuItem value="newest">
                <CalendarMonthIcon className="mr-2 text-gray-600" /> Data (Mais
                Recentes)
              </MenuItem>
              <MenuItem value="oldest">
                <CalendarMonthIcon className="mr-2 text-gray-600" /> Data (Mais
                Antigos)
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center lg:items-start items-center gap-6">
        {/* 📌 Componente do calendário com eventos marcados */}
        <div className="flex justify-center my-6 w-4/5">
          <Paper
            sx={{
              backgroundColor: "rgba(150, 150, 150, 0.2)", // Fundo escuro
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              padding: 2,
              maxWidth: "550px", // Ajustado para telas maiores
            }}
          >
            <Calendar
              concerts={concerts} // ✅ Apenas os shows filtrados são exibidos
              originalConcerts={originalConcerts} // ✅ Mantém os pontos vermelhos no calendário
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onFilterByDate={handleFilterByDate}
              onClearFilter={handleClearFilter}
            />
          </Paper>
        </div>

        {loading ? (
          <div className="h-screen flex justify-between items-center">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-4/5 m-auto mb-4">
            {displayedConcerts.map((concert, index) => (
              <CardWithImage content={concert} key={index} />
            ))}
          </div>
        )}
      </div>

      {/* 📌 Paginação dos shows */}
      <ThemeProvider theme={theme}>
        <div className="flex justify-center my-8 w-full">
          <Paper elevation={3} className="p-2 rounded-lg">
            <Pagination
              count={Math.ceil(sortedConcerts.length / itemsPerPage)}
              page={page}
              onChange={handleChange}
              color="standard"
            />
          </Paper>
        </div>
      </ThemeProvider>
    </div>
  );
};
