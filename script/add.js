
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
// var currentUser=firebase.auth().currentUser.uid
// console.log(currentUser)









// index.html


async function adds() {
  await firebase.database().ref("pakolx").child("posts/").once("value", (data) => {
    var object = data.val();
    var arr = [];

    for (var key in object) {
      // console.log(  object[key])

      var postObject = object[key]
      for (var pop in postObject) {
        arr.push(postObject[pop])

      }
    }
    console.log(arr)

    localforage.setItem('key', object).then(() => {
      console.log('Data has been saved in indexDB');
    })

    var adContainer = document.getElementById("ads");

    arr.map((v, i) => {


      // cardDeck = document.createElement("DIV");
      // cardDeck.className = "card-deck";
      // adContainer.appendChild(cardMb3Hoverable);


      var cardMb3Hoverable = document.createElement("DIV");
      cardMb3Hoverable.setAttribute("class", "card mb-4 hoverable");
      adContainer.appendChild(cardMb3Hoverable);

      var viewOverlayZoom = document.createElement("DIV");
      viewOverlayZoom.setAttribute("class", "view overlay zoom");
      viewOverlayZoom.style.backgroundColor = "grey"
      cardMb3Hoverable.appendChild(viewOverlayZoom);

      var cardImgTop = document.createElement("IMG");
      cardImgTop.className = "img-fluid card-img-top waves-effect waves-light";
      cardImgTop.setAttribute("id", "adImg");
      cardImgTop.setAttribute("src", v.imageUrl);
      viewOverlayZoom.appendChild(cardImgTop);

      var cardBody = document.createElement("DIV");
      cardBody.setAttribute("class", "card-body");
      cardMb3Hoverable.appendChild(cardBody);

      var cardTitle = document.createElement("H2");
      cardTitle.setAttribute("class", "card-title");
      cardTitle.innerHTML = v.title;
      // cardTitle.toUppercase()
      cardBody.appendChild(cardTitle);

      var cardText = document.createElement("p");
      cardText.setAttribute("class", "card-text");
      cardText.style.fontSize = "16px"
      cardText.innerHTML = v.description;
      cardBody.appendChild(cardText);

      var cardPriceTag = document.createElement("H3");
      cardPriceTag.setAttribute("class", "red-text");
      cardPriceTag.innerHTML = "Rs.";


      var cardPrice = document.createElement("h4");
      cardPrice.setAttribute("class", "red-text");
      cardPrice.innerHTML = v.price + "/" + "-";
      cardPrice.style.display = "inline";
      cardPriceTag.appendChild(cardPrice);
      cardPrice.style.color = "white !important"

      cardBody.appendChild(cardPriceTag);

      var hr = document.createElement("HR");
      cardBody.appendChild(hr);

      var adPostBy = document.createElement("P");
      adPostBy.innerHTML = "AD Posted By: ";
      cardBody.appendChild(adPostBy);

      var adPosterName = document.createElement("SPAN");
      adPosterName.className = "text-secondary";
      adPosterName.innerHTML = v.fname;
      adPosterName.style.color = "blue"
      // adPosterName.style.fontWeight="bolder"

      adPostBy.appendChild(adPosterName);



      var adPosterNum = document.createElement("P");
      adPosterNum.innerHTML = "Contact Number: ";

      var adPosterNumber = document.createElement("SPAN");
      adPosterNumber.innerHTML = v.number;
      adPosterNumber.className = "text-secondary"
      adPosterNum.appendChild(adPosterNumber);
      adPosterNumber.style.color = "blue"
      // adPosterNumber.style.fontWeight="bold"

      cardBody.appendChild(adPosterNum);

      var watchlater = document.createElement("button");
      var btntext = document.createTextNode("Watch Later")
      watchlater.appendChild(btntext);
      watchlater.setAttribute("class", "btn btn-danger")
      cardBody.appendChild(watchlater)


      watchlater.addEventListener("click", function () {

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
        let currentUser = firebase.auth().currentUser.uid;

        let obj = {
          description: v.description,
          name: v.fname,
          imageurl: v.imageUrl,
          num: v.number,
          price: v.price,
          title: v.title,
          user: currentUser
        }
        console.log(obj)

        //   })
        firebase.database().ref("pakolx").child("favourite/" + currentUser).push(obj)

        swal({
          title: "Congrats",
          text: "this add added to favourite",
          icon: "success",
          button: "close"
        });

      }
      else{
        alert("login first please")
      }
    })

      })

      var chat = document.createElement("button");
      var btntext = document.createTextNode("Add to Chat list")
      chat.appendChild(btntext);
      chat.setAttribute("class", "btn btn-secondary")
      cardBody.appendChild(chat)




      chat.addEventListener("click", function () {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
        let currentUser = firebase.auth().currentUser.uid;
        let frend = v.user
        console.log(frend)
        // frenduid=v.user
        localStorage.setItem('friendUID', v.user)
        firebase.database().ref("pakolx/" + "users/" + currentUser + "/" + "chatroom/" + frend + '/').push("hey")
        firebase.database().ref("pakolx/" + "users/" + frend + '/' + "chatroom/" + currentUser + '/').push("hi")


        // localStorage.setItem("name",v.fname)

        swal({
          title: "success!",
          text: "User Added in your Chat list",
          icon: "success",
        });
        window.location = "./pages/chats.html"
      }
      else{
        alert("please login first")
        
      }
    })
      })
    
  

    })
  })

}












function search() {
  var search = document.getElementById("search").value.toUpperCase();
  // var filter=search.toUpperCase();
  var card = document.getElementsByClassName('card');
  var cardb = document.getElementsByClassName('card-body');

  // var cardm = document.getElementsByClassName('card mb-4 hoverable');

  for (i = 0; i < cardb.length; i++) {
    // var h2 = cardb[i].getElementsByTagName("h2")[0];
    // if (h2.innerHTML.toUpperCase().indexOf(search) > -1) {
    //   cardb[i].style.display = "";
    //   card[i].style.display = "";
    //   // cardm[i].style.display=""

    // }
    // else {
    //   cardb[i].style.display = "none";
    //   card[i].style.display = "none"
    // }
    var h4 = cardb[i].getElementsByTagName('h2')[0];
    if (h4.innerHTML.toLocaleUpperCase().indexOf(search) > -1) {
      card[i].style.display = '';
    }
    else {
      card[i].style.display = 'none';
    }
  }
}



function addpost() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.location = "./pages/form.html"



    }
    else {
      window.location = "./pages/login.html"

    }
  })
}



function signout() {
  firebase.auth().signOut().then(function () {
    swal({
      title: "Congrats",
      text: "You are signed out sucessfully",
      icon: "success",
      button: "close",
    });
    document.getElementById("logout").style.display = "none"
    document.getElementById("login").style.display = "block"


  }, function (error) {
    console.error('Sign Out Error', error);
  });
}


var category = document.getElementById("category")
category.addEventListener('change', e => {
  document.getElementById("ads").innerHTML = ""
  document.getElementById("set").innerHTML = ""
  document.getElementById("fav").innerHTML = ""
  var array = []
  console.log(e.target.value)
  var cat = e.target.value
  firebase.database().ref("pakolx").child("posts/" + cat).once("value", (data) => {
    // console.log(data.val())

    var object = data.val()
    for(var key in object){
      // console.log(object[key])
      var postObject=object[key]
      array.push(postObject)
    }
    console.log(array)

    var adContainer = document.getElementById("set");

    
    array.map((v, i) => {


      // cardDeck = document.createElement("DIV");
      // cardDeck.className = "card-deck";
      // adContainer.appendChild(cardMb3Hoverable);


      var cardMb3Hoverable = document.createElement("DIV");
      cardMb3Hoverable.setAttribute("class", "card mb-4 hoverable");
      adContainer.appendChild(cardMb3Hoverable);

      var viewOverlayZoom = document.createElement("DIV");
      viewOverlayZoom.setAttribute("class", "view overlay zoom");
      viewOverlayZoom.style.backgroundColor = "grey"
      cardMb3Hoverable.appendChild(viewOverlayZoom);

      var cardImgTop = document.createElement("IMG");
      cardImgTop.className = "img-fluid card-img-top waves-effect waves-light";
      cardImgTop.setAttribute("id", "adImg");
      cardImgTop.setAttribute("src", v.imageUrl);
      viewOverlayZoom.appendChild(cardImgTop);

      var cardBody = document.createElement("DIV");
      cardBody.setAttribute("class", "card-body");
      cardMb3Hoverable.appendChild(cardBody);

      var cardTitle = document.createElement("H2");
      cardTitle.setAttribute("class", "card-title");
      cardTitle.innerHTML = v.title;
      // cardTitle.toUppercase()
      cardBody.appendChild(cardTitle);

      var cardText = document.createElement("p");
      cardText.setAttribute("class", "card-text");
      cardText.style.fontSize = "16px"
      cardText.innerHTML = v.description;
      cardBody.appendChild(cardText);

      var cardPriceTag = document.createElement("H3");
      cardPriceTag.setAttribute("class", "red-text");
      cardPriceTag.innerHTML = "Rs.";


      var cardPrice = document.createElement("h4");
      cardPrice.setAttribute("class", "red-text");
      cardPrice.innerHTML = v.price + "/" + "-";
      cardPrice.style.display = "inline";
      cardPriceTag.appendChild(cardPrice);
      // cardPrice.style.margin="10px 0px 0px 0px" 

      cardBody.appendChild(cardPriceTag);

      var hr = document.createElement("HR");
      cardBody.appendChild(hr);

      var adPostBy = document.createElement("P");
      adPostBy.innerHTML = "AD Posted By: ";
      cardBody.appendChild(adPostBy);

      var adPosterName = document.createElement("SPAN");
      adPosterName.className = "text-secondary";
      adPosterName.innerHTML = v.fname;
      adPosterName.style.color = "blue"
      // adPosterName.style.fontWeight="bolder"

      adPostBy.appendChild(adPosterName);



      var adPosterNum = document.createElement("P");
      adPosterNum.innerHTML = "Contact Number: ";

      var adPosterNumber = document.createElement("SPAN");
      adPosterNumber.innerHTML = postObject.number;
      adPosterNumber.className = "text-secondary"
      adPosterNum.appendChild(adPosterNumber);
      adPosterNumber.style.color = "blue"
      // adPosterNumber.style.fontWeight="bold"

      cardBody.appendChild(adPosterNum);


      var watchlater = document.createElement("button");
      var btntext = document.createTextNode("Watch Later")
      watchlater.appendChild(btntext);
      watchlater.setAttribute("class", "btn btn-danger")
      cardBody.appendChild(watchlater)

      var chat = document.createElement("button");
      var btntext = document.createTextNode("Add to Chatlist")
      chat.appendChild(btntext);
      chat.setAttribute("class", "btn btn-secondary")
      cardBody.appendChild(chat)


      watchlater.addEventListener("click", function () {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {

        let currentUser = firebase.auth().currentUser.uid;

        let obj = {
          description: v.description,
          name: v.fname,
          imageurl: v.imageUrl,
          num: v.number,
          price: v.price,
          title: v.title,
          user: currentUser

        }
        console.log(obj)

        //   })
        firebase.database().ref("pakolx").child("favourite/" + currentUser).set(obj)

        
        swal({
          title: "Congrats",
          text: "this add added to favourite",
          icon: "success",
          button: "close"
        });
      }
      else{
        alert("please login first")
      }
    })

      })

      chat.addEventListener("click", function () {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
        let currentUser = firebase.auth().currentUser.uid;
        let frend = v.user
        console.log(frend)
        // frenduid=v.user
        localStorage.setItem('friendUID', v.user)
        firebase.database().ref("pakolx/" + "users/" + currentUser + "/" + "chatroom/" + frend + '/').push("hey")
        firebase.database().ref("pakolx/" + "users/" + frend + '/' + "chatroom/" + currentUser + '/').push("hi")


        // localStorage.setItem("name",v.fname)

        swal({
          title: "success!",
          text: "User Added in your Chat list",
          icon: "success",
        });
        window.location = "./pages/chats.html"
      }
      else{
        alert("please login first")
      }
    })
      })



    })


  })
})


function fav() {

  if (navigator.onLine) {
    console.log('status >>>   You are ONLINE ✔✔')

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

    let currentUser = firebase.auth().currentUser.uid;
    localStorage.setItem("favid", currentUser)
    document.getElementById("ads").innerHTML = ""
    document.getElementById("set").innerHTML = ""
    document.getElementById("fav").innerHTML = ""
    // document.getElementById("butnn").style.display="none"
    firebase.database().ref("pakolx").child("favourite/").once("value", (data) => {
      // console.log(data.val())
      let favo = data.val()
      console.log(favo)
      localforage.setItem('fav', favo).then(() => {
        console.log('Data has been saved in indexDB');
      })
      for (let key in favo) {
        // console.log(favo[key])
        var pObject = favo[key]
        console.log(pObject)
        for (let pop in pObject) {
          var postObject = pObject[pop]
          console.log(postObject)

          if (currentUser === postObject.user) {
            var adContainer = document.getElementById("fav");

            // cardDeck = document.createElement("DIV");
            // cardDeck.className = "card-deck";
            // adContainer.appendChild(cardMb3Hoverable);


            var cardMb3Hoverable = document.createElement("DIV");
            cardMb3Hoverable.setAttribute("class", "card mb-4 hoverable");
            adContainer.appendChild(cardMb3Hoverable);

            var viewOverlayZoom = document.createElement("DIV");
            viewOverlayZoom.setAttribute("class", "view overlay zoom");
            viewOverlayZoom.style.backgroundColor = "grey"
            cardMb3Hoverable.appendChild(viewOverlayZoom);

            var cardImgTop = document.createElement("IMG");
            cardImgTop.className = "img-fluid card-img-top waves-effect waves-light";
            cardImgTop.setAttribute("id", "adImg");
            cardImgTop.setAttribute("src", postObject.imageurl);
            viewOverlayZoom.appendChild(cardImgTop);

            var cardBody = document.createElement("DIV");
            cardBody.setAttribute("class", "card-body");
            cardMb3Hoverable.appendChild(cardBody);

            var cardTitle = document.createElement("H2");
            cardTitle.setAttribute("class", "card-title");
            cardTitle.innerHTML = postObject.title;
            // cardTitle.toUppercase()
            cardBody.appendChild(cardTitle);

            var cardText = document.createElement("p");
            cardText.setAttribute("class", "card-text");
            cardText.style.fontSize = "16px"
            cardText.innerHTML = postObject.description;
            cardBody.appendChild(cardText);

            var cardPriceTag = document.createElement("H3");
            cardPriceTag.setAttribute("class", "red-text");
            cardPriceTag.innerHTML = "Rs.";


            var cardPrice = document.createElement("h4");
            cardPrice.setAttribute("class", "red-text");
            cardPrice.innerHTML = postObject.price + "/" + "-";
            cardPrice.style.display = "inline";
            cardPriceTag.appendChild(cardPrice);
            cardPrice.style.color = "white !important"

            cardBody.appendChild(cardPriceTag);

            var hr = document.createElement("HR");
            cardBody.appendChild(hr);

            var adPostBy = document.createElement("P");
            adPostBy.innerHTML = "AD Posted By: ";
            cardBody.appendChild(adPostBy);

            var adPosterName = document.createElement("SPAN");
            adPosterName.className = "text-secondary";
            adPosterName.innerHTML = postObject.name;
            adPosterName.style.color = "blue"
            // adPosterName.style.fontWeight="bolder"

            adPostBy.appendChild(adPosterName);



            var adPosterNum = document.createElement("P");
            adPosterNum.innerHTML = "Contact Number: ";

            var adPosterNumber = document.createElement("SPAN");
            adPosterNumber.innerHTML = postObject.num;
            adPosterNumber.className = "text-secondary"
            adPosterNum.appendChild(adPosterNumber);
            adPosterNumber.style.color = "blue"
            // adPosterNumber.style.fontWeight="bold"

            cardBody.appendChild(adPosterNum);
          }
        }
      }
     
    })

    
  }
  else{
    alert("please login first")
  }
  })
  }
  else {
    console.log('status >>>   You are OFFLINE ❌');
    let currentUser = localStorage.getItem("favid");
    document.getElementById("ads").innerHTML = ""
    document.getElementById("set").innerHTML = ""
    document.getElementById("fav").innerHTML = ""

    localforage.getItem("fav").then((data) => {
      console.log(data);

      for (let key in data) {
        // console.log(favo[key])
        var pObject = data[key]
        console.log(pObject)
        for (let pop in pObject) {
          var postObject = pObject[pop]
          console.log(postObject)

          if (currentUser === postObject.user) {
            var adContainer = document.getElementById("fav");

            // cardDeck = document.createElement("DIV");
            // cardDeck.className = "card-deck";
            // adContainer.appendChild(cardMb3Hoverable);


            var cardMb3Hoverable = document.createElement("DIV");
            cardMb3Hoverable.setAttribute("class", "card mb-4 hoverable");
            adContainer.appendChild(cardMb3Hoverable);

            var viewOverlayZoom = document.createElement("DIV");
            viewOverlayZoom.setAttribute("class", "view overlay zoom");
            viewOverlayZoom.style.backgroundColor = "grey"
            cardMb3Hoverable.appendChild(viewOverlayZoom);

            var cardImgTop = document.createElement("IMG");
            cardImgTop.className = "img-fluid card-img-top waves-effect waves-light";
            cardImgTop.setAttribute("id", "adImg");
            cardImgTop.setAttribute("src", postObject.imageurl);
            viewOverlayZoom.appendChild(cardImgTop);

            var cardBody = document.createElement("DIV");
            cardBody.setAttribute("class", "card-body");
            cardMb3Hoverable.appendChild(cardBody);

            var cardTitle = document.createElement("H2");
            cardTitle.setAttribute("class", "card-title");
            cardTitle.innerHTML = postObject.title;
            // cardTitle.toUppercase()
            cardBody.appendChild(cardTitle);

            var cardText = document.createElement("p");
            cardText.setAttribute("class", "card-text");
            cardText.style.fontSize = "16px"
            cardText.innerHTML = postObject.description;
            cardBody.appendChild(cardText);

            var cardPriceTag = document.createElement("H3");
            cardPriceTag.setAttribute("class", "red-text");
            cardPriceTag.innerHTML = "Rs.";


            var cardPrice = document.createElement("h4");
            cardPrice.setAttribute("class", "red-text");
            cardPrice.innerHTML = postObject.price + "/" + "-";
            cardPrice.style.display = "inline";
            cardPriceTag.appendChild(cardPrice);
            cardPrice.style.color = "white !important"

            cardBody.appendChild(cardPriceTag);

            var hr = document.createElement("HR");
            cardBody.appendChild(hr);

            var adPostBy = document.createElement("P");
            adPostBy.innerHTML = "AD Posted By: ";
            cardBody.appendChild(adPostBy);

            var adPosterName = document.createElement("SPAN");
            adPosterName.className = "text-secondary";
            adPosterName.innerHTML = postObject.name;
            adPosterName.style.color = "blue"
            // adPosterName.style.fontWeight="bolder"

            adPostBy.appendChild(adPosterName);



            var adPosterNum = document.createElement("P");
            adPosterNum.innerHTML = "Contact Number: ";

            var adPosterNumber = document.createElement("SPAN");
            adPosterNumber.innerHTML = postObject.num;
            adPosterNumber.className = "text-secondary"
            adPosterNum.appendChild(adPosterNumber);
            adPosterNumber.style.color = "blue"
            // adPosterNumber.style.fontWeight="bold"

            cardBody.appendChild(adPosterNum);
          }
        }
      }


    })




  }
}



firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // window.location="./pages/form.html"
    document.querySelector("#logout").style.display = "block"
    document.getElementById("login").style.display = "none"
    document.querySelector("#chat").style.display = "block"



  }
  else {
    // window.location="./pages/login.html"
    // document.getElementById("logout").innerHTML="login"
    document.getElementById("logout").style.display = "none"
    document.getElementById("login").style.display = "block"
    document.querySelector("#chat").style.display = "none"

  }
})



function checkInternet() {
  if (navigator.onLine) {
    console.log('status >>>   You are ONLINE ✔✔')

  } else {
    console.log('status >>>   You are OFFLINE ❌');
    var dataArray = [];
    localforage.getItem("key").then((data) => {
      console.log(data);
      for (var key in data) {
        // console.log(  object[key])

        var postObject = data[key]
        for (var pop in postObject) {
          dataArray.push(postObject[pop])

        }
      }

      var adContainer = document.getElementById("ads");

      dataArray.map((v, i) => {


        // cardDeck = document.createElement("DIV");
        // cardDeck.className = "card-deck";
        // adContainer.appendChild(cardMb3Hoverable);


        var cardMb3Hoverable = document.createElement("DIV");
        cardMb3Hoverable.setAttribute("class", "card mb-4 hoverable");
        adContainer.appendChild(cardMb3Hoverable);

        var viewOverlayZoom = document.createElement("DIV");
        viewOverlayZoom.setAttribute("class", "view overlay zoom");
        viewOverlayZoom.style.backgroundColor = "grey"
        cardMb3Hoverable.appendChild(viewOverlayZoom);

        var cardImgTop = document.createElement("IMG");
        cardImgTop.className = "img-fluid card-img-top waves-effect waves-light";
        cardImgTop.setAttribute("id", "adImg");
        cardImgTop.setAttribute("src", v.imageUrl);
        viewOverlayZoom.appendChild(cardImgTop);

        var cardBody = document.createElement("DIV");
        cardBody.setAttribute("class", "card-body");
        cardMb3Hoverable.appendChild(cardBody);

        var cardTitle = document.createElement("H2");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.innerHTML = v.title;
        // cardTitle.toUppercase()
        cardBody.appendChild(cardTitle);

        var cardText = document.createElement("p");
        cardText.setAttribute("class", "card-text");
        cardText.style.fontSize = "16px"
        cardText.innerHTML = v.description;
        cardBody.appendChild(cardText);

        var cardPriceTag = document.createElement("H3");
        cardPriceTag.setAttribute("class", "red-text");
        cardPriceTag.innerHTML = "Rs.";


        var cardPrice = document.createElement("h4");
        cardPrice.setAttribute("class", "red-text");
        cardPrice.innerHTML = v.price + "/" + "-";
        cardPrice.style.display = "inline";
        cardPriceTag.appendChild(cardPrice);
        cardPrice.style.color = "white !important"

        cardBody.appendChild(cardPriceTag);

        var hr = document.createElement("HR");
        cardBody.appendChild(hr);

        var adPostBy = document.createElement("P");
        adPostBy.innerHTML = "AD Posted By: ";
        cardBody.appendChild(adPostBy);

        var adPosterName = document.createElement("SPAN");
        adPosterName.className = "text-secondary";
        adPosterName.innerHTML = v.fname;
        adPosterName.style.color = "blue"
        // adPosterName.style.fontWeight="bolder"

        adPostBy.appendChild(adPosterName);



        var adPosterNum = document.createElement("P");
        adPosterNum.innerHTML = "Contact Number: ";

        var adPosterNumber = document.createElement("SPAN");
        adPosterNumber.innerHTML = v.number;
        adPosterNumber.className = "text-secondary"
        adPosterNum.appendChild(adPosterNumber);
        adPosterNumber.style.color = "blue"
        // adPosterNumber.style.fontWeight="bold"

        cardBody.appendChild(adPosterNum);

      })

    })
  }
}






checkInternet();
window.addEventListener('online', () => {
  console.log('You\'re online, You can get the fresh content');
  // adds();
  checkInternet();

});
window.addEventListener('offline', () => {
  console.log('You\'re offline, You can get the cache content');
  checkInternet();
  favOffline();


});








