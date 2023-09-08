import React, { useEffect, useState } from "react"
import landingRestaurantImage from "../assets/landing-restaurant-image.jpg"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { MagnifyingGlassIcon, MapPinIcon } from "@heroicons/react/24/solid"

const Body = () => {

  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userLocation = Cookies.get("userLocation");
    if (userLocation) {
      navigate("/home");
    }
  }, [navigate]);
  const handleLocateMe = () => {
    setIsLoading(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const userLocation = `${latitude}, ${longitude}`
        Cookies.set("userLocation", userLocation)
        setLocation(userLocation)
        setIsLoading(false)
        navigate("/home")
      },
      (error) => {
        console.error("Error getting location:", error)
        setIsLoading(false)
      }
    )
  }
  return (
    <div className="bg-white text-green-500 font-sans min-h-screen flex flex-col md:flex-row">
      {/* Search Section (Left Half) */}
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">Find Nearby Restaurants</h1>
        <p className="text-lg md:text-xl mb-4 md:mb-6">Discover great places to eat near you</p>
        <div className="flex items-center space-x-4 border border-green-500 rounded-full p-2">
        <input
            type="text"
            placeholder="Enter your location"
            className="w-full md:w-80 max-w-xl px-4 py-3 rounded-full text-green-500 bg-white focus:outline-none focus:ring-2 focus:ring-green-50"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <span className="text-2xl text-green-500">
            {/* GPS Icon */}
            <MapPinIcon className="h-6 w-6"/>

          </span>
          <button
            className={`text-gray-500 hover:text-green-500 focus:outline-none ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={isLoading ? null : handleLocateMe}
          >
            {isLoading ? "Locating..." : "Locate me"}
          </button>
          <button className="bg-green-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-green-500 focus:outline-none focus:ring focus:border-green-300">
            <span className="sr-only">Search</span>
            {/* Search Icon */}
            <MagnifyingGlassIcon className="w-6 h-6"/>
          </button>
        </div>
      </div>
      {/* Dummy Restaurant Image (Right Half) */}
      <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${landingRestaurantImage})` }}></div>
    </div>
  )
}

export default Body
