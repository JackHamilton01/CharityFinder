import * as geocoding from "../../geocoding/geocoding.js";

describe("getLatLng", () => {
  beforeAll(() => {
    global.google = {
      maps: {
        importLibrary: jest.fn().mockResolvedValue({
          Geocoder: jest.fn().mockImplementation(() => ({
            geocode: jest.fn().mockResolvedValue({
              results: [{ geometry: { location: { lat: 1, lng: 2 } } }],
            }),
          })), 
        }),
      },
    };
  });

  // Optional: Clean up after tests
  afterAll(() => {
    delete global.google;
  });

  test('getLatLng throws error when address is missing', async () => {
    await expect(geocoding.getLatLng(null, 'US', '12345')).rejects.toThrow(
      'Address is required for geocoding.'
    );
  });

  test('getLatLng throws error when county restriction is missing', async () => {
    await expect(geocoding.getLatLng('123 Main St', null, '12345')).rejects.toThrow(
      'County restriction is required for geocoding.'
    );
  });

  test('getLatLng throws error when postal code restriction is missing', async () => {
    await expect(geocoding.getLatLng('123 Main St', 'US', null)).rejects.toThrow(
      'Postal code restriction is required for geocoding.'
    );
  });

  test("getLatLng returns coordinates when all data is valid", async () => {
    const result = await geocoding.getLatLng("123 Main St", "US", "12345");
    expect(result).toEqual({ lat: 1, lng: 2 });
  });
});