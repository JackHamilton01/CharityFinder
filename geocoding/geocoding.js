import { getGeocoder } from "./helpers/geocodingHelper.js";

export async function getLatLng(
  address,
  countyRestriction,
  postalCodeRestriction
) {
  if (!address) throw new Error("Address is required for geocoding.");
  if (!countyRestriction) throw new Error("County restriction is required for geocoding.");
  if (!postalCodeRestriction) throw new Error("Postal code restriction is required for geocoding.");

  const geocoder = await getGeocoder();

  const geocodeParameters = {
    address: address,
    componentRestrictions: {
      country: countyRestriction,
      postalCode: postalCodeRestriction,
    },
  };

  var geocodeResult = await geocoder.geocode(geocodeParameters);

  // Log if multiple results come back for an address
  if (geocodeResult.results.length > 1) {
    geocodeResult.results.forEach((result) => {
      console.log("Address: ", result.formatted_address);
    });
  }

  return geocodeResult.results[0].geometry.location;
}
