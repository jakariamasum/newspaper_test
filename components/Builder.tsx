"use client";
import React, {
  useState,
  useRef,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Photo from "./admin/Photo";
import axiosPublic from "@/lib/axiosPublic";
import Section from "./builder/Section";
import Row from "./builder/Row";
interface SectionData {
  sectionTitle: string;
  color: string;
  backgroundColor: string;
  desktopGrid: string;
  mobileGrid: string;
  sectionLimit: string;
  imgPosition?: string;
}
interface BuilderProps {
  onRowDataChange: (index: number, updatedData: Partial<any>) => void;
}
const Builder: React.FC<BuilderProps> = ({ onRowDataChange }) => {
  const [rows, setRows] = useState<
    { id: number; sections: string[]; backgroundColor: string; color: string }[]
  >([]);
  const [nextId, setNextId] = useState(1);

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const newRows = [...rows];
    const [movedRow] = newRows.splice(dragIndex, 1);
    newRows.splice(hoverIndex, 0, movedRow);
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: nextId,
        sections: [],
        backgroundColor: "#ffffff",
        color: "#000000",
      },
    ]);
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
  const [subCategories, setSubCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      const response = await axiosPublic.get("/categories");
      setCategories(response.data.data);
    };
    fetchCategoryData();
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
            id={row.id}
            index={index}
            moveRow={moveRow}
            deleteRow={deleteRow}
            duplicateRow={duplicateRow}
            moveRowUp={moveRowUp}
            moveRowDown={moveRowDown}
            initialSections={row.sections}
            initialBackgroundColor={row.backgroundColor}
            initialColor={row.color}
            updateRowData={(data) => onRowDataChange(index, data)}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Builder;
