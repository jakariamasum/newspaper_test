import React, { useState } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  onChange: (selected: MultiValue<Option>) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  placeholder,
}) => {
  const handleChange = (selected: MultiValue<Option>) => {
    onChange(selected);
  };

  const customStyles: StylesConfig<Option, true> = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      padding: "2px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e0f7fa",
      color: "#00796b",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#00796b",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#d32f2f",
      ":hover": {
        backgroundColor: "#ef5350",
        color: "white",
      },
    }),
  };

  return (
    <Select
      isMulti
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={customStyles}
    />
  );
};
