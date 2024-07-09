"use client";
import React, { useState, useEffect, KeyboardEvent, ChangeEvent } from 'react';

type TagProps = {
  keyword: string;
};

const Tag: React.FC<TagProps> = ({ keyword }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (keyword) {
      setTags(keyword.split(',').map(tag => tag.trim()));
    }
  }, [keyword]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue('');
      e.preventDefault();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length) {
      setInputValue(tags[tags.length - 1]);
      setTags(tags.slice(0, -1));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex items-center flex-wrap border p-2 gap-2 bg-white rounded mt-2">
      {tags.map((tag, index) => (
        <div key={index} className="flex items-center text-gray-700 border rounded-full px-3 py-1">
          <span>{tag}</span>
          <button
            className="ml-2 text-gray-500 hover:text-gray-700"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a keyword"
        className="flex-grow border py-1 px-2 rounded-full outline-none"
      />
    </div>
  );
};

export default Tag;
