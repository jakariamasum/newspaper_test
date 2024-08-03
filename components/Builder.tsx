"use client";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Row from "./builder/Row";

const Builder: React.FC = () => {
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
      { id: nextId, sections: [], backgroundColor: "", color: "" },
    ]);
    setNextId(nextId + 1);
  };

  const deleteRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const duplicateRow = (
    id: number,
    sections: string[],
    backgroundColor: string,
    color: string
  ) => {
    setRows([...rows, { id: nextId, sections, backgroundColor, color }]);
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

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <div className="flex items-center space-x-2 mb-4">
          <strong>Page Builder</strong>
          <button
            onClick={addRow}
            className="p-2 leading-none bg-main rounded-md text-white"
          >
            New Row
          </button>
        </div>
        {rows.map((row, index) => (
          <Row
            key={row.id}
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
          />
        ))}
      </>
    </DndProvider>
  );
};

export default Builder;
