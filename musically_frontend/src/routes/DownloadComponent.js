import React from "react";
import LoggedInContainer from "../containers/LoggedInContainer";

const DownloadComponent = () => {
  return (
    <LoggedInContainer>
      <div className="p-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-6">Download App 📲</h1>

        <p className="text-gray-400 mb-6">
          Get Melofy on your device and enjoy music anytime.
        </p>

        <div className="flex justify-center gap-6">
          <button className="bg-white text-black px-6 py-3 rounded-full">
            Download for Android
          </button>

          <button className="bg-white text-black px-6 py-3 rounded-full">
            Download for iOS
          </button>
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default DownloadComponent;