import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngTuple, LayerGroup } from "leaflet";
import { useEffect } from "react";
import iconsData from "./data/iconsData.json";

// Interface para os dados de localização
interface LocationData {
  label: string;
  position: LatLngTuple;
}

// Interface para os ícones e tamanhos
interface IconData {
  name: string;
  icon: string;
  size: [number, number]; // 🔹 Exatamente dois números
  locations: LocationData[];
}

// Interface para os props do LayerControl
interface LayerControlProps {
  layers: Record<string, LayerGroup>;
  layerIcons: Record<string, string>; // 🔹 Agora está corretamente tipado
}

// Componente para adicionar o controle de camadas dinamicamente
const LayerControl = ({ layers, layerIcons }: LayerControlProps) => {
  const map = useMap();

  useEffect(() => {
    // Criar camada de controle personalizada
    const layerControl = L.control.layers({}, layers, { collapsed: true }).addTo(map);

    // Adicionar todas as camadas ao mapa por padrão
    Object.values(layers).forEach((group) => group.addTo(map));

    // Modificar a aparência do controle de camadas
    setTimeout(() => {
      const controlElement = document.querySelector(".leaflet-control-layers-overlays");

      if (controlElement) {
        controlElement.querySelectorAll("label").forEach((label) => {
          const text = label.textContent?.trim() || "";
          if (layerIcons[text]) {
            // Criar um novo container para estilizar corretamente
            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.marginBottom = "8px";

            // Criar elemento de ícone
            const iconElement = document.createElement("img");
            iconElement.src = layerIcons[text];
            iconElement.width = 20;
            iconElement.height = 20;
            iconElement.style.marginRight = "8px";
            

            // Mover o checkbox para o novo container
            const checkbox = label.querySelector("input");
            if (checkbox) {
              wrapper.appendChild(iconElement);
              wrapper.appendChild(checkbox);
            }

            // Criar um título para a camada
            const titleElement = document.createElement("div");
            titleElement.textContent = text;
            titleElement.style.fontWeight = "bold";
            titleElement.style.marginBottom = "4px";

            // Limpar label e reconstruí-la
            label.innerHTML = "";
            label.appendChild(titleElement);
            label.appendChild(wrapper);
          }
        });
      }
    }, 200);

    return () => {
      map.removeControl(layerControl);
    };
  }, [map, layers, layerIcons]);

  return null;
};

export const Mapa = () => {
  const position: LatLngTuple = [-11.014451, -37.206922]; // Posição central do mapa

  // Criar grupos de camadas e armazenar os ícones
  const layerGroups: Record<string, LayerGroup> = {};
  const layerIcons: Record<string, string> = {}; // 🔹 Agora está corretamente declarado

  Object.entries(iconsData).forEach(([category, value]) => {
    const typedValue = value as unknown as IconData; // 🔹 Converte de forma segura
    const correctedSize: [number, number] = [typedValue.size[0] ?? 25, typedValue.size[1] ?? 35]; // 🔹 Garante sempre dois números

    const icon = L.icon({
      iconUrl: typedValue.icon,
      iconSize: correctedSize,
      iconAnchor: [correctedSize[0] / 2, correctedSize[1]], // Centraliza a base do ícone
      popupAnchor: [0, -correctedSize[1] / 2],
    });

    // Criar marcadores e agrupá-los em uma LayerGroup
    const markers = typedValue.locations.map((location) =>
      L.marker(location.position as LatLngTuple, { icon }).bindPopup(location.label)
    );

    // Adicionar grupo e armazenar ícone para exibição no menu
    layerGroups[typedValue.name] = L.layerGroup(markers);
    layerIcons[typedValue.name] = typedValue.icon; // 🔹 Salva o caminho do ícone para exibição no menu
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

        {/* Adicionar controle de camadas com ícones ao lado do checkbox e nome em cima */}
        <LayerControl layers={layerGroups} layerIcons={layerIcons} />
      </MapContainer>
    </div>
  );
};
