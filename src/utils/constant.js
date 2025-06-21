// export const BaseUrl= "/api";

// export const BaseUrl = location.hostname==="localhost"?"http://localhost:3000":"/api"
export const BaseUrl =
  location.hostname === "localhost"
    ? "http://localhost:3000"
    : import.meta.env.VITE_API_URL;
