import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-1/4 left-12 text-white z-10">
      <h1 className="text-4xl font-extrabold drop-shadow-lg bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
        {title}
      </h1>
      <p className="py-4 w-1/4 text-gray-300 font-light">{overview}</p>
      <div className="flex items-center space-x-4 mt-4">
        <button className="flex items-center bg-gray-400 text-black font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-300 transition duration-300">
          ▶️ Play
        </button>
        <button className="bg-gray-800 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
