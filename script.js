const left=document.querySelector('.left');
const right=document.querySelector('.right');
const slider=document.querySelector('.slider');
const Images=document.querySelectorAll('.image')
let slideNumber=1;
const length=Images.length
const nextSlide=()=>{
    slider.style.transform=translateX(-${slideNumber*1000}px);
    slideNumber++;
};
const prevSlide=()=>{
    slider.style.transform=translateX(-${(slideNumber-2)*1000}px);
    slideNumber--;
};
const getFirstSlide=()=>{
    slider.style.transform=translateX(0px);
        slideNumber=1; 
};
const getLastSlide=()=>{
    slider.style.transform=translateX(-${(length-1)*1000}px);
        slideNumber=length; 
};
right.addEventListener('click',()=>{
    if(slideNumber<length){
        nextSlide();
    }else{
        getFirstSlide();
    };
});
left.addEventListener('click',()=>{
    if(slideNumber>1){
        prevSlide();
    }else{
        getLastSlide();
    };
});

//auto play
let slideInterval;

const startSlideShow=()=>{
    slideInterval=setInterval(()=>{
        slideNumber < length ? nextSlide() : getFirstSlide();
    },4000);
};
const stopSlideShow = ()=>{
    clearInterval(slideInterval);
};

startSlideShow();

slider.addEventListener('mouseover',stopSlideShow);
slider.addEventListener('mouseout',startSlideShow);
right.addEventListener('mouseover',stopSlideShow);
right.addEventListener('mouseout',startSlideShow);
left.addEventListener('mouseover',stopSlideShow);
left.addEventListener('mouseout',startSlideShow);