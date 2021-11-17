prediction1 = ""
prediction2 = ""

Webcam.set ({
    width : 350,
    height : 350,
    image_format : 'jpg',
    jpg_quality : 100
})

camera = document.getElementById("camera").innerHTML
Webcam.attach ("#camera")

function takeSnapshot(){
    Webcam.snap (function(data_uri){
      document.getElementById("result").innerHTML = '<img id = "snappedimage" src = "' + data_uri + '"/>' 
    })
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modeloaded)
function modeloaded (){
    console.log("The model has been loaded")
}

function speak (){
    synth = window.speechSynthesis;
    speak_data_1 = "The first Prediction is  " + prediction1;
    speak_data_2 = "And the second Prediction is  " + prediction2;
    utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis)
}

function check (){
    img = document.getElementById("snappedimage");
    classifier.classify(img,gotresult)
}

function gotresult(error,results){
    if (error){
        console.error(error)
    }

    else {
        console.log(results)
        prediction1 = results[0].label
        prediction2 = results[1].label
        document.getElementById("result_emotion_name1").innerHTML = prediction1
        document.getElementById("result_emotion_name2").innerHTML = prediction2

        speak()

      if (prediction1=="happy"){
          document.getElementById("update_emoji1").innerHTML = "&#128522"
      } 
      
      if (prediction1=="sad"){
        document.getElementById("update_emoji1").innerHTML = "&#128532"
    }

    if (prediction1=="angry"){
        document.getElementById("update_emoji1").innerHTML = "&#128548"
    }

    if (prediction2=="happy"){
        document.getElementById("update_emoji2").innerHTML = "&#128522"
    } 
    
    if (prediction2=="sad"){
      document.getElementById("update_emoji2").innerHTML = "&#128532"
  }

  if (prediction2=="angry"){
      document.getElementById("update_emoji2").innerHTML = "&#128548"
  }
    }
}