const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (apiKey) {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&loading=async`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
} else {
  console.error(
    "API Key not found. Did you start the server with 'npm run dev'?"
  );
}
