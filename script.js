// object for one day forecast
let weather = {
  apiKey: "43e89201c071c4d5a74c1129bd415327",
 
  getOnedayForecast : function(cityname){
    this.fetchWeather(cityname);
  },
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" + 
      city + "&units=metric&appid=" + 
      this.apiKey
      ).then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    //console.log(data);
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;

    let today = new Date().toLocaleDateString();
    //console.log(today);
    
    document.querySelector("#informationcard_name_of_city").innerText = name + "(" + today +")";
    document.querySelector("#informationcard_name_of_city_icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector("#informationcard_temp").innerText = "Temp: " + temp + "°F";
    document.querySelector("#informationcard_wind").innerText = "Wind: " + speed + " MPH";
    document.querySelector("#informationcard_humidity").innerText = "Humidity: " +humidity + " %";
    document.querySelector("#informationcard_uvindex").innerText = "UV Index: " + "'" + description + "'";
  },
};  

//object for 5 days forecast
let weather2 = {
  apiKey: "43e89201c071c4d5a74c1129bd415327",

  getFiveDaysForecast : function(cityname){
    this.fetchForecast(cityname);
  },
  fetchForecast: function(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city + "&appid=c3c94d0094c326073d407b41057affc5"
      ).then((response) => response.json())
      .then((data) => this.displayForecast(data));
  },
  displayForecast: function (data) {
    //console.log(data);
    //const {name} = data.city;
    //console.log(data.list[0]);
    let today = new Date().toLocaleDateString();
    document.querySelector('.weathercards').innerHTML = '';
    
    // create and append Elements to 5 cards
    for (i=0; i<5; i++){
      const five_days_data = data.list[i];
      const {icon} = five_days_data.weather[0];
      const {temp, humidity} = five_days_data.main;
      const {speed} = five_days_data.wind;
      
      var todayheader = document.createElement('header');
      var iconimg = document.createElement('img');
      var tempp = document.createElement('p');
      var speedp = document.createElement('p');
      var humidityp = document.createElement('p');
      
      var card = document.createElement('section');
      card.setAttribute('class', 'card');

      todayheader.textContent = today;
      iconimg.src = "https://openweathermap.org/img/wn/" + icon + ".png";;
      tempp.textContent = "Temp: " + temp + "°F";
      speedp.textContent = "Wind: " + speed + " MPH";
      humidityp.textContent = "Humidity: " +humidity + " %";

      card.append(todayheader);
      card.append(iconimg);
      card.append(tempp);
      card.append(speedp);
      card.append(humidityp);
      
      document.querySelector('.weathercards').append(card);
    };
  },
};  

document.querySelector("#searchbtn").addEventListener("click", function(){
  var cityname = document.querySelector("#inputcityname").value;
    weather2.getFiveDaysForecast(cityname);
    weather.getOnedayForecast(cityname);
});

document.querySelector("#inputcityname").addEventListener("keyup", function(event){
  if (event.key == "Enter") {
    var cityname = document.querySelector("#inputcityname").value;
    weather2.getFiveDaysForecast(cityname);
    weather.getOnedayForecast(cityname);
  }
});

// assign eventlistener to buttons
var allbtns = document.querySelectorAll('button');
for(const button of allbtns){
  if(button.innerHTML!='Search'){
    button.addEventListener('click', function(){
      document.querySelector("#inputcityname").value = '';
      weather2.getFiveDaysForecast(this.textContent);
      weather.getOnedayForecast(this.textContent);
    })
  }
}

// as an example give the city name 'San Diego' for the first search
document.querySelector("#inputcityname").value = 'San Diego';
var cityname = document.querySelector("#inputcityname").value;

// as an example execute search
weather2.getFiveDaysForecast(cityname);
weather.getOnedayForecast(cityname);
