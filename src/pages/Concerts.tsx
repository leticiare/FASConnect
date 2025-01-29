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
    <>
      <h1>Shows</h1>
    </>
  );
};
