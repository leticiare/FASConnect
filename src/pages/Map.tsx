import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { LatLngTuple } from "leaflet";
import iconsData from "./data/iconsData.json";



// Importando os dados diretamente


interface LocationData {
  label: string;
  position: LatLngTuple;
}

interface IconData {
  icon: string;
  size: [number, number];
  locations: LocationData[];
}

export const Mapa = () => {
  const position: LatLngTuple = [-11.014451, -37.206922]; // Posição central do mapa

  // Converte os dados do JSON para ícones e marcadores
  const markers = Object.entries(iconsData).flatMap(([key, value]) => {
    const correctedSize: [number, number] = [value.size[0], value.size[1]];
  
    return value.locations.map((location) => ({
      icon: L.icon({
        iconUrl: value.icon,
        iconSize: correctedSize,
        iconAnchor: [correctedSize[0] / 2, correctedSize[1]], // Centraliza a base do ícone
        popupAnchor: [0, -correctedSize[1] / 2],
      }),
      location: {
        ...location,
        position: location.position as LatLngTuple, // 🔹 Força o TypeScript a reconhecer como LatLngTuple
      },
    }));
  });
  


  return (
    <div>
      <MapContainer
        center={position} // Posição inicial do mapa
        zoom={22} // Nível de zoom inicial
        style={{ height: "100vh", width: "100%" }} // Tamanho do mapa
      >
        {/* Camada de Mapa do OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Renderizando marcadores dinâmicos carregados do JSON */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.location.position} icon={marker.icon}>
            <Popup>{marker.location.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
