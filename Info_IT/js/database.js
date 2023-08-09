const firebaseConfig = {
    apiKey: "AIzaSyCuAe-oYofR6xq7NbO7MPdFiXZv8lC88lI",
    authDomain: "ietcertify.firebaseapp.com",
    databaseURL: "https://ietcertify-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ietcertify",
    storageBucket: "ietcertify.appspot.com",
    messagingSenderId: "633521793502",
    appId: "1:633521793502:web:723c70e3c32ccbe4b3554f",
    measurementId: "G-304YJXJNLN"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth(); 
  const database = firebase.database(); 


  function stulogin(){
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    auth.signInWithEmailAndPassword(username, password).then(()=>{
        var user=auth.currentUser;
        var uid=user.uid;
        console.log(uid)
        window.location.href="/Info_IT/html/student/student-info/student.html"
    })
    .catch((error)=>{
        alert("Login failed!")
    })

}



function submitintern(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
      
            // User is signed in
            console.log("User Signed In");
            var uid = user.uid;

    var event = document.getElementById("exampleEvent").value;
    var org = document.getElementById("exampleOrg").value;
    var date = document.getElementById("exampleDate").value;
    var domain = document.getElementById("exampleDomain").value;

    if(event=="" || org=="" || date=="" || domain==""){
        document.getElementById("error").innerHTML="Fill all the details"
        document.getElementById("error").style.color="red"

    }

    else{
        const newUserRef = database.ref("students/"+uid).push();
        newUserRef.set({
          event: event,
          organization: org,
          date: date,
          domain: domain
        
        })
    }

    }
})

    }
    
