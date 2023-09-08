import { ChevronDownIcon, LifebuoyIcon, MapPinIcon, ReceiptPercentIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import LocationPanel from "./LocationPanel";
import Sample from "./Sample";

const TopNavBar = ({ selectedLocation }) => {

  const [isLocationPanelVisible, setLocationPanelVisible] = useState(false);
  const handleOpenLocationPanel = () => {
    setLocationPanelVisible(true);
  };

  const handleCloseLocationPanel = () => {
    setLocationPanelVisible(false);
  };

  return (
    <div className="bg-green-500 text-white drop-shadow-xl shadow-green-500/50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo Placeholder */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <span className="text-2xl font-bold">Restro</span>
        </div>

        {/* Location Selector with Dropdown Arrow */}
        <div className="relative group">
          <div className="flex items-center space-x-1 cursor-pointer">
            <MapPinIcon className="h-6 w-6"/>
            <span className="text-base">{selectedLocation}</span>
            <ChevronDownIcon className="h-6 w-6 " onClick={handleOpenLocationPanel}/>
            {isLocationPanelVisible && (
              <Sample isLocationPanelVisible = {isLocationPanelVisible}/>
        // <LocationPanel onClose={handleCloseLocationPanel} />
      )}
          </div>
        </div>

        {/* Search Box */}
        <div className="w-1/3 ml-4 flex items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes"
              className="w-full py-2 px-4 text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-green-300 pr-12"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {/* Search Icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex items-center space-x-4">
          {/* Add your menu items here */}
          <div className="flex">
          <ReceiptPercentIcon className="w-6 h-6"/>
          <span className="text-lg">
           Offers</span>
          </div>

          <div className="flex">
          <LifebuoyIcon className="w-6 h-6"/>
          <span className="text-lg">
           Help</span>
          </div><div className="flex">
          <UserIcon className="w-6 h-6"/>
          <span className="text-lg">
           Sign In</span>
          </div>


        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
