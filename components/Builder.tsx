"use client";
import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axiosPublic from "@/lib/axiosPublic";
import Row from "./builder/Row";

interface BuilderProps {
  onRowDataChange: (index: number, updatedData: Partial<any>) => void;
  data?: {
    id: number;
    sections: any[];
    bgColor: string;
    textColor: string;
  }[];
}

const Builder: React.FC<BuilderProps> = ({ onRowDataChange, data = [] }) => {
  const [rows, setRows] =
    useState<
      { id: number; sections: any[]; bgColor: string; textColor: string }[]
    >(data);
  const [nextId, setNextId] = useState(1);

  const isNewPage = data.length === 0;

  useEffect(() => {
    const savedRows = localStorage.getItem("rows");
    if (savedRows && !isNewPage) {
      const parsedRows = JSON.parse(savedRows);
      setRows(parsedRows);
      setNextId(
        parsedRows.length > 0
          ? Math.max(...parsedRows.map((d: any) => d.id)) + 1
          : 1
      );
    } else {
      setRows(isNewPage ? [] : data);
      setNextId(data.length > 0 ? Math.max(...data.map((d) => d.id)) + 1 : 0);
      if (isNewPage) {
        localStorage.removeItem("rows");
      }
    }
  }, [isNewPage]);

  useEffect(() => {
    if (rows.length > 0) {
      localStorage.setItem("rows", JSON.stringify(rows));
    }
  }, [rows]);

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const newRows = [...rows];
    const [movedRow] = newRows.splice(dragIndex, 1);
    newRows.splice(hoverIndex, 0, movedRow);
    setRows(newRows);
  };

  const addRow = () => {
    const newRow = {
      id: nextId,
      sections: [],
      bgColor: "#ffffff",
      textColor: "#000000",
    };

    setRows((prevRows) => [...prevRows, newRow]);
    setNextId(nextId + 1);
  };

  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const duplicateRow = (row: any) => {
    setRows([...rows, { ...row, id: nextId }]);
    setNextId(nextId + 1);
  };

  const moveRowUp = (index: number) => {
    if (index > 0) {
      const newRows = [...rows];
      const [movedRow] = newRows.splice(index, 1);
      newRows.splice(index - 1, 0, movedRow);
      setRows(newRows);
    }
  };

  const moveRowDown = (index: number) => {
    if (index < rows.length - 1) {
      const newRows = [...rows];
      const [movedRow] = newRows.splice(index, 1);
      newRows.splice(index + 1, 0, movedRow);
      setRows(newRows);
    }
  };

  const [categories, setCategories] = useState([]);
  const [stories, setStories] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await axiosPublic.get("/categories");
      setCategories(response.data.data);
    };
    fetchCategoryData();
    const fetchStories = async () => {
      const response = await axiosPublic.get(
        `/categories/category/types?type=story`
      );
      setStories(response.data.data);
    };
    fetchStories();
    const fetchVideos = async () => {
      const response = await axiosPublic.get(
        `/categories/category/types?type=video`
      );
      setVideos(response.data.data);
    };
    fetchVideos();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="builder-container">
        <div className="flex items-center space-x-2 mb-4">
          <strong>Page Builder</strong>
          <button
            onClick={addRow}
            className="p-2 leading-none bg-blue-500 rounded-md text-white"
          >
            New Row
          </button>
        </div>

        {rows.map((row, index) => (
          <Row
            key={row.id}
            categories={categories}
            stories={stories}
            videos={videos}
            id={row.id}
            index={index}
            moveRow={moveRow}
            deleteRow={deleteRow}
            duplicateRow={duplicateRow}
            moveRowUp={moveRowUp}
            moveRowDown={moveRowDown}
            initialSections={row.sections}
            defaultData={data[index]?.sections}
            initialBackgroundColor={row.bgColor}
            initialColor={row.textColor}
            updateRowData={(updatedData) => onRowDataChange(index, updatedData)}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Builder;
