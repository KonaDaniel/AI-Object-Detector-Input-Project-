status = "";
object_one = "";
results_objects = [];

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
    object_one = document.getElementById("input_object_name").value;
}

function modelLoaded()
{
    console.log("Model is Ready!");
    status = "true";
}

function draw()
{
   image(video, 0, 0, 500, 400);

   if(status != "")
   {
    objectDetector.detect(video, gotResults);

       for(i = 0; i < results_objects.length; i++)
       {

        console.log("working");
        percent = floor(results_objects[i].confidence * 100);
        name = results_objects[i].label;

        fill("red");
        text(results_objects[i].label + " " + percent + "%", results_objects[i].x + 15, results_objects[i].y + 15);
        noFill();
        stroke("red");
        rect(results_objects[i].x, results_objects[i].y, results_objects[i].width, results_objects[i].height);

        if(name == object_one)
        {
            video.stop();
            objectDetector.detect(gotResults);
            document.getElementById("status").innerHTML = object_one + " found";

            speechSynthesis = window.speechSynthesis;
            speak_Data = object_one + " found";
            speechSynthesisUtterThis = new SpeechSynthesisUtterance(speak_Data);
            speechSynthesis.speak(speechSynthesisUtterThis);
        }
        else{
            document.getElementById("status").innerHTML = object_one + " not found";
        }
       }
   }
}

function gotResults(error, results)
{
    if (error)
    {
        console.log(error);
    }

    console.log(results);
    results_objects = results;
}