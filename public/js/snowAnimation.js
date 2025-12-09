const MAIN_CONTAINER = document.querySelector(".main-container");


const getRandomValue = (max,min = 1) =>{
    return Math.floor(Math.random()*max) + min
}

const createSnow = (snowDensity) =>{
    for(let i=0;i<snowDensity;i++){
        const SNOW_FLAKE = document.createElement("span");
        const RANDOM_HORIZONTAL_POSITION = `${getRandomValue(100,1)}%`;
        const RANDOM_SIZE = `${getRandomValue(20,5)}px`;
        const RANDOM_OPACITY = Math.random().toFixed(2) / 2;
        const RANDOM_ANIMATION_DELAY = `${getRandomValue(30,1)}s`
        const RANDOM_ANIMATION_DURATION = `${getRandomValue(15,5)}s`
        SNOW_FLAKE.classList.add("snow");
        SNOW_FLAKE.style.right = RANDOM_HORIZONTAL_POSITION;
        SNOW_FLAKE.style.width = RANDOM_SIZE;
        SNOW_FLAKE.style.height = RANDOM_SIZE;
        SNOW_FLAKE.style.opacity = RANDOM_OPACITY;
        SNOW_FLAKE.style.animation = `fall ${RANDOM_ANIMATION_DURATION} ${RANDOM_ANIMATION_DELAY} linear infinite`;
        MAIN_CONTAINER.appendChild(SNOW_FLAKE);
    }
}

createSnow(200);