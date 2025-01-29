import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importa o ícone padrão do Leaflet corretamente
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Configuração do ícone do marcador
const markerIcon = L.icon({
  iconUrl: markerIconPng, // Ícone padrão do Leaflet
  shadowUrl: markerShadowPng, // Sombra do ícone
  iconSize: [25, 41], // Tamanho do ícone
  iconAnchor: [12, 41], // Ponto de ancoragem do ícone
  popupAnchor: [1, -34], // Ponto de ancoragem do popup
});

export const Mapa = () => {
  const position: [number, number] = [-11.013455, -37.206563]; // Latitude e Longitude do Centro do FASC

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

        {/* Marcador no mapa */}
        <Marker position={position} icon={markerIcon}>
          <Popup>Centro do FASC</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
