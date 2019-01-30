// Initialize Firebase

var config = {
    apiKey: "AIzaSyBMEDSC3HQVLtLX84QgAyh_49_ePQpLQZc",
    authDomain: "quiz-app-8cdfa.firebaseapp.com",
    databaseURL: "https://quiz-app-8cdfa.firebaseio.com",
    projectId: "quiz-app-8cdfa",
    storageBucket: "quiz-app-8cdfa.appspot.com",
    messagingSenderId: "11116360427"
  };
  firebase.initializeApp(config);
  
  
  var db=firebase.database()
  var auth=firebase.auth()




// signup

function signup(){
    var lname=document.querySelector(".lname");
    var fname=document.querySelector(".fname");
    var email=document.querySelector(".email");
    var pass=document.querySelector(".pass");
    var eror=document.getElementById("eror")

    if(lname.value===""||lname.value===" "){
      eror.innerHTML="please enter your last name"
    }
    else if(fname.value===""||fname.value===" "){
        eror.innerHTML="please enter your first name"
      }

      else if(email.value===""||email.value===" "){
        eror.innerHTML="please enter your email"
      }

      else if(pass.value===""||pass.value===" "){
        eror.innerHTML="please enter your password"
      }
    // console.log(lname.value)
    // console.log(fname.value)
    // // console.log(pnum.value)
    // console.log(email.value)
    // console.log(pass.value)
else{
   auth.createUserWithEmailAndPassword(email.value, pass.value).
   then(function(result){
       var obj={
    Name:fname.value+" "+lname.value,
    email:email.value,
    // number:pnum.value,
    uid:result.user.uid

       }

      db.ref("pakolx/").child("users/"+"/"+result.user.uid).set(obj)
       console.log("Result" + result)

       swal({
        title: "Congrats",
        text: "Your Account created sucessfully",
        icon: "success",
        button: "close"
      });
    
       window.location="./login.html"
     lname.value=""
      fname.value=""
      pnum.value=""
      email.value=""
      pass.value=""
   })


   .catch(function(error){
    console.log("eror" + error)
    console.log("error"+error.message)

    swal({
        title:" error",
        text: error.message,
        icon: "warning",
        buttons: "close"
        
      })    
   })

}
}

// signup



// login

function login(){
    let email1 = document.querySelector(".email1");
    let pass1 = document.querySelector(".pass1");
    firebase.auth().signInWithEmailAndPassword(email1.value, pass1.value)
    .then(function(result){
        window.location="../index.html"
        email1.value=""
        pass1.value=""
        document.getElementById("logout").style.display="block"
        document.getElementById("login").style.display="none"
      
    })
    .catch(function(error) {
       
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        swal({
            title:" error",
            text: error.message,
            icon: "warning",
            buttons: "close"
            
          })    
      });
    }

// login


// adds 

var fname = document.querySelector(".fullname");
var title = document.getElementById("sel1");
var price = document.querySelector(".price");
var num = document.querySelector(".contact");
var descr = document.querySelector(".Description");
var model = document.querySelector(".model");
var eror1=document.getElementById("eror1")
// console.log(descr.value)
// // File
var fileBtn = document.querySelector(".file");
var progressBar = document.getElementById("uploader");

fileBtn.addEventListener("change", async function (e) {
    //   get a file
    file = e.target.files[0];
});

function postMyAd() {

    if(fname.value===""||fname.value===" "){
    eror1.innerHTML="please enter your Name"
    }

   else if(title.value===""||title.value===" "){
        eror1.innerHTML="please enter your title"
        }

     else if(price.value===""||price.value===" "){
         eror1.innerHTML="please enter your price"
        }
     
        else if(num.value===""||num.value===" "){
            eror1.innerHTML="please enter your number"
           }   
   else if(descr.value===""||descr.value===" "){
      eror1.innerHTML="please enter your description"
     } 
     else if(model.value===""||model.value===" "){
        eror1.innerHTML="please enter your model"
       }   
       else{ 

document.getElementById("uploader").style.display="block"

//     //   create a storage ref
var storageRef = firebase.storage().ref("olxpak/" + file.name);
//     //   upload a file
var uploadTask = storageRef.put(file);

//     // Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
function (snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    progressBar.value = percentage;
    console.log('Upload is ' + percentage + '% done');
    switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
    }
},
 function (error) {

// //             // A full list of error codes is available at
// //             // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
        case 'storage/unauthorized':
            console.log(error, "User doesn't have permission to access the object");
            break;

        case 'storage/canceled':
            console.log(error, "User canceled the upload");
            break;

        case 'storage/unknown':
            console.log(error, "Unknown error occurred, inspect error.serverResponse");
            break;
    }
}, function () {

storageRef.getDownloadURL().then(function(url) {
//   window.alert(url);
var postData = {
            fname:fname.value,
            title:title.value,
            price:price.value,
            number:num.value,
            description:descr.value,
            model:model.value,
            user: firebase.auth().currentUser.uid,
            imageUrl:url
        };

        var uid=firebase.auth().currentUser.uid
        // console.log(postData)
      var key= firebase.database().ref("pakolx").child("posts/"+title.value).push()
       key.set(postData)
       .then(function(result){
           console.log("pushed");

           swal({
            title: "Congrats",
            text: "Your Add posted sucessfully",
            icon: "success",
            button: "close",
          });

           fname.value=""
           title.value=""
           price.value=""
           num.value=""
           descr.value=""
           fileBtn.value=""
document.getElementById("uploader").style.display="none"
window.location="../index.html"
           
       })
       .catch(function(error) {
       
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)

        swal({
            title:" error",
            text: errorMessage,
            icon: "warning",
            buttons: "close"
            
          })    
        
      });


     
});
})
       }
}

// adds 


firebase.auth().onAuthStateChanged(function(user){
    if(user){
      // window.location="./pages/form.html"
      document.getElementById("logout").style.display="block"
      document.getElementById("login").style.display="none"
  
      
    }
    else{
      // window.location="./pages/login.html"
      // document.getElementById("logout").innerHTML="login"
      document.getElementById("logout").this.style.display="none"
      document.getElementById("login").this.style.display="block"
    }
  })






 
  

