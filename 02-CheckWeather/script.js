document.addEventListener('DOMContentLoaded', () => {

    const input = document.getElementById('cityinput');
    const getWeatherBtn = document.getElementById('getweather');
    const cityname = document.getElementById('cityname');
    const tempdisplay = document.getElementById('temp');
    const weather  = document.getElementById('weather');
    const error = document.getElementById('error');
    const Weather_API_Key = "";
    getWeatherBtn.addEventListener('click', async() => {
        let cityName = input.value.trim();
        //get data
        //display data
        if (cityName === '') {
            showError()
        }
        else{
        try{
          const Data = await getData(cityName);
          displayData(Data);
        }catch(err){
            showError();
        }
        }
    })

    function showError() {
        error.classList.remove('hidden');
        tempdisplay.classList.add('hidden');
        weather.classList.add('hidden');
        cityname.classList.add('hidden');
    }
    async function getData(cityName) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${Weather_API_Key}`;
        const response = await fetch(url);


        return response.json();


    }

    function displayData(Data) {
        const city = Data.name;
        const tempData = Data.main.temp;
        const weatherData = Data.weather[0].description;
        error.classList.add('hidden');
        tempdisplay.classList.remove('hidden');
        weather.classList.remove('hidden');
        cityname.classList.remove('hidden');
        cityname.innerHTML = `${city}`;
        weather.innerHTML = `Weather: ${weatherData}`;
        tempdisplay.innerHTML = `Temperature: ${tempData}&deg;C`;

    }







})
