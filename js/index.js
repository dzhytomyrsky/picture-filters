// MOVE IMAGE INDICATOR FUNCTION

function moveImageIndicator (event) {
    var target = document.getElementById('adjusted-image');
    var coordinates = target.getBoundingClientRect();

    target.style.width = event.pageX - coordinates.left + 'px';

    switch (event.type) {
        case 'mousemove':
            target.style.transition = 'width 0s';
            break;
        default:
            target.style.transition = 'width .2s';
    }
}

var imageFrame =  document.getElementById('image-frame');

document.getElementById('image-frame').addEventListener('mousedown', function (event) {
    moveImageIndicator(event);
    imageFrame.addEventListener('mousemove', moveImageIndicator);
});

document.querySelector('body').addEventListener('mouseup', function (event) {
    imageFrame.removeEventListener('mousemove', moveImageIndicator);
});

// CHANGE FILTER STYLE

var filterStyle = "grayscale";
var filtersList = document.querySelectorAll('.filter-list li');
var filtersArray = Array.from(filtersList);

function changeFilterStyle (event) {
    var filterStyleLabel = event.target.innerText.toLowerCase();
    filterStyle = filterStyleLabel;

    var imageAdjustmentRange = document.getElementById('image-adjustment-range');
    var target = document.getElementById('adjusted-image');
    target.style.filter = filterStyle + "(" + imageAdjustmentRange.value + "%)";

    var menu = document.querySelector('.filter-list');
    menu.classList.remove('opened');

};

filtersArray.map(function (item) {
    item.addEventListener('click', changeFilterStyle)
});


// ADJUST FILTER PERCENTAGE FUNCTION

var imageAdjustmentRange = document.getElementById('image-adjustment-range');

imageAdjustmentRange.addEventListener('change', function () {
    var target = document.getElementById('adjusted-image');
    target.style.filter = filterStyle + "(" + imageAdjustmentRange.value + "%)";
})

// IMAGE SWITCH

var imagesList = document.querySelectorAll('.images-list div');
var imagesArray = Array.from(imagesList);

function switchImage (event) {
    var eventTarget = event.target;
    var imageSource = eventTarget.childNodes[1].src;
    var imageFrame = document.getElementById('image-frame');
    var adjustedImage = document.getElementById('adjusted-image');
    var currentImage = document.querySelector('.current-image')

    currentImage.classList.remove('current-image');
    eventTarget.classList.add('current-image');

    imageFrame.style.backgroundImage = 'url(' + imageSource + ')';
    adjustedImage.style.backgroundImage = 'url(' + imageSource + ')'
}

imagesArray.map(function (item) {
    item.addEventListener('click', switchImage)
});

// TOGGLE FILTERS MENU

var filterMenuButton = document.getElementById('select-filter-button');

function toggleFiltersMenu (event) {
    var menu = document.querySelector('.filter-list');
    menu.classList.toggle('opened');
}

filterMenuButton.addEventListener('click', toggleFiltersMenu);
