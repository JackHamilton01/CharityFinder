let geocoder = null;

export async function getGeocoder() {
    if (geocoder){
        return geocoder;   
    }

    if (typeof google === 'undefined' || !google.maps) {
        throw new Error("Google Maps script not loaded yet. Check your index.html script tag.");
    }

    const { Geocoder } = await google.maps.importLibrary("geocoding");
    geocoder = new Geocoder();
    
    return geocoder;
}