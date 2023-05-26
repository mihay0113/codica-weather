export type City = {
  name: string;
  id: number;
  date: number;
  weather: [
    {
      description: string;
      main: string;
    }
  ];
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
};
