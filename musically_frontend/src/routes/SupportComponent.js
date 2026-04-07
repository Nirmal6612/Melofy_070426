import React from "react";
import LoggedInContainer from "../containers/LoggedInContainer";

const SupportComponent = () => {
  return (
    <LoggedInContainer>
      <div className="p-8 text-white">
        <h1 className="text-4xl font-bold mb-6">Support 💬</h1>

        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="font-semibold">How to upload a song?</h2>
            <p className="text-gray-400">Go to Upload Song and fill required details.</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="font-semibold">How to create playlist?</h2>
            <p className="text-gray-400">Use Create Playlist option from sidebar.</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="font-semibold">Contact Us</h2>
            <p className="text-gray-400">Email: support@melofy.com</p>
          </div>
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default SupportComponent;