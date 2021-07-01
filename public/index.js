var images = document.querySelectorAll(".img-slider");


var idx = 0;

var interval = setInterval(run,2000)

function run() {
    idx++;
    changeImage();

}


function changeImage() {
    if(idx > images.length - 1){
        idx = 0;

    }else if (idx < 0) {
        idx =  images.length - 1;
    }
    images.forEach((image)=>image.classList.remove("active"))
    images[idx].classList.add("active");
}










 

 

 
