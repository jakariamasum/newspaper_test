"use client";
import { ICheckboxItem } from "@/types/checkbox.types";
import React, { useState } from "react";

interface CheckboxProps {
  title: string;
  items: ICheckboxItem[];
  onChange: (category: { category: string; subCategory: string }) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ title, items, onChange }) => {
  const initializeCheckedState = (items: ICheckboxItem[]): boolean[] =>
    items.map((item) => !!item.checked);

  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    initializeCheckedState(items)
  );
  const [subCheckedItems, setSubCheckedItems] = useState<boolean[][]>(
    items.map((item) =>
      item.subCategories ? initializeCheckedState(item.subCategories) : []
    )
  );

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
    onChange({
      category: items[index]._id,
      subCategory: "",
    });
  };

  const handleSubCheckboxChange = (mainIndex: number, subIndex: number) => {
    const newSubCheckedItems = [...subCheckedItems];
    if (!newSubCheckedItems[mainIndex]) {
      newSubCheckedItems[mainIndex] = [];
    }
    newSubCheckedItems[mainIndex][subIndex] =
      !newSubCheckedItems[mainIndex][subIndex];
    setSubCheckedItems(newSubCheckedItems);
    onChange({
      category: items[mainIndex]._id,
      subCategory: items[mainIndex].subCategories![subIndex]._id,
    });
  };

  return (
    <div className="my-2">
      <p>{title}</p>
      <div className="w-full bg-white p-2 overflow-y-auto max-h-60 mt-2 rounded-md">
        {items.map((item, index) => (
          <div key={index}>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
                className="form-checkbox h-5 w-5 mr-1 text-blue-600"
              />
              <span>{item.title}</span>
            </label>
            {item.subCategories && (
              <div className="ml-6">
                {item.subCategories.map((subItem, subIndex) => (
                  <label key={subIndex} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={
                        subCheckedItems[index] &&
                        subCheckedItems[index][subIndex]
                      }
                      onChange={() => handleSubCheckboxChange(index, subIndex)}
                      className="form-checkbox h-4 w-4 mr-1 text-green-600"
                    />
                    <span>{subItem.title}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;
