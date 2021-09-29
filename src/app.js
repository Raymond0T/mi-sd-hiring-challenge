import { convertDate } from "./utils";

let dayOfWeek = {
    0 : "Sunday",
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday",
    5 : "Friday",
    6 : "Saturday"
}

let location = document.getElementById("location");
let btn = document.getElementById("submit-btn");
let city = document.getElementById("city");
let parent = document.getElementById("forecast");

//get the longitude and latitude of the zip code 
const getCoordinates = async () =>{

    let API = `https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${location.value}`;

    try{
        const res = await fetch(API);
        const parseRes = await res.json();
        return parseRes;
    }
    catch(err){
        return (err.message);
    }
}


btn.addEventListener("click", async function(){
    //retrieving the information for our second api
    let coorData = await getCoordinates();
    let date = new Date().toLocaleDateString(); 
    let location_name = coorData.city;
    
    let location_API = `https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${coorData.latitude}&longitude=${coorData.longitude}&date=${date}`;
    parent.innerHTML = '';

    try{
        const res = await fetch(location_API);
        const parseRes = await res.json();

        //storing the final weather data from api in arr
        let arr = parseRes.daily.data;
    
        city.innerHTML = "WEATHER FORECAST FOR " + location_name.toUpperCase();
        

        for(let i = 0; i < 3; i++){
            let cur = arr[i];
            let day = new Date(convertDate(cur.time)).getDay();

            //create container for each day
            let box = document.createElement("div");
            box.classList.add("day");
            
            //add information to container
            //creating the text for day-of-week
            let h3 = document.createElement("h3");
            let node;
            i == 0 ? node = document.createTextNode("Today: ") : node = document.createTextNode(`${dayOfWeek[day]}: `);
            h3.appendChild(node);

            //creating the correct image 
            let img = document.createElement("img");
            img.src = `../img/${cur.icon}.png`;

            //creating the text for temperature
            let p = document.createElement("p");
            node = document.createTextNode(`${cur.icon}`);
            p.appendChild(node);
            p.appendChild(document.createElement("br"));
            node = document.createTextNode(`${cur.temperatureHigh}° F`);
            p.appendChild(node);

            //add everything to the day container
            box.appendChild(h3);
            box.appendChild(img);
            box.appendChild(p);
            
            
            parent.appendChild(box);
        }
    
    }
    catch(err){
        return err.message;
    }

});