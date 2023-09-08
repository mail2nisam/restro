import React from "react";
import { faker } from '@faker-js/faker';


const RestaurantList = () => {
  // Generate sample restaurant data
  const restaurants = Array.from({ length: 12 }, () => ({
    name: faker.company.buzzPhrase(),
    image: faker.image.urlLoremFlickr({ category: 'restaurents' }),
    rating: faker.number.int({ min: 1, max: 5 }),
    address: faker.location.streetAddress()

    // distance: `${faker.random.number({ min: 1, max: 10, precision: 0.1 })} km`,
  }));

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">
      {restaurants.map((restaurant, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition duration-300  border-2 border-slate-50"
        >
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-32 object-cover mb-2"
          />
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
          <p className="text-gray-600 text-sm mt-1">{restaurant.address}</p>
          <div className="flex items-center mt-1">
            <div className="flex space-x-1 text-yellow-400">
              {/* Star icons for rating */}
              {Array.from({ length: Math.floor(restaurant.rating) }, (_, i) => (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>


              ))}
              <span className="text-gray-500">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-500 ml-2">{restaurant.distance}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
