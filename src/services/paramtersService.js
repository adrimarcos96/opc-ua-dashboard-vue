const interval = { max: 90, min: 0 }

export const getInitialParamsData = () => {
  const data =  []

  for (let i = 0; i < 60; i++) {
    data.push({
      date: new Date(Date.now() - (5000 * (60 - i))),
      temperature: Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min,
      pressure: Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min,
      humidity: Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min
    })
  }

  return data
}

export const getParamsDataInRealTime = () => {
  return {
    date: new Date(),
    temperature: Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min,
    pressure: Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min,
    humidity: Math.floor(Math.random() * (interval.max - interval.min + 1)) + interval.min
  }
}
