import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Collapse } from "@mui/material";
import { Concert } from "../types/Concerts";
import { Stage } from "../types/Stage";

type StageCardProps = {
  stage: Stage;
  artists: Concert[];
};

const StageCard: React.FC<StageCardProps> = ({ stage, artists }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#f8f9fa",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 400,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" color="black">
          {stage.name}
        </Typography>
        <Typography variant="body2" color="gray">
          📍 {stage.location}
        </Typography>
        <Typography variant="body2" mt={1} color="black">
          {stage.history}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StageCard;
