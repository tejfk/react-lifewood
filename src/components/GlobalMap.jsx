import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import Tippy from '@tippyjs/react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { name: "Philippines", coordinates: [121.7740, 12.8797], projects: 150, team: 2500 },
  { name: "China", coordinates: [104.1954, 35.8617], projects: 85, team: 1200 },
  { name: "USA", coordinates: [-95.7129, 37.0902], projects: 220, team: 500 },
  { name: "UAE", coordinates: [53.8478, 23.4241], projects: 40, team: 150 },
  { name: "Australia", coordinates: [133.7751, -25.2744], projects: 60, team: 200 },
];

const GlobalMap = () => {
  return (
    <div className="bg-paper p-4 md:p-8 rounded-lg shadow-inner">
      <ComposableMap projectionConfig={{ scale: 155 }} style={{ width: "100%", height: "auto" }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E9E3D5"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, projects, team }) => (
          // By wrapping the Marker in a <g> tag, Tippy can attach its ref to the wrapper.
          <Tippy
            key={name}
            content={
              <div className="p-2 bg-gray-800 text-white rounded-md shadow-lg text-sm">
                <h4 className="font-bold text-lifewood-saffron">{name}</h4>
                <p>Projects: {projects}+</p>
                <p>Team: {team}+</p>
              </div>
            }
          >
            <g> 
              <Marker coordinates={coordinates}>
                <g fill="none" stroke="#FFB347" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(-12, -24)" className="cursor-pointer hover:stroke-lifewood-green transition-all">
                  <circle cx="12" cy="10" r="3" fill="#046241" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </g>
              </Marker>
            </g>
          </Tippy>
        ))}
      </ComposableMap>
    </div>
  );
};
export default GlobalMap;