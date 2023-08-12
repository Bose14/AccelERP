const firebaseConfig = {
    apiKey: "AIzaSyCiGr_X_0bB7-238gd25TyIHheiCPWLw88",
  authDomain: "accelerp-2c3ce.firebaseapp.com",
  databaseURL: "https://accelerp-2c3ce-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "accelerp-2c3ce",
  storageBucket: "accelerp-2c3ce.appspot.com",
  messagingSenderId: "829162797306",
  appId: "1:829162797306:web:336caf5e5e70d8c7e87143",
  measurementId: "G-4R2XWGTR2B"
};
  

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth(); 
  const database = firebase.database(); 
  var database_ref = database.ref(); 
  const storage = firebase.storage();

//STUDENT LOGIN
  function stulogin(){
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    auth.signInWithEmailAndPassword(username, password).then(()=>{
        var user=auth.currentUser;
        var uid=user.uid;

        firebase.database().ref('user/'+uid).once('value').then(function(snapshot){
            var name=snapshot.val().name;
            var role=snapshot.val().role;
            //var mobile=snapshot.val().mobile;

            if(role=="student"){
                window.location.href="/Info_IT/html/student/student-info/student.html"
                
            }
            else{
                alert("You are not a student");
            }
        })
    


       
    })
    .catch((error)=>{
        alert("Login failed!")
    })

}

//FACULTY LOGIN
function faclogin(){
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    auth.signInWithEmailAndPassword(username, password).then(()=>{
        var user=auth.currentUser;
        var uid=user.uid;

        firebase.database().ref('user/'+uid).once('value').then(function(snapshot){
            var name=snapshot.val().name;
            var role=snapshot.val().role;
            //var mobile=snapshot.val().mobile;

            if(role=="faculty"){
                window.location.href="/Info_IT/html/faculty/faculty-info/faculty.html"
            }
            else{
                alert("You are not a faculty");
            }
        })
    
    .catch((error)=>{
        alert("Login failed!")
    })

})
}

//ADMIN LOGIN
function adlogin(){
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    auth.signInWithEmailAndPassword(username, password).then(()=>{
        var user=auth.currentUser;
        var uid=user.uid;

        firebase.database().ref('user/'+uid).once('value').then(function(snapshot){
            var name=snapshot.val().name;
            var role=snapshot.val().role;
            //var mobile=snapshot.val().mobile;

            if(role=="admin"){
                window.location.href="/Info_IT/html/admin/admin-info/admin-info.html"
            }
            else{
                alert("You are not a faculty");
            }
        })
    
    .catch((error)=>{
        alert("Login failed!")
    })

})
}


//INTERN SUBMIT

function submitintern(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
      
            // User is signed in
            console.log("User Signed In");
            var uid = user.uid;

    var event = document.getElementById("exampleEvent").value;
    var org = document.getElementById("exampleOrg").value;
    var duration = document.getElementById("exampleDuration").value;
    var date1 = document.getElementById("exampleDate").value;
    // console.log(date)
    let startdate=  date1.replace(/-/g, "");
    var enddate = document.getElementById("exampleDate2").value;
    var domain = document.getElementById("exampleDomain").value;
    var mode = document.getElementById("exampleMode").value;
    var certificate = document.getElementById("exampleFormControlFile1")
    var report = document.getElementById("exampleFormControlFile2").value;


    if(event=="" || org=="" || date1=="" || domain=="" || duration=="" || enddate=="" || mode=="")
    {
        document.getElementById("error").innerHTML="Fill all the details"
        document.getElementById("error").style.color="red"

    }
    else{
        const file = certificate.files[0];

        // Validate file type and size...
        // (same validation code as before)

        // Firebase Storage configuration
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const filename = "images/" + file.name;
        const progressBar = document.getElementById("progress-bar")

        // Upload the file to Firebase Storage
        const uploadTask = storageRef.child(filename).put(file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // You can track the upload progress here if needed
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.style.width = `${progress}%`;
            },
            (error) => {
                console.error("Error uploading file:", error);
                alert("Error uploading file.");
            },
            async () => {
                // File uploaded successfully

                // Get the download URL of the uploaded image
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                // Save the download URL to Firebase Realtime Database
                const newUserRef = database.ref("stucertify/"+uid+"/"+event+"/"+startdate+"/")
                newUserRef.set({
                  event: event,
                  organization: org,
                  duration:duration,
                  startdate: startdate,
                  enddate:enddate,
                  domain: domain,
                  mode:mode,
                  certificate:downloadURL,
                  report:report
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/Info_IT/html/student/student-info/student.html"
            }
        );
        }

}
    })
}
//WORKSHOP    

function submitworkshop(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
      
            // User is signed in
            console.log("User Signed In");
            var uid = user.uid;

    var event = document.getElementById("exampleEvent").value;
    var org = document.getElementById("exampleOrg").value;
    var topic = document.getElementById("exampleTopic").value;
    var duration = document.getElementById("exampleDuration").value;
    var date1 = document.getElementById("exampleDate").value;
    // console.log(date)
    let startdate=  date1.replace(/-/g, "");
    var enddate = document.getElementById("exampleDate2").value;
   
    var mode = document.getElementById("exampleMode").value;
    var certificate = document.getElementById("exampleFormControlFile1")


    if(event=="" || org=="" || date1=="" || topic=="" || duration=="" || enddate=="" || mode=="")
    {
        document.getElementById("error").innerHTML="Fill all the details"
        document.getElementById("error").style.color="red"

    }
    else{
        const file = certificate.files[0];

        // Validate file type and size...
        // (same validation code as before)

        // Firebase Storage configuration
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const filename = "images/" + file.name;
        const progressBar = document.getElementById("progress-bar")

        // Upload the file to Firebase Storage
        const uploadTask = storageRef.child(filename).put(file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // You can track the upload progress here if needed
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.style.width = `${progress}%`;
            },
            (error) => {
                console.error("Error uploading file:", error);
                alert("Error uploading file.");
            },
            async () => {
                // File uploaded successfully

                // Get the download URL of the uploaded image
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                // Save the download URL to Firebase Realtime Database
                const newUserRef = database.ref("stucertify/"+uid+"/"+event+"/"+startdate+"/")
                newUserRef.set({
                  event: event,
                  organization: org,
                  duration:duration,
                  startdate: startdate,
                  enddate:enddate,
                  topic: topic,
                  mode:mode,
                  certificate:downloadURL,
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/Info_IT/html/student/student-info/student.html"
            }
        );
        }

}
    })
}

//Extra Courses
function submitextracourses(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
      
            // User is signed in
            console.log("User Signed In");
            var uid = user.uid;

    var event = document.getElementById("exampleEvent").value;
    var org = document.getElementById("exampleOrg").value;
    var coursename = document.getElementById("exampleCN").value;
    var duration = document.getElementById("exampleDuration").value;
    var date1 = document.getElementById("exampleDate").value;
    // console.log(date)
    let certificatedate=  date1.replace(/-/g, "");
   
    var mode = document.getElementById("exampleMode").value;
    var certificate = document.getElementById("exampleFormControlFile1")


    if(event=="" || org=="" || date1=="" || coursename=="" || duration=="" ||  mode=="")
    {
        document.getElementById("error").innerHTML="Fill all the details"
        document.getElementById("error").style.color="red"

    }
    else{
        const file = certificate.files[0];

        // Validate file type and size...
        // (same validation code as before)

        // Firebase Storage configuration
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const filename = "images/" + file.name;
        const progressBar = document.getElementById("progress-bar")

        // Upload the file to Firebase Storage
        const uploadTask = storageRef.child(filename).put(file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // You can track the upload progress here if needed
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.style.width = `${progress}%`;
            },
            (error) => {
                console.error("Error uploading file:", error);
                alert("Error uploading file.");
            },
            async () => {
                // File uploaded successfully

                // Get the download URL of the uploaded image
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                // Save the download URL to Firebase Realtime Database
                const newUserRef = database.ref("stucertify/"+uid+"/"+event+"/"+certificatedate+"/")
                newUserRef.set({
                  event: event,
                  organization: org,
                  coursename:coursename,
                  duration:duration,
                  date: date1,
                  mode:mode,
                  certificate:downloadURL,
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/Info_IT/html/student/student-info/student.html"
            }
        );
        }

}
    })
}

//PPT

function submitppt(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
      
            // User is signed in
            console.log("User Signed In");
            var uid = user.uid;

    var event = document.getElementById("exampleEvent").value;
    var org = document.getElementById("exampleOrg").value;
    var topic = document.getElementById("exampleTopic").value;
    var date1 = document.getElementById("exampleDate").value;
    // console.log(date)
    let certificatedate=  date1.replace(/-/g, "");
   
    var mode = document.getElementById("exampleMode").value;
    var certificate = document.getElementById("exampleFormControlFile1")


    if(event=="" || org=="" || date1=="" || topic=="" || mode=="")
    {
        document.getElementById("error").innerHTML="Fill all the details"
        document.getElementById("error").style.color="red"

    }
    else{
        const file = certificate.files[0];

        // Validate file type and size...
        // (same validation code as before)

        // Firebase Storage configuration
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const filename = "images/" + file.name;
        const progressBar = document.getElementById("progress-bar")

        // Upload the file to Firebase Storage
        const uploadTask = storageRef.child(filename).put(file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // You can track the upload progress here if needed
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.style.width = `${progress}%`;
            },
            (error) => {
                console.error("Error uploading file:", error);
                alert("Error uploading file.");
            },
            async () => {
                // File uploaded successfully

                // Get the download URL of the uploaded image
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                // Save the download URL to Firebase Realtime Database
                const newUserRef = database.ref("stucertify/"+uid+"/"+event+"/"+certificatedate+"/")
                newUserRef.set({
                  event: event,
                  organization: org,
                  topic:topic,
                  date:date1,
                  mode:mode,
                  certificate:downloadURL,
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/Info_IT/html/student/student-info/student.html"
            }
        );
        }

}
    })
}

//Project

function submitproject(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
      
            // User is signed in
            console.log("User Signed In");
            var uid = user.uid;

    var event = document.getElementById("exampleEvent").value;
    var title = document.getElementById("exampleTitle").value;
    var duration = document.getElementById("exampleDuration").value;
    var status = document.getElementById("exampleMode").value;
    var link = document.getElementById("basicurl").value;
    var date1 = document.getElementById("exampleDate").value;
    // console.log(date)
    let certificatedate=  date1.replace(/-/g, "");
    var certificate = document.getElementById("exampleFormControlFile1")


    if(event=="" || title=="" || date1=="" || duration=="" || status=="")
    {
        document.getElementById("error").innerHTML="Fill all the details"
        document.getElementById("error").style.color="red"

    }
    else{
        const file = certificate.files[0];

        // Validate file type and size...
        // (same validation code as before)

        // Firebase Storage configuration
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const filename = "images/" + file.name;
        const progressBar = document.getElementById("progress-bar")

        // Upload the file to Firebase Storage
        const uploadTask = storageRef.child(filename).put(file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // You can track the upload progress here if needed
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.style.width = `${progress}%`;
            },
            (error) => {
                console.error("Error uploading file:", error);
                alert("Error uploading file.");
            },
            async () => {
                // File uploaded successfully

                // Get the download URL of the uploaded image
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                // Save the download URL to Firebase Realtime Database
                const newUserRef = database.ref("stucertify/"+uid+"/"+event+"/"+certificatedate+"/")
                newUserRef.set({
                  event: event,
                  title: title,
                  duration:duration,
                  status:status,
                  link:link,
                  date:date1,
                  certificate:downloadURL,
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/Info_IT/html/student/student-info/student.html"
            }
        );
        }

}
    })
}

//Other 

function submitother(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
      
            // User is signed in
            console.log("User Signed In");
            var uid = user.uid;

    var event = document.getElementById("exampleEvent").value;
    var org = document.getElementById("exampleOrg").value;
    var duration = document.getElementById("exampleDuration").value;
    var date1 = document.getElementById("exampleDate").value;
    // console.log(date)
    let startdate=  date1.replace(/-/g, "");
    var domain = document.getElementById("exampleDomain").value;
    var mode = document.getElementById("exampleMode").value;
    var certificate = document.getElementById("exampleFormControlFile1")


    if(event=="" || org=="" || date1=="" || domain=="" || duration=="" || mode=="")
    {
        document.getElementById("error").innerHTML="Fill all the details"
        document.getElementById("error").style.color="red"

    }
    else{
        const file = certificate.files[0];

        // Validate file type and size...
        // (same validation code as before)

        // Firebase Storage configuration
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const filename = "images/" + file.name;
        const progressBar = document.getElementById("progress-bar")

        // Upload the file to Firebase Storage
        const uploadTask = storageRef.child(filename).put(file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // You can track the upload progress here if needed
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                progressBar.style.width = `${progress}%`;
            },
            (error) => {
                console.error("Error uploading file:", error);
                alert("Error uploading file.");
            },
            async () => {
                // File uploaded successfully

                // Get the download URL of the uploaded image
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                // Save the download URL to Firebase Realtime Database
                const newUserRef = database.ref("stucertify/"+uid+"/"+event+"/"+startdate+"/")
                newUserRef.set({
                  event: event,
                  organization: org,
                  duration:duration,
                  date: date1,
                  domain: domain,
                  mode:mode,
                  certificate:downloadURL
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/Info_IT/html/student/student-info/student.html"
            }
        );
        }

}
    })
}