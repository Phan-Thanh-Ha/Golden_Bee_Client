import Geocoder from "react-native-geocoding";
import { GOOGLE_API_KEY } from "./googleApiKey";

Geocoder.init(GOOGLE_API_KEY);

const GetLocationTitle = async (latitude = 0, longitude = 0) => {
  try {
    const response = await Geocoder.from(latitude, longitude);
    if (response.results.length > 0) {
      const address = response.results[0].formatted_address;
      return {
        latitude: latitude,
        longitude: longitude,
        address: address,
      };
    } else {
      return {
        latitude: latitude,
        longitude: longitude,
        address: "Không xác định",
      };
    }
  } catch {
    return {
      latitude: latitude,
      longitude: longitude,
      address: "Không xác định",
    };
  }
};

export default GetLocationTitle;
