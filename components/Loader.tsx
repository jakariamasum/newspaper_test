import Lottie from "lottie-react";
import animationData from "../public/loader.json";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
};

export default Loader;
