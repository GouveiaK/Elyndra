const listItems = document.querySelectorAll('li');
const previewBox = document.getElementById('img-alterar');

listItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const bgPath = item.getAttribute('data-bg');

        previewBox.style.backgroundImage = `url('${bgPath}')`;
    })
})