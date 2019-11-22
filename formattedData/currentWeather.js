class currentForecast {
  constructor(currentData) {
    this.summary = currentData.summary,
    this.icon = currentData.icon,
    this.precipIntensity = currentData.precipIntensity,
    this.precipProbability = currentData.precipProbability,
    this.temperature = currentData.temperature,
    this.humidity = currentData.humidity,
    this.pressure = currentData.pressure,
    this.windSpeed = currentData.windSpeed,
    this.windGust = currentData.windGust,
    this.windBearing = currentData.windBearing,
    this.cloudCover = currentData.cloudCover,
    this.visibility = currentData.visibility
  }
};

module.exports = currentForecast;
