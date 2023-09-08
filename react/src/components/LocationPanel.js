import React, { useState } from "react";

import { XMarkIcon } from "@heroicons/react/24/solid";

const LocationPanel = ({ onClose }) => {
  const [newLocation, setNewLocation] = useState("");
  const [nearbyPlaces, setNearbyPlaces] = useState([]); // You can populate this array with nearby places
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  };

  const handleSetLocation = () => {
    // Update the location state and save it to cookies here
    // You can also close the panel
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-1/3 bg-gray-800 bg-opacity-50 z-50">
      <div className="fixed top-0 left-0 h-full w-0 md:w-1/3 bg-white shadow-md transform -translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto">
        <button className="absolute top-0 right-0 m-4" onClick={onClose}>
          Close
        </button>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Set Location</h2>
          <input
            type="text"
            placeholder="Enter your new location"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-green-300"
          />
          <button
            onClick={handleSetLocation}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-400 focus:outline-none focus:ring focus:border-green-300"
          >
            Set Location
          </button>
          {/* Display suggested nearby locations here */}
          {suggestedLocations.map((location, index) => (
            <div key={index} className="mt-2 cursor-pointer hover:text-green-500">
              {location}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationPanel;
