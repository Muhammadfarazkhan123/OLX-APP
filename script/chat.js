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







var frndUID;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(user.uid, '[current user]')
        let usersArray = []
        let currentUser = firebase.auth().currentUser.uid;
        firebase.database().ref("pakolx/" + "users/" + currentUser + '/' + 'chatroom' + '/')
            .once("value", (chat) => {
                let roomData = chat.val();
                console.log(roomData, 'friendlist')

                firebase.database().ref("pakolx/" + "users/").once("value", (friends) => {
                    friendList = friends.val();
                    for (var key in roomData) {
                        // console.log(key, 'friend\'s uid');
                        // console.log(roomData[key], 'message');
                        if (currentUser !== key) {
                            friendList[key].uid = key
                            console.log(friendList[key].uid, "test")
                            usersArray.push(friendList[key])
                        }
                    }
                    console.log(usersArray, 'db');

                    var chatList = document.getElementById("chats");
                    usersArray.map((v, i) => {

                        var li = document.createElement('li');
                        // var liText = document.createTextNode(v.Name)
                        var btn = document.createElement('button')
                        var btnText = document.createTextNode(v.Name)
                        btn.appendChild(btnText)
                        btn.setAttribute("class", 'btn btn-info text-center')
                      
                      
                        btn.addEventListener("click", (uid) => {
                            frndUID = v.uid;
                            console.log(frndUID, 'selected friend\'s uid')
                            localStorage.setItem('friendUID', frndUID);
                            // window.location = 'room.html'
                            // getConversation();
                            window.location="../pages/chat room.html"
                            
                        })

                       
                       
                        li.setAttribute("class", 'list-group-item')
                        // li.appendChild(liText)
                        li.appendChild(btn)
                        chatList.appendChild(li)
                    })
                });

            });
    } else {
        console.log('user is not signed in')

    }
});

// get friends list



function getConversation() {
    document.getElementById("chatRoom").innerHTML = ""

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var firendsUID = localStorage.getItem("friendUID");
            // console.log(firendsUID, "[friends uid]")
            let usersArray = []
            firebase.database().ref("pakolx/" + "users/").once("value", (users) => {
                let usersList = users.val()
                console.log(usersList, "usersList")
                var currentuser = firebase.auth().currentUser.uid;
                // console.log(currentuser)
                user = currentuser
                for (var key in usersList) {
                    // console.log(usersList[key])
                    usersList[key].uid = key
                    usersArray.push(usersList[key])

                }
                console.log(usersArray, 'usersArray')
                var ul = document.getElementById("chatRoom");
                usersArray.map((v, i) => {
                    if (currentuser === v.uid) {
                        currentName = v.Name;
                    }
                    if (firendsUID == v.uid) {
                        $("#friendName").html(` ${v.Name}`)

                        console.log(v.uid)
                        firebase.database().ref("pakolx/" + "users/" + v.uid + "/" + "chatRoom" + '/' + currentuser + '/').on('child_added', (CUmessages) => { // current user msgs
                            console.log(CUmessages.val().msg, 'cu msgs')
                            // localStorage.setItem('CUmsg', JSON.stringify(CUmessages.val().msg));
                            // var userdata = localStorage.getItem('CUmsg');
                            // userdata = JSON.parse(userdata);
                            var userdata = CUmessages.val().msg;
                            if (CUmessages.val().uid === currentuser) {
                                // userdata = JSON.parse(userdata);
                                var createdLi = crate(`${userdata}   (${"you"})`, 'LI', 'list-group-item')
                                // console.log('abcd', createdLi);
                                ul.appendChild(createdLi);
                                autoScroll();
                            }

                            else {
                                // userdata = JSON.parse(userdata);
                                var createdLi = crateElement(`${userdata}   (${v.Name})`, 'LI', 'list-group-item')
                                // console.log('abcd', createdLi);
                                ul.appendChild(createdLi);
                                autoScroll();
                            }
                            // }
                            // console.log(userdata, 'cu data')
                        })
                        //                 firebase.database().ref("pakolx/" +"users/" + currentuser + "/" + "chatRoom" + '/' + v.uid + '/').on('child_added', (FUmessages) => {  // friend (user) msgs
                        //                     // console.log(FUmessages, 'fu msgs')
                        //                     localStorage.setItem('FUmsg', JSON.stringify(FUmessages.val()));
                        //                     var userdata = localStorage.getItem('FUmsg');
                        //                     userdata = JSON.parse(userdata);
                        //                     var createdLi = crateElement(`${userdata}   (${v.Name})`, 'LI', 'list-group-item')
                        //                     // console.log('li', createdLi);
                        //                     ul.appendChild(createdLi);
                        //                     // console.log(userdata, 'fu data')

                        // })

                        function autoScroll(){
                            scrollingElement=document.getElementById("chatRoom");
                            scrollingElement.scrollTop=scrollingElement.scrollHeight
                        }
                        function crate(text, element, className) {
                            var li = document.createElement(element);
                            var textNode = document.createTextNode(text);
                            li.appendChild(textNode);
                            li.setAttribute('class', className);
                            li.setAttribute('id', 'you')
                            // li.setAttribute('style', "background-color:rgb(73, 129, 202);text-align:right;width:50%;margin:10px 0px 0px 50%;border-radius:4px;font-size:20px");

                            return li;
                        }
                        function crateElement(text, element, className) {
                            var li = document.createElement(element);
                            var textNode = document.createTextNode(text);
                            li.appendChild(textNode);
                            li.setAttribute('class', className);
                            li.setAttribute('id', 'frnd')
                            // li.setAttribute('style', "background-color:gray;text-allign:left; width:50%;margin:10px 50% 0px 0%;border-radius:4px;font-size:20px");
                            return li;
                        }
                    }
                })
            })
        }
        //  else {
        //     console.log('user is not signed in')

        // }
    });
}



function sendMsg() {
    var msg = $("#messageBox").val();
    var firendsUID = localStorage.getItem("friendUID");
    let usersArray = []
    // var currentName;
    firebase.database().ref("pakolx/" + "users/").once("value", (users) => {
        let usersList = users.val()
        var currentuser = firebase.auth().currentUser.uid;
        var obj = {
            msg: msg,
            uid: currentuser
        }
      
       
        for (var key in usersList) {
            usersList[key].uid = key
            usersArray.push(usersList[key])
        }
        console.log(usersArray, 'this usersarray')
        usersArray.map((v, i) => {
            var currentName;
            
            
            if (currentuser === v.uid) {
                console.log(v.uid);
                // firebase.auth().onAuthStateChanged(function (user) {
                //     if (user) {
                //         console.log(user)
                //         user.displayName = v.Name;
                //         console.log(user.displayName)
                //     }
                // })
                        // console.log(user.displayName)                
                var currentName = v.Name;
                localStorage.setItem('myName', v.Name);   
                console.log(currentName, 'my name')
            }
            
            var obj2={
                Name: localStorage.getItem('myName'),
                RecieverID: v.uid,
                SenderID: firebase.auth().currentUser.uid,
                msg: msg
            }
           


            
            if (firendsUID == v.uid) {

                firebase.database().ref("pakolx/" + "users/" + v.uid + "/" + "chatRoom" + '/' + currentuser + '/').push(obj)
                firebase.database().ref("pakolx/" + "users/" + currentuser + "/" + "chatRoom" + '/' + v.uid + '/').push(obj)
                firebase.database().ref("Messages/").push(obj2)
                    .then(() => {
                        $("#messageBox").val("")

                        
                    })

               
            }
        })
    })

}
// Send Message Section Ends