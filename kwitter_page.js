
 var firebaseConfig = {
  apiKey: "AIzaSyAgT8-6xLpces-Y-8YmJjNeTnO_9zW4bPU",
  authDomain: "chat-box-pro.firebaseapp.com",
  databaseURL: "https://chat-box-pro-default-rtdb.firebaseio.com",
  projectId: "chat-box-pro",
  storageBucket: "chat-box-pro.appspot.com",
  messagingSenderId: "1019966771628",
  appId: "1:1019966771628:web:1c662f59d82b10f62baa09"
};
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name : user_name,
        message : msg,
        like : 0
    });

    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_tag = "<h4>"+ name +"<img class = 'user_tick' src = 'tick.png'></h4>";
message_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class = 'btn btn-warning' id="+firebase_message_id+" value = "+like+" onclick = 'update_like(this.id)'>"
span_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like: " + like + "</span> </button><hr>";

row = name_tag + message_tag + like_button +span_tag;
document.getElementById("output").innerHTML +=row;
    } });  }); }
getData();
