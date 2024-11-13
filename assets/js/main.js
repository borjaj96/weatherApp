window.addEventListener("load", () => {

    let containerWeather = document.querySelector(".container__weather");
    let input = document.querySelector(".search__input");
    let btn = document.querySelector(".search__button");


    btn.addEventListener("click", () => {

        if(input.value === ""){
            showError("Introduce una ubicación");
            return;
        }

        callApi(input.value);

        
    });


    function callApi(city){
        const apiId = "979b1d446d89ad67253bc2bd3051c9d6";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;

        fetch(url)
            .then(response => response.json())
            .then (response => {
                //console.log(response);

                if(response.cod == "404"){
                    showError("Ciudad no encontrada");
                }else{
                    
                    showWeather(response);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    function showWeather(data){
        const {name, main:{temp, temp_min, temp_max}, weather:[arr]} = data;
        let degrees = convertDegrees(temp);
        let minDegrees = convertDegrees(temp_min);
        let maxDegrees = convertDegrees(temp_max);

        clearHtml();
        containerWeather.innerHTML += `
                <h2 class="weather__location">${name}</h2>

                    <div class="weather__info">
                        <div class="info__top">
                            
                            <img src="./assets/img/icons/${arr.icon}.png" class="top__condition" alt="">
                            <span class="top__temperature">${degrees}°</span>
                        </div>
                            
                        <div class="info__bottom">
                            <span class="bottom__max">Max: ${maxDegrees}°</span>
                            <span class="bottom__min">Min: ${minDegrees}°</span>
                        </div>
                    </div>
        `;
        console.log(name);
        console.log(temp);
        console.log(temp_max);
        console.log(temp_min);
        console.log(arr.icon);



    }

    //UBICACION VACIA
    function showError(message){
        alert(message);
    }

    function convertDegrees(temp){
        return parseInt(temp - 273.15);
    }

    function clearHtml(){
        containerWeather.innerHTML = "";
    }

});