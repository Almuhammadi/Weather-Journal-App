const OPEN_WEATHER_MAP_TOKEN = '4e9aaf9b42358e39ec80d8c47259a8a9';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather/`;
const SERVER_URL = `http://localhost:3000`

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const getWeatherMap = async (baseUrl, zipCode, apiKey) => {
    const res = await fetch(`${baseUrl}?zip=${zipCode}&appid=${apiKey}`)
    const resData = await res.json();
    return resData
}

const postWeatherData = async (path, data) => {
    const res = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            temperature: data.temperature,
            date: data.date,
            userResponse: data.userResponse
        })
    });
    const resData = await res.json();
    return resData;
}
const getWeatherData = async (path) => {
    const res = await fetch(path)
    const resData = await res.json();
    return resData;
}
document.getElementById('generate').addEventListener('click', async function () {
    const zipCode = document.getElementById('zip').value;
    const response = await getWeatherMap(BASE_URL, zipCode, OPEN_WEATHER_MAP_TOKEN);
    const data = {
        temperature: response.main.temp,
        date: newDate,
        userResponse: document.getElementById('feelings').value
    };
    const response2 = await postWeatherData(SERVER_URL + '/data', data);
    console.log(response2);

    const response3 = await getWeatherData(SERVER_URL + '/data');
    console.log(response3);

    const date = document.getElementById('date');
    const temp = document.getElementById('temp');
    const content = document.getElementById('content');
    date.textContent = response3.date;
    temp.textContent = response3.temperature;
    content.textContent = response3.userResponse;

})