export type City = {
  name: string;
  id: number;
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
