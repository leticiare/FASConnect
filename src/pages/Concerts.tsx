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
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const displayedConcerts = concerts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const fetchConcerts = async () => {
    const res = await getConcerts();
    setConcerts(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

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
        </ThemeProvider>
      </div>
    </div>
  );
};
