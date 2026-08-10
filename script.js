const listItems = document.querySelectorAll('li');
const previewBox = document.getElementById('img-alterar');

listItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const bgPath = item.getAttribute('data-bg');

        previewBox.style.backgroundImage = `url('${bgPath}')`;
    })
});


let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
    nextImage();
}, 3000);

function nextImage(){
    count++;
    if (count>5){
        count = 1;
    }
    document.getElementById('radio' + count).checked = true;
}