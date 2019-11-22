class hourlyForecast {
  constructor(hourlyData) {
    this.summary = hourlyData.summary,
    this.icon = hourlyData.icon,
    this.data = hourlyData.data
  }
};

module.exports = hourlyForecast;
