import {
  CircularProgress,
  Pagination,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Concert as ConcertType } from "../types/Concerts";
import { getConcerts } from "../services/api";
import CardWithImage from "../components/CardIWithmage";
import theme from "../style/theme";
export const Concert = () => {
  const [concerts, setConcerts] = useState<ConcertType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<"alpha" | "newest" | "oldest">(
    "alpha"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchConcerts = async () => {
      const res = await getConcerts();
      setConcerts(res);
      setLoading(false);
    };
    fetchConcerts();
  }, []);

  // Filtra os shows pelo nome baseado no termo de pesquisa
  const filteredConcerts = concerts.filter((concert) =>
    concert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordena os shows de acordo com a opção de ordenação
  const sortedConcerts = useMemo(() => {
    return [...filteredConcerts].sort((a, b) => {
      if (sortOption === "alpha") {
        return a.name.localeCompare(b.name); // Ordenação por nome
      }
      if (sortOption === "newest") {
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        ); // Mais recentes primeiro
      }
      if (sortOption === "oldest") {
        return (
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        ); // Mais antigos primeiro
      }
      return 0;
    });
  }, [filteredConcerts, sortOption]);

  // Paginação
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
    <div className="h-full flex flex-col">
      <div className="w-4/5 m-auto text-center my-8">
        <div className="font-secondary">
          <Typography
            variant="h3"
            fontFamily="Delius Unicase"
            component="div"
            color="#fff"
          >
            Shows
          </Typography>
          <p className="text-white text-xl">
            Abaixo, confira os artistas mais aclamados que vão agitar o FASC
            2077! Veja as datas, horários e palcos dos shows!
          </p>
        <div className="flex w-1/2 gap-2 mx-auto mt-8 justify-center bg-gray-300 p-2 rounded-lg shadow-md">
          {/* SearchBar (Autocomplete) */}
          <Autocomplete
            options={concerts.map((concert) => concert.name)}
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

          {/* Filtro de Ordenação */}
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
      {loading ? (
        <div className="h-1/2 flex justify-center items-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 w-4/5 m-auto justify-around mb-4">
          {displayedConcerts.map((concert) => (
            <CardWithImage content={concert} />
          ))}
        </div>
      )}
      <div className="flex justify-center my-8 ">
        <ThemeProvider theme={theme}>
          <Pagination
            count={Math.ceil(concerts.length / itemsPerPage)}
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
