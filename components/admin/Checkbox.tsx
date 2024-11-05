"use client";
import { useState, useEffect } from "react";
import { BiCheck } from "react-icons/bi";

interface ICheckboxItem {
  _id: string;
  title: string;
  checked?: boolean;
  subCategories?: ICheckboxItem[];
}

interface CheckboxProps {
  title: string;
  items: ICheckboxItem[];
  onChange: (category: { category: string; subCategory: string }) => void;
  initialValue?: { category: string; subCategory?: string };
}

export default function Checkbox({
  title,
  items,
  onChange,
  initialValue,
}: CheckboxProps) {
  const initializeCheckedState = (items: ICheckboxItem[]): boolean[] => {
    return items.map(
      (item) => initialValue?.category === item._id || !!item.checked
    );
  };

  const initializeSubCheckedState = (items: ICheckboxItem[]): boolean[][] => {
    return items.map((item) => {
      const subCategories = item.subCategories || [];
      return subCategories.map(
        (subItem) =>
          initialValue?.category === item._id &&
          initialValue?.subCategory === subItem._id
      );
    });
  };

  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    initializeCheckedState(items)
  );

  const [subCheckedItems, setSubCheckedItems] = useState<boolean[][]>(
    initializeSubCheckedState(items)
  );

  useEffect(() => {
    if (initialValue) {
      setCheckedItems(initializeCheckedState(items));
      setSubCheckedItems(initializeSubCheckedState(items));
    }
  }, [initialValue, items]);

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);

    // If unchecking and there are checked subcategories, uncheck them too
    if (!newCheckedItems[index]) {
      const newSubCheckedItems = [...subCheckedItems];
      if (newSubCheckedItems[index]) {
        newSubCheckedItems[index] = newSubCheckedItems[index].map(() => false);
        setSubCheckedItems(newSubCheckedItems);
      }
    }

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

    // Toggle subcategory
    newSubCheckedItems[mainIndex][subIndex] =
      !newSubCheckedItems[mainIndex][subIndex];
    setSubCheckedItems(newSubCheckedItems);

    // Check if any subcategories are checked
    const hasCheckedSubcategories = newSubCheckedItems[mainIndex].some(
      (isChecked) => isChecked
    );

    // Update main category based on subcategories
    const newCheckedItems = [...checkedItems];
    newCheckedItems[mainIndex] = hasCheckedSubcategories;
    setCheckedItems(newCheckedItems);

    onChange({
      category: items[mainIndex]._id,
      subCategory: items[mainIndex].subCategories?.[subIndex]._id || "",
    });
  };

  const CustomCheckbox = ({
    checked,
    onChange,
    id,
    label,
    isSubCategory = false,
  }: {
    checked: boolean;
    onChange: () => void;
    id: string;
    label: string;
    isSubCategory?: boolean;
  }) => (
    <div className="flex items-center space-x-2">
      <button
        role="checkbox"
        aria-checked={checked}
        id={id}
        onClick={onChange}
        className={`
          relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border
          ${isSubCategory ? "border-gray-300" : "border-gray-400"}
          ${
            checked
              ? isSubCategory
                ? "bg-gray-600"
                : "bg-gray-700"
              : "bg-white"
          }
          hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
        `}
      >
        {checked && <BiCheck className="h-3 w-3 text-white" />}
      </button>
      <label
        htmlFor={id}
        className={`select-none ${
          isSubCategory ? "text-sm" : "text-sm font-medium"
        }`}
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className="space-y-2">
      <p className="font-medium text-sm">{title}</p>
      <div className="border border-gray-200 rounded-md">
        <div className="h-60 overflow-y-auto">
          <div className="p-4 space-y-4">
            {items.map((item, index) => (
              <div key={item._id} className="space-y-2">
                <CustomCheckbox
                  id={item._id}
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                  label={item.title}
                />
                {item.subCategories && item.subCategories.length > 0 && (
                  <div className="ml-6 space-y-2">
                    {item.subCategories.map((subItem, subIndex) => (
                      <CustomCheckbox
                        key={subItem._id}
                        id={subItem._id}
                        checked={subCheckedItems[index]?.[subIndex] || false}
                        onChange={() =>
                          handleSubCheckboxChange(index, subIndex)
                        }
                        label={subItem.title}
                        isSubCategory
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
