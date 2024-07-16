// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// Current bases weather report api fetch starting here..


const city = document.getElementById("city_name");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const max_temp = document.getElementById("max_temp");
const min_temp = document.getElementById("min_temp");
const weather_type = document.getElementById("weather_type");
const img = document.getElementById("main_img");

const inp_values = localStorage.getItem("Cities");
city.innerHTML = inp_values;

let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let d = new Date();
let today = d.getDate();
let month = months[d.getMonth()];
let year = d.getFullYear()

date.innerHTML = month + " " + today + " " + year;

let API_KEY = "54dc96c99de0ea2d5bd430a3682efb02";
const Url = 'https://api.openweathermap.org/data/2.5/weather';
let full_url = `${Url}?q=${inp_values}&appid=${API_KEY}`;

fetch(full_url)
.then(result => result.json())
.then(data => {
    let mains = data.weather[0].main;
    
    if(mains == "Clouds"){
        weather_type.innerHTML = data.weather[0].main;
        img.setAttribute('src',"Images/clouds/02d@2x.png");
    }
    if(mains == "Snow"){
        weather_type.innerHTML = data.weather[0].main;
        img.setAttribute('src',"Images/clouds/snow-weather-3d-illustration-png.webp");
    }
    if(mains == "Thunderstorm"){
        weather_type.innerHTML = data.weather[0].main;
        img.setAttribute('src',"Images/clouds/11d@2x.png");
    }
    if(mains == "Drizzle"){
        weather_type.innerHTML = data.weather[0].main;
        img.setAttribute('src',"Images/clouds/09d@2x.png");
    }
    if(mains == "Rain"){
        weather_type.innerHTML = data.weather[0].main;
        img.setAttribute('src',"Images/clouds/10d@2x.png");
    }
    if(mains == "Clear"){
        weather_type.innerHTML = data.weather[0].main;
        img.setAttribute('src',"Images/clouds/01d@2x.png");
    }
    if((mains == "Mist")||(mains == "Smoke")||(mains == "Haze")||(mains == "Dust")||(mains == "Fog")||(mains == "Sand")||(mains == "Dust")||(mains == "Ash")||(mains == "Squall")||(mains == "Tornado")){
        weather_type.innerHTML = data.weather[0].main;
        img.setAttribute('src',"Images/clouds/04d@2x.png");
    }


    let deg = data.main.temp;
    let temp_val = deg - 273.15;
    temp.innerHTML = Math.floor(temp_val) + "&deg" + "c";
    
    let max_deg = data.main.temp_max;
    let max_temp_val = max_deg - 273.15;
    max_temp.innerHTML = Math.round(max_temp_val) + "&deg" + "c";
    
    let min_deg = data.main.temp_min;
    let min_temp_val = min_deg - 273.15;
    min_temp.innerHTML = Math.round(min_temp_val) + "&deg" + "c";
    min_temp.style.color = "#1E90ff";
});

// <!-- https://api.openweathermap.org/data/2.5/forecast?q={Cit_Name}&appid={API_KEY}&cnt=3 -->

// Hourly bases weather report api fetch starting here..

const hours_url = "https://api.openweathermap.org/data/2.5/forecast"

const full_hrs_url = `${hours_url}?q=${inp_values}&appid=${API_KEY}&cnt=${6}`;

fetch(full_hrs_url)
.then(res => res.json())
.then(msg =>{

const hrs_div = document.getElementById("hours_div");
let arr_list = msg.list;
for(let i=0; i < arr_list.length; i++){

    let div = document.createElement('div');
    let hr_h2 = document.createElement("h2");
    let hr_img = document.createElement("img");
    let hr_p = document.createElement("p");

    div.setAttribute("class", 'w-20 text-xl text-white text-center mt-2');
    let date = new Date(arr_list[i].dt_txt);
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let formattedTime = hours.toString();
    hr_h2.innerHTML = formattedTime + ampm;

    
    let hr_temp = arr_list[i].main.temp;
    let hr_deg = hr_temp - 273.15;
    hr_p.innerHTML = Math.floor(hr_deg) + "&deg;" + "c";
    
    if(hr_deg > 35){
        hr_img.setAttribute('src',"Images/clouds/01d@2x.png");
        hr_img.setAttribute('class',"px-2 h-16");
    }
    if((hr_deg > 21)&&(hr_deg < 27)){
        hr_img.setAttribute('src',"Images/clouds/10d@2x.png");
        hr_img.setAttribute('class',"px-2 h-16");
    }
    if((hr_deg > 15)&&(hr_deg < 19)){
        hr_img.setAttribute('src',"Images/clouds/09d@2x.png");
        hr_img.setAttribute('class',"px-2 h-16");
    }
    if((hr_deg > 5)&&(hr_deg < 15)){
        hr_img.setAttribute('src',"Images/clouds/11d@2x.png");
        hr_img.setAttribute('class',"px-2 h-16");
    }
    else if((hours < 5) && (ampm == "am")){
        hr_img.setAttribute('src',"Images/clouds/02n@2x.png");
        hr_img.setAttribute('class',"px-2 h-16");
    }
    else if((hours > 8) && (hours < 11)&&(ampm == "pm")){
        hr_img.setAttribute('src',"Images/clouds/01n@2x.png");
        hr_img.setAttribute('class',"px-2 h-16");
    }
    else if((hours == 12) && (ampm == "am")){
        hr_img.setAttribute('src',"Images/clouds/01n@2x.png");
        hr_img.setAttribute('class',"px-2 h-16");
    }
    else{
        hr_img.setAttribute('src',"Images/clouds/02d@2x.png");
        hr_img.setAttribute('class',"px-2 h-16");
    }

    div.appendChild(hr_h2);
    div.appendChild(hr_img);
    div.appendChild(hr_p);

    hrs_div.appendChild(div);
}
});

