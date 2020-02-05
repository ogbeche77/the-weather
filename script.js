window.addEventListener("load", ()=>{ // used to get location after page has loaded
    let long;
    let lat;

    //selecting the DOM
    let temperatureDescription = document.querySelector(".temperature-discription");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureE = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span")

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{ //inbuilt javascript function that retrieves location, lat. & long.
            long = position.coords.longitude
            lat = position.coords.latitude
                //this proxy site maybe unnecessary if local host can access the api without restrictions.
            const proxy = "https://cors-anywhere.herokuapp.com/";
                //api gotten from darksky.net then quoted backwards, geolocation also changed to ${lat},${long} and ${proxy} included
            const api = `${proxy}https://api.darksky.net/forecast/f45fd163aefb3c633f0a30138a25fe5b/${lat},${long}`;
             //gets information from the above api url
        fetch(api)
        //keyword 'response' could be replaced with any word, response is converted to json as shown below
        .then(response => {
            return response.json();

        })
        .then(response =>{
            // this can also be written as temperatureDegree.textContent =response.currently.temperature; (then the function can be discarded)
            //temperatureDescription.textContent =response.currently.summary; etc
            const {temperature, summary, icon} = response.currently;

          /* console.log(response);*/
            
            // we pull out the data for temperature, summary and timezone
             //setting DOM elements that has been assigned a variable from line 6-8
             //exact object properties can be checked on the console
            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = response.timezone;
            //convert fahrenheit to celcius
            let celcius = (temperature - 32) * (5/9);


            // setting icon
            setIcons(icon, document.querySelector(".icon"));

            //changing fahrenheit to celcius
            temperatureE.addEventListener("click", () => {
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    //round to nearest whole number and call back the parameter
                    temperatureDegree.textContent = Math.floor(celcius);
                } else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            });

        });
        });
    
       
}
// skycons.JS folder was downloaded from same API site and included in the weather folder
function setIcons(icon, iconID){
    const skycons = new Skycons({ color:"white" });
    //this line is used to add the canvas as defined in the API page
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

});