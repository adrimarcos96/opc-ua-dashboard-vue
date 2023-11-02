const interval = { max: 90, min: 0 }

export const getParamsDataInRealTime = () => {
  return {
    date: new Date(),
    temperature: Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min,
    pressure: Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min,
    humidity: Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min
  }
}
