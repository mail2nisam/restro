import React, { useEffect } from "react";
import TopNavBar from "./TopNavBar ";
import RestaurantList from "./RestaurantList";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const userLocation = Cookies.get("userLocation");
    if (!userLocation) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      {/* Include the TopNavBar component and pass the selectedLocation prop */}
      <TopNavBar selectedLocation="Kochi, Kerala" />
      {/* Rest of your Home page content */}
      <div className="container mx-auto p-4">
          <RestaurantList/>
      </div>
    </div>
  );
};

export default Home;
