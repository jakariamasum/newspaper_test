"use client";
import React, { useState, useEffect, ChangeEvent } from "react";

interface Area {
  title: string;
  selected?: boolean;
}

interface City {
  title: string;
  areas: Area[];
}

interface LocationProps {
  items: City[];
  onChange: (location: { city: string; area: string }) => void;
}

const Location: React.FC<LocationProps> = ({ items, onChange }) => {
  const [selectedCity, setSelectedCity] = useState<string>(
    items[0]?.title || ""
  );
  const defaultSelectedArea =
    items
      .find((city) => city.title === selectedCity)
      ?.areas.find((area) => area.selected)?.title || "";
  const [selectedArea, setSelectedArea] = useState<string>(defaultSelectedArea);

  useEffect(() => {
    onChange({ city: selectedCity, area: selectedArea });
  }, [selectedCity, selectedArea, onChange]);

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    const newDefaultSelectedArea =
      items
        .find((city) => city.title === newCity)
        ?.areas.find((area) => area.selected)?.title || "";
    setSelectedCity(newCity);
    setSelectedArea(newDefaultSelectedArea);
    onChange({ city: newCity, area: newDefaultSelectedArea });
  };

  const handleAreaChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newArea = e.target.value;
    setSelectedArea(newArea);
    onChange({ city: selectedCity, area: newArea });
  };

  return (
    <div className="grid grid-cols-1 gap-2 mb-4">
      <div>
        <p>Location</p>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md focus:outline-none"
        >
          {items.map((city) => (
            <option key={city.title} value={city.title}>
              {city.title}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <select
          value={selectedArea}
          onChange={handleAreaChange}
          className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none"
        >
          {items
            .find((city) => city.title === selectedCity)
            ?.areas.map((area) => (
              <option key={area.title} value={area.title}>
                {area.title}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default Location;
