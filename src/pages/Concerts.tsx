import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Concert as ConcertType } from "../types/Concerts";
import { getConcerts } from "../services/api";
import CardWithImage from "../components/CardIWithmage";

export const Concert = () => {
  const [concerts, setConcerts] = useState<ConcertType[]>([]);
  const fetchConcerts = async () => {
    const res = await getConcerts();
    setConcerts(res);
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  return (
    <div className="">
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

      <div className="flex flex-wrap gap-4 w-4/5 m-auto justify-between  mb-4">
        {concerts.map((concert) => (
          <CardWithImage content={concert} />
        ))}
      </div>
    </div>
  );
};
