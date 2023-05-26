export async function fetchCities(newCityName: string, isDetalised: boolean) {
  const API = `https://api.openweathermap.org/data/2.5/`;
  const APP_ID = '11f318a690a3344c55c1d0514a768fe1';
  const callType = isDetalised ? 'forecast' : 'weather';
  const cnt = isDetalised ? '&cnt=10' : '';

  const response = await fetch(
    `${API}${callType}?q=${newCityName}&appid=${APP_ID}${cnt}&units=metric`
  );

  return response;
}
