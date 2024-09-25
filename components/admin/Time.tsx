import { useState, useEffect, SetStateAction, Dispatch } from "react";

interface ITime {
  time?: string | null;
  setTime?: Dispatch<SetStateAction<string | null>>;
}

const Time: React.FC<ITime> = ({ time, setTime }) => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const now = time ? new Date(time) : new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");

    const formattedDateTime = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
    setCurrentDateTime(formattedDateTime);

    if (setTime) {
      setTime(formattedDateTime);
    }
  }, [time, setTime]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateTime = e.target.value;
    setCurrentDateTime(newDateTime);

    if (setTime) {
      setTime(newDateTime);
    }
  };

  return (
    <div className="mb-4">
      <p>Public Time</p>
      <input
        type="datetime-local"
        value={currentDateTime}
        onChange={handleInputChange}
        className="p-2 mt-2 w-full outline-none rounded-md"
      />
    </div>
  );
};

export default Time;
