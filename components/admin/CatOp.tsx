"use client";
import React, { useState } from 'react';

const CatOp = () => {
  const [showNumberInput, setShowNumberInput] = useState(false);
  const [showSubCategoryInput, setShowSubCategoryInput] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setShowNumberInput(value === 'post' || value === 'tab');
    setShowSubCategoryInput(value === 'tab');
  };

  return (
    <div className="my-2">
      <p>Menu Style</p>
      <select
        className="p-2 mt-2 w-full outline-none rounded-md"
        defaultValue=""
        onChange={handleSelectChange}
      >
        <option value="">Off</option>
        <option value="sub">SubCategory</option>
        <option value="post">Post show</option>
        <option value="tab">Tab Post show & SubCategory</option>
      </select>

      {showNumberInput && (
        <div className="mt-2">
          <p>Post limit</p>
          <input
            type="number"
            placeholder="1"
            className="p-2 mt-2 w-full outline-none rounded-md"
            defaultValue={5}
          />
        </div>
      )}

      {showSubCategoryInput && (
        <div className="mt-2">
          <p>SubCategory limit</p>
          <input
            type="number"
            placeholder="1"
            className="p-2 mt-2 w-full outline-none rounded-md"
            defaultValue={5}
          />
        </div>
      )}
    </div>
  );
};

export default CatOp;