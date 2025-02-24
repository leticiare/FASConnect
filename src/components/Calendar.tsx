import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import { Concert as ConcertType } from "../types/Concerts";
import { Box, Button } from "@mui/material";

const theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#ffffff", // Mantém todas as fontes brancas
                },
            },
        },
    },
});

interface CalendarProps {
    concerts: ConcertType[];
    originalConcerts: ConcertType[]; // ✅ Lista completa de eventos para manter os pontos vermelhos
    selectedDate: Dayjs | null;
    setSelectedDate: (date: Dayjs | null) => void;
    onFilterByDate: (date: Dayjs | null) => void;
    onClearFilter: () => void;
}

export default function Calendar({ concerts, originalConcerts, selectedDate, setSelectedDate, onFilterByDate, onClearFilter }: CalendarProps) {
    // 🔹 Agora usamos `originalConcerts` para garantir que os pontos vermelhos sempre apareçam
    const eventDates = React.useMemo(
        () => originalConcerts.map((concert) => dayjs(concert.startDate).format("YYYY-MM-DD")), 
        [originalConcerts]
    );

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <Paper
                    elevation={5}
                    sx={{
                        backgroundColor: "rgba(150, 150, 150, 0.2)", 
                        borderRadius: 3,
                        backdropFilter: "blur(10px)", 
                        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                        width: "100%", 
                        maxWidth: "550px", 
                        padding: "16px", 
                    }}
                >
                    <StaticDatePicker
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        slots={{
                            actionBar: () => null, // 🔹 Remove os botões "Cancelar" e "Ok"
                        }}
                        slotProps={{
                            layout: {
                                sx: {
                                    backgroundColor: "rgba(150, 150, 150, 0.2)",
                                    backdropFilter: "blur(1em)",
                                    borderRadius: 2,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                                },
                            },
                            calendarHeader: {
                                sx: {
                                    color: "#ffffff",
                                    fontSize: "1.5rem",
                                    fontWeight: "bold",
                                },
                            },
                            day: (props) => {
                                const { day, selected } = props;
                                const formattedDay = dayjs(day).format("YYYY-MM-DD");
                                const isEventDay = eventDates.includes(formattedDay); // ✅ Mantém todos os pontos vermelhos

                                return {
                                    sx: {
                                        fontSize: "1rem",
                                        color: "#ffffff",
                                        borderRadius: "0%",
                                        position: "relative",
                                        backgroundColor: selected ? "#007BFF" : "transparent",
                                        "&:hover": {
                                            backgroundColor: selected ? "#0056b3" : "rgba(255,255,255,0.2)",
                                        },
                                    },
                                    children: (
                                        <Badge
                                            variant="dot"
                                            color="error"
                                            invisible={!isEventDay} // ✅ Agora sempre considera a lista completa de eventos
                                            overlap="circular"
                                            sx={{
                                                "& .MuiBadge-dot": {
                                                    backgroundColor: "red",
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: "50%",
                                                    position: "absolute",
                                                    bottom: -2,
                                                    left: "100%",
                                                    transform: "translateX(-50%)",
                                                },
                                            }}
                                        >
                                            {day.date()}
                                        </Badge>
                                    ),
                                };
                            },
                        }}
                    />

                    {/* 🔹 Botões "Filtrar por data" e "Limpar filtro" lado a lado */}
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="small" 
                            sx={{
                                backgroundColor: "#007BFF", 
                                color: "#fff",
                                "&:hover": { backgroundColor: "#0056b3" }
                            }} 
                            onClick={() => onFilterByDate(selectedDate)}
                        >
                            Filtrar por data
                        </Button>
                        <Button 
                            variant="contained" 
                            size="small" 
                            sx={{
                                backgroundColor: "#007BFF", 
                                color: "#fff",
                                "&:hover": { backgroundColor: "#0056b3" }
                            }} 
                            onClick={onClearFilter}
                        >
                            Limpar filtro
                        </Button>
                    </Box>
                </Paper>
            </ThemeProvider>
        </LocalizationProvider>
    );
}
