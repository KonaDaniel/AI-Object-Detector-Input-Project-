status = "";
object = "";

function setup()
{
    canvas = createCanvas(500, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(480, 380);
}

function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object = document.getElementById("input_object_name").value;
}

function modelLoaded()
{
    console.log("Model is Ready!");
    status = "true";
}

function draw()
{
   image(video, 0, 0, 500, 400);
}