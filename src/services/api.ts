export async function fetchCities(newCityName: string) {
  const API = 'https://api.openweathermap.org/data/2.5/weather';
  const APP_ID = '11f318a690a3344c55c1d0514a768fe1';

  const response = await fetch(
    `${API}?q=${newCityName}&appid=${APP_ID}&units=metric`
  );

  return response;
}
