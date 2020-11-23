var alldiv = document.querySelectorAll("div");

alldiv.forEach((elem) => {
    elem.style.backgroundColor = randColor();
});

function randColor() {
    var r = Math.floor(Math.random() * (230)) + 25,
        g = Math.floor(Math.random() * (230)) + 25,
        b = Math.floor(Math.random() * (230)) + 25;
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}
