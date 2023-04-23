const inputImage = document.getElementById('imageInput')
const preview = document.getElementById('preview')
const resetImage = document.getElementById('deleteButton')
//console.log(inputImage)
const translateButton = document.getElementById('translateButton')
//console.log(translateButton)

resetImage.addEventListener('click', function(){
    refreshPage()
  })
  function refreshPage(){
    window.location.reload()
  }

//If "choose file" button is clicked
//the button will be "changed" from original status
inputImage.addEventListener('change', function () {
    changeImage(this)
});

//If button above is changed = true, use this function.
//This function will grab the uploaded image turn it into an urlObject and send it back for preview
function changeImage(inputImage) {

    if (inputImage.files && inputImage.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            console.log('changed')
            //Grabs the src and turns it to an url object and returns it as a preview
            preview.src = e.target.result;
            //console.log(preview)
        }
        reader.readAsDataURL(inputImage.files[0]);
    }
}

function sendImageToBackend() {

    let image = document.getElementById("imageInput")
    let language = document.getElementById("languageInput")

    let formData = new FormData();

    formData.append("image", image.files[0])
    formData.append("language", language.value)

    const options = {
        method: "POST",
        body: formData
    }
  //This little piece of trouble will grab the Tesseract data and eventually display the text at the front-end
    fetch("http://localhost:3001/upload", options)
    //Grabbing the back-end text and convert it to json data
        .then(response => response.json()
            .then(data => {
                //console.log(data, typeof data)
                document.getElementById("recognizedText").innerHTML = data.recognizedText;
            }))
}


translateButton.addEventListener('click', function (){
    sendRecognizedTextToBackend(this)
})

function sendRecognizedTextToBackend() {
    let recognizedText = document.getElementById('recognizedText').innerHTML
    console.log(recognizedText)
    let translatedText = document.getElementById('translatedText')
    console.log(translatedText)

    let formData = new FormData();

    formData.append("recognizedText", recognizedText)
    formData.append("translatedText", translatedText.innerHTML)

    const options = {
        method: "POST",
        body: formData
    }

    fetch("http://localhost:3001/translation", options)
    //Grabbing the back-end text and convert it to json data
        .then(response => response.json()
            .then(data => {
                console.log(typeof data, data)
                document.getElementById("recognizedText").innerHTML = data.recognizedText;
            }))
}
