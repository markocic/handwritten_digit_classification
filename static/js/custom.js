let canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    w = 0,
    h = 0,
    dot_flag = false;

let x = "white", // Default brush color
    y = 14; // Default brush size

function init() {
    // set dimensions of color picker squares
    const cp_color = document.getElementsByClassName("cp_color");
    const cp_width = document.getElementById("color_picker");
    for (var i = 0; i < cp_color.length; i++) {
        cp_color[i].style.height = cp_width.offsetWidth / 8;
        cp_color[i].style.width = cp_width.offsetWidth / 8;
    }

    canvas = document.getElementById('can');

    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    // make it a square
    canvas.height = canvas.width;

    $("#predicted_digit").css("height", $("#can").outerHeight() + "px");
    $("#predicted_digit").css("line-height", $("#can").outerHeight() + "px");
    console.log("here");

//    dig = document.querySelector('.dig');
//    dig.style.lineHeight = canvas.width;
//    dig.style.height = canvas.width;

    ctx = canvas.getContext("2d");

    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
}

function color(obj) {
    switch (obj.id) {
        case "black":
            x = "black";
            break;
        case "white":
            x = "white";
            break;
    }
    if (x == "black") y = 30;
    else y = 14;

}

function draw() {
    ctx.beginPath();
    ctx.arc(currX, currY, y, 0, 2 * Math.PI, false);
    ctx.fillStyle = x;
    ctx.fill();

    /*ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();*/
}

function erase() {
//    const m = confirm("Want to clear");
//    if (m) {
        ctx.clearRect(0, 0, w, h);
//    }
}

function get_canvas_pixels() {
    let canData = ctx.getImageData(0, 0, canvas.width, canvas.height); // get canvas pixels in an array
    let blackAndWhiteCanvas = []; // empty array to convert to black and white
    let convertedImage = []; // empty array to generate a matrix from blackAndWhiteCanvas array
    for (let i = 0; i < canvas.width; i++)
    {
        convertedImage[i] = new Array(canvas.width);
    }

    // convert pixels from canData to only black and white
    for (let i = 0, j = 0; i < canData.data.length; i += 4, j++) {

        if (canData.data[i] === 255 && canData.data[i + 1] === 255 && canData.data[i + 2] === 255)
        {
            blackAndWhiteCanvas[j] = 255;
        }
        else
        {
            blackAndWhiteCanvas[j] = 0;
        }
    }

    // convert 1d array to 2d matrix canvas.width x canvas.height dimensions
    let counter = 0;
    for (let i = 0; i < canvas.width; i++)
    {
        for (let j = 0; j < canvas.height; j++)
        {
            convertedImage[i][j] = blackAndWhiteCanvas[counter];
            counter++;
        }
    }

    return convertedImage;
}


function save_canvas_to_png() { // Sends pixel values to python

    let img = canvas.toDataURL("image/png");

    // save function
    /*document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";*/
}

function findxy(res, e) {

    // finding offset left of container div
    var window_width = window.innerWidth;
    var main_container_width = document.getElementById("main_container").offsetWidth;
    var offsetLeft = (window_width - main_container_width) / 2;

    // finding top offset
    var window_height = $(window).outerHeight();
    var main_container_height = $("#main_container").height();
    var bodyTopMargin = (window_height - main_container_height) / 2;

    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - offsetLeft;
        currY = e.clientY - bodyTopMargin;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - offsetLeft;
            currY = e.clientY - bodyTopMargin;
            draw();
        }
    }
}