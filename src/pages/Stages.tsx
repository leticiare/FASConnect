import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getConcerts, getStages } from "../services/api";
import { Concert } from "../types/Concerts";
import { Stage } from "../types/Stage";
import StageCard from "../components/StageCard";

export const Stages = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConcerts = async () => {
      const res = await getConcerts();
      setConcerts(res);
    };
    fetchConcerts();
  }, []);
  useEffect(() => {
    const fetchStages = async () => {
      const res = await getStages();
      setStages(res);
      setLoading(false);
    };
    fetchStages();
  }, []);
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="w-4/5 m-auto text-center my-8">
          <Typography
            variant="h3"
            fontFamily="Delius Unicase"
            component="div"
            color="#fff"
          >
            Palcos
          </Typography>
          <p className="text-white text-xl">
            Abaixo, conheça os palcos queAbaixo, conheça os palcos que vão
            receber as maiores atrações do FASC 2077! Confira as programações,
            horários e artistas que vão passar por cada um deles!
          </p>
        </div>
        <Grid container spacing={3} justifyContent="center">
          {stages.map((stage, index) => (
            <Grid item key={index}>
              <StageCard stage={stage} artists={concerts} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
