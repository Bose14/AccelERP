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

  var global_uid;
  const preloadedImages = {};

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        global_uid = user.uid;
    }
})

//signout
function logout(){
    auth.signOut().then(function() {
        window.location.href="index.html"
        console.log("User signed out");
      }).catch(function(error) {
        // An error occurred.
        alert(error.message);
      });
}


  function fillprofile(){
    //Profile Information
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            firebase.database().ref('user/'+uid).once('value').then(function(snapshot){
            let name=snapshot.val().name;
            console.log(name)
            let role=snapshot.val().role;
            let reg=snapshot.val().regno;
            let dob=snapshot.val().dob;
            let gender=snapshot.val().gender;
            let address=snapshot.val().address;
            let state=snapshot.val().state;
            let religion=snapshot.val().religion;
            let caste=snapshot.val().caste;
            let nationality=snapshot.val().nationality;
            let bloodgroup=snapshot.val().bloodgroup;
            let aadhar=snapshot.val().aadhar;
            let phone=snapshot.val().phone;
            let college=snapshot.val().college;
            let degree=snapshot.val().degree;
            let branch=snapshot.val().branch;
            let father=snapshot.val().father;
            let mother=snapshot.val().mother;
            let profile = snapshot.val().profile;
            let email=user.email;
            name = document.getElementById("fullname").value=name;
            email = document.getElementById("email").value=email;
            reg=document.getElementById("regno").value=reg;
            dob=document.getElementById("dob").value=dob;
            gender=document.getElementById("gender").value=gender;
            address=document.getElementById("address").value=address;
            state=document.getElementById("state").value=state;
            religion=document.getElementById("religion").value=religion;
            caste=document.getElementById("caste").value=caste;
            nationality=document.getElementById("nationality").value=nationality;
            bloodgroup=document.getElementById("bloodgroup").value=bloodgroup;
            aadhar=document.getElementById("adhar").value=aadhar;
            phone=document.getElementById("phone").value=phone;
            college=document.getElementById("college").value=college;
            degree=document.getElementById("degree").value=degree+'/'+branch;
            father=document.getElementById("father").value=father;
            mother=document.getElementById("mother").value=mother;
            let designation = document.getElementById("desig");

            const profileDivElement = document.getElementById("profile-picture");
            profileDivElement.style.backgroundImage = `url('${profile}')`;

            
            if (role === "student")
            {
                designation.value = "Student";
            }
            else{
                designation.value = "Faculty";
            }
    })
        }})
    }

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
            var profile = snapshot.val().profile;

            if(role=="student"){
                //alert("Yes")
                document.getElementById("lightboxlogin").style.visibility="visible"

                document.getElementById("profile-photo").src=profile;
                document.getElementById("nameoflogin").innerHTML=name;
                setTimeout(() => {
                    window.location.href="student-info/student.html"
                }, 4000);
               
                
            }
            else{
                document.getElementById("lightbox12").style.visibility="visible";
                //alert("You are not a student");
            }
        })
    


       
    })
    .catch((error)=>{
        document.getElementById("errorlogin").innerHTML=error.message;
        //alert("Login failed!")
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
            var profile = snapshot.val().profile;
            console.log(profile)

            if(role=="faculty"){
                //console.log(document.getElementById("lightboxlogin").style.visibility)
                document.getElementById("lightboxlogin").style.visibility="visible"

                document.getElementById("profile-photo").src=profile;
                document.getElementById("nameoflogin").innerHTML=name;
                setTimeout(() => {
                    window.location.href="faculty-info/faculty.html"
                }, 4000);
               
            }
            else{
                document.getElementById("lightbox11").style.visibility="visible";
                //alert("You are not a faculty");
            }
        })
    
   
    })
    .catch((error)=>{
       document.getElementById("errorlogin").innerHTML=error.message;


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
                window.location.href="admin-info/admin-info.html"
            }
            else{
                document.getElementById("lightbox13").style.visibility="visible";
                //alert("You are not an Admin");
            }
        })
    
    .catch((error)=>{
        document.getElementById("errorlogin").innerHTML=error.message;
        //alert("Login failed!")
    })

})
}
//Forget Password
function forget(){
    var email=document.getElementById("email").value;
    auth.sendPasswordResetEmail(email).then(()=>{
        alert("Password Reset Mail is Sent Successfully..! Check Your Email Including Spam Folder Also ")
    }).catch(function(error) {
        alert("error")
        console.error("Error sending password reset email:", error);
      });
}

//random id

const usedIds = new Set();

function generateUniqueRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  do {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  } while (usedIds.has(randomId));

  usedIds.add(randomId);
  return randomId;
}

//Upload Profile Picture
function profile() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            var profileInput = document.getElementById("profile-picture-input");
            var profileFile = profileInput.files[0];

            // Check if a file is selected
            if (profileFile) {
                const storage = firebase.storage();
                const storageRef = storage.ref();
                const filename = "profile/" + profileFile.name;

                // Upload the profile picture to Firebase Storage
                const uploadTask = storageRef.child(filename).put(profileFile);

                // Listen for state changes of the upload
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        // Track upload progress (optional)
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                    },
                    (error) => {
                        // Handle upload error
                        console.error("Upload error:", error);
                    },
                    async () => {
                        // File uploaded successfully

                        // Get the download URL of the uploaded image
                        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

                        // Save the download URL to Firebase Realtime Database
                        const database = firebase.database();
                        const newUserRef = database.ref("user/" + uid + "/");
                        newUserRef.update({
                            profile: downloadURL
                        });
                        alert("Profile uploaded successfully");
                        fillprofile();
                    }
                );
            } else {
                console.log("No file selected.");
            }
        }
    });
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
    const randomId = generateUniqueRandomId(10);


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
        const filename = "stuintern/" + file.name;
        const progressBar = document.getElementById("progress-bar")
        // random id

        
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

                firebase.database().ref('user/'+global_uid).once('value').then(function(snapshot){
                    var count=snapshot.val().count;
                    if(count=="undefined"||count==undefined||count==null||count==NaN){
                        count=0;
                    }
                    var updatecount=count+1


                const dbref = database.ref("user/"+uid+"/");
                dbref.update({
                    count: updatecount
                })

                })

                newUserRef.set({
                  event: event,
                  organization: org,
                  duration:duration,
                  date: date1,
                  enddate:enddate,
                  domain: domain,
                  mode:mode,
                  certificate:downloadURL,
                  report:report,
                  id:randomId
                
                })
                alert("Successfully Saved!");
                window.location.href="/html/student/student-info/student.html"
            
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
    var certificate = document.getElementById("exampleFormControlFile1");
    const randomId = generateUniqueRandomId(10);


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
        const filename = "stuworkshop/" + file.name;
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
                  id:randomId
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/student/student-info/student.html"
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
    var certificate = document.getElementById("exampleFormControlFile1");
    const randomId = generateUniqueRandomId(10);


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
        const filename = "stucourses/" + file.name;
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
                  id:randomId
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/student/student-info/student.html"
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
    var certificate = document.getElementById("exampleFormControlFile1");
    const randomId = generateUniqueRandomId(10);


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
        const filename = "stuppt/" + file.name;
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
                  id:randomId
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/student/student-info/student.html"
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
    var certificate = document.getElementById("exampleFormControlFile1");
    const randomId = generateUniqueRandomId(10);


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
        const filename = "stuproject/" + file.name;
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
                  id:randomId
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/student/student-info/student.html"
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
    var certificate = document.getElementById("exampleFormControlFile1");
    const randomId = generateUniqueRandomId(10);


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
        const filename = "stuothers/" + file.name;
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
                  certificate:downloadURL,
                  id:randomId
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/student/student-info/student.html"
            }
        );
        }

}
    })
}

//FACULTY COLUMN

//FDP

function submitfdp(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
      
            // User is signed in
            console.log("User Signed In");
            var uid = user.uid;

    var event = document.getElementById("exampleEvent").value;
    var org = document.getElementById("exampleOrg").value;
    var duration = document.getElementById("exampleDuration").value;
    var domain = document.getElementById("exampleDomain").value;
    var date1 = document.getElementById("exampleDate").value;
    // console.log(date)
    let startdate=  date1.replace(/-/g, "");
    var enddate = document.getElementById("exampleDate2").value;
   
    var mode = document.getElementById("exampleMode").value;
    var certificate = document.getElementById("exampleFormControlFile1");
    const randomId = generateUniqueRandomId(10);


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
        const filename = "fdp/" + file.name;
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
                const newUserRef = database.ref("facultycertify/"+uid+"/"+event+"/"+startdate+"/")
                newUserRef.set({
                  event: event,
                  organization: org,
                  duration:duration,
                  date: date1,
                  enddate:enddate,
                  domain: domain,
                  mode:mode,
                  certificate:downloadURL,
                  id:randomId
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/faculty/faculty-info/faculty.html"
            }
        );
        }

}
    })
}

//Technical Publication
function submitpublication(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
      
            // User is signed in
            console.log("User Signed In");
            var uid = user.uid;

    var event = document.getElementById("exampleEvent").value;
    var org = document.getElementById("exampleOrg").value;
    var name= document.getElementById("examplePublicationName").value;
    var date1 = document.getElementById("exampleDate").value;
    // console.log(date)
    let certificatedate=  date1.replace(/-/g, "");
    var publication = document.getElementById("exampleFormControlFile1")
    const randomId = generateUniqueRandomId(10);


    if(event=="" || org=="" || date1=="" || name=="")
    {
        document.getElementById("error").innerHTML="Fill all the details"
        document.getElementById("error").style.color="red"

    }
    else{
        const file = publication.files[0];

        // Validate file type and size...
        // (same validation code as before)

        // Firebase Storage configuration
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const filename = "facpublication/" + file.name;
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
                const newUserRef = database.ref("facultycertify/"+uid+"/"+event+"/"+certificatedate+"/")
                newUserRef.set({
                  event: event,
                  organization: org,
                  name:name,
                  date:date1,
                  publication:downloadURL,
                  id: randomId
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/faculty/faculty-info/faculty.html"
            }
        );
        }

}
    })
}

//workshop
function submitfacworkshop(){
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
    const randomId = generateUniqueRandomId(10);
   
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
        const filename = "facworkshop/" + file.name;
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
                const newUserRef = database.ref("facultycertify/"+uid+"/"+event+"/"+startdate+"/")
                newUserRef.set({
                  event: event,
                  organization: org,
                  duration:duration,
                  startdate: startdate,
                  enddate:enddate,
                  topic: topic,
                  mode:mode,
                  certificate:downloadURL,
                  id:randomId
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/faculty/faculty-info/faculty.html"
            }
        );
        }

}
    })
}

//journal

function submitjournal(){
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
    const randomId = generateUniqueRandomId(10);
   
    var certificate = document.getElementById("exampleFormControlFile1")


    if(event=="" || org=="" || date1=="" || topic=="")
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
        const filename = "facjournal/" + file.name;
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
                const newUserRef = database.ref("facultycertify/"+uid+"/"+event+"/"+certificatedate+"/")
                newUserRef.set({
                  event: event,
                  organization: org,
                  topic:topic,
                  date:date1,
                  certificate:downloadURL,
                  id:randomId
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/faculty/faculty-info/faculty.html"
            }
        );
        }

}
    })
}

//project

function submitfacproject(){
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
    const randomId = generateUniqueRandomId(10);
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
        const filename = "facproject/" + file.name;
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
                const newUserRef = database.ref("facultycertify/"+uid+"/"+event+"/"+certificatedate+"/")
                newUserRef.set({
                    event: event,
                    title: title,
                    duration:duration,
                    status:status,
                    link:link,
                    date:date1,
                    certificate:downloadURL,
                    id:randomId
                
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/faculty/faculty-info/faculty.html "
            }
        );
        }

}
    })
}

//Other
function submitfacother(){
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
    const randomId = generateUniqueRandomId(10);


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
        const filename = "facothers/" + file.name;
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
                const newUserRef = database.ref("facultycertify/"+uid+"/"+event+"/"+startdate+"/")
                newUserRef.set({
                  event: event,
                  organization: org,
                  duration:duration,
                  date: date1,
                  domain: domain,
                  mode:mode,
                  certificate:downloadURL,
                  id:randomId
                })
                alert("File uploaded successfully and URL saved to database!");
                window.location.href="/html/faculty/faculty-info/faculty.html"
            }
        );
        }

}
    })

}

function filltable() {
    const tableBody = document.getElementById("tableBody");

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        // Function to retrieve and populate data
        database.ref("stucertify/" + uid).on("value", (snapshot) => {
          tableBody.innerHTML = ""; // Clear the table before populating
          var sno=1
          snapshot.forEach((userSnapshot) => {
            userSnapshot.forEach((eventSnapshot) => {
                
              const eventDetails = eventSnapshot.val();
              const eventName = eventDetails.event;
              const eventDate = eventDetails.date;
              const organization = eventDetails.organization;
              const formid = eventDetails.id;
              console.log(formid)

              const row = document.createElement("tr");
              row.innerHTML = `
              <td>${sno}</td>
                <td>${eventName}</td>
                <td>${organization}</td>
                <td>${eventDate}</td>
                <td><button onclick="copyid('${formid}')" class="btn">Edit</button></td>
                <td><button onclick="deleteForm('${formid}')" class="btn">Delete</button></td>
              `;

              tableBody.appendChild(row);
              sno+=1
            });
          });
        });
      }
    });
  }

function copyid(formid){
    console.log("in fucntion" +formid)

    localStorage.setItem("id", formid) 
window.location.href = "/html/edit.html"   
}



function deleteForm(formid){
    lightboxWrapper = document.getElementById("lightboxWrapper");
    lightboxWrapper.style.display = 'flex';

    var cancelButton = document.getElementById("cancelButton")
    var deletebutton = document.getElementById("delconfirm")

    deletebutton.addEventListener('click', () => {

        localStorage.setItem("delid",formid)
        deleteevents()
    
      });
    
      cancelButton.addEventListener('click', () => {
        lightboxWrapper.style.display = 'none';
      });

  
        
   
   

}




//edit form



function editform() {
    var searchId = localStorage.getItem("id");
    console.log(searchId);
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const path = `stucertify/${uid}`;
  
        const userRef = database.ref(path);
        userRef.once('value', (snapshot) => {
          snapshot.forEach((eventSnapshot) => {
            eventSnapshot.forEach((dateSnapshot) => {
              const eventData = dateSnapshot.val();
              if (eventData.id === searchId) {
                console.log(eventData.organization)
                console.log('Found match:', eventData);
                // Display your data here, e.g. update the DOM
              }
            });
          });
        });
      }
    });
  }
  
  

  function deleteevents() {
    console.log("delete initiated...!")
    var searchId = localStorage.getItem("delid");
    console.log(searchId);
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const path = `stucertify/${uid}`;
  
        const userRef = database.ref(path);
        userRef.once('value', (snapshot) => {
          snapshot.forEach((eventSnapshot) => {
            eventSnapshot.forEach((dateSnapshot) => {
              const eventData = dateSnapshot.val();
              if (eventData.id === searchId) {
                console.log(eventData.organization);
                console.log('Found match:', eventData);
                
                // Delete the matched data
                dateSnapshot.ref.remove()
                  .then(() => {
                    console.log('Data deleted successfully.');
                    window.location.reload()
                    // Perform any further actions or UI updates here
                  })
                  .catch((error) => {
                    console.error('Error deleting data:', error);
                  });
              }
            });
          });
        });
      }
    });
  }
  

  function deletefacevents() {
    console.log("delete initiated...!")
    var searchId = localStorage.getItem("delid");
    console.log(searchId);
  
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        const path = `facultycertify/${uid}`;
  
        const userRef = database.ref(path);
        userRef.once('value', (snapshot) => {
          snapshot.forEach((eventSnapshot) => {
            eventSnapshot.forEach((dateSnapshot) => {
              const eventData = dateSnapshot.val();
              if (eventData.id === searchId) {
                console.log(eventData.organization);
                console.log('Found match:', eventData);
                
                // Delete the matched dat2222a
                dateSnapshot.ref.remove()
                  .then(() => {
                    console.log('Data deleted successfully.');
                    window.location.reload()
                    // Perform any further actions or UI updates here
                  })
                  .catch((error) => {
                    console.error('Error deleting data:', error);
                  });
              }
            });
          });
        });
      }
    });
  }
  






firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        firebase.database().ref('user/'+uid).once('value').then(function(snapshot){
        let name=snapshot.val().name;
        //console.log(name)
        name = document.getElementById("profile-name").textContent=name;

            })
    }
})

function populateForm(data) {
    const formFields = document.getElementById('formFields');
    
    // Clear any existing form fields
    formFields.innerHTML = '';

    // Create input fields dynamically based on data
    Object.keys(data).forEach(key => {
        const label = document.createElement('label');
        label.className = 'label';
        label.textContent = key;
        
        const input = document.createElement('input');
        input.className = 'input form-control';
        input.type = 'text';
        input.name = key;
        input.value = data[key];

        if (key === 'certificate' || key === 'id' || key === 'event' || key === 'mode') {
            input.readOnly = true;
        }
        
        const lineBreak = document.createElement('br');
        
        formFields.appendChild(label);
        formFields.appendChild(input);
        formFields.appendChild(lineBreak);
    });
}

// Your editform() function here to retrieve data from Firebase
function editform() {
    var searchId = localStorage.getItem("id");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;
            const path = `stucertify/${uid}`;

            const userRef = firebase.database().ref(path);
            userRef.once('value', (snapshot) => {
                snapshot.forEach((eventSnapshot) => {
                    eventSnapshot.forEach((dateSnapshot) => {
                        const eventData = dateSnapshot.val();
                        if (eventData.id === searchId) {
                            populateForm(eventData);
                        }
                    });
                });
            });
        }
    });
}



// Add an event listener to the form
document.getElementById('editForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const updatedData = {};
    formData.forEach((value, key) => {
        updatedData[key] = value;
    });

    // Your code to update data in Firebase here
    updateDataInFirebase(updatedData);
});

// Function to update data in Firebase
function updateDataInFirebase(updatedData) {
    var searchId = localStorage.getItem("id");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;

            var role= localStorage.getItem("role")
            var path=""
            if(role=="faculty"){
                path=`facultycertify/${uid}`;
            }
            else{
                path = `stucertify/${uid}`;
            }

            const userRef = firebase.database().ref(path);
            userRef.once('value', (snapshot) => {
                snapshot.forEach((eventSnapshot) => {
                    eventSnapshot.forEach((dateSnapshot) => {
                        const eventData = dateSnapshot.val();
                        if (eventData.id === searchId) {
                            dateSnapshot.ref.update(updatedData);
                            console.log("Data updated successfully.");
                        }
                    });
                });
            });
        }
    });
}


function fillfactable() {
    const tableBody = document.getElementById("tableBody");

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        // Function to retrieve and populate data
        database.ref("facultycertify/" + uid).on("value", (snapshot) => {
          tableBody.innerHTML = ""; // Clear the table before populating
          var sno=1
          snapshot.forEach((userSnapshot) => {
            userSnapshot.forEach((eventSnapshot) => {
                
              const eventDetails = eventSnapshot.val();
              const eventName = eventDetails.event;
              const eventDate = eventDetails.date;
              const organization = eventDetails.organization;
              const formid = eventDetails.id;
              console.log(formid)

              const row = document.createElement("tr");
              row.innerHTML = `
              <td>${sno}</td>
                <td>${eventName}</td>
                <td>${organization}</td>
                <td>${eventDate}</td>
                <td><button onclick="copyfacid('${formid}')" class="btn">Edit</button></td>
                <td><button onclick="deletefacForm('${formid}')" class="btn">Delete</button></td>
              `;

              tableBody.appendChild(row);
              sno+=1
            });
          });
        });
      }
    });
  }





// Call editform() to populate the form with data from Firebase




//for admin displaying student records this function below is used


// Function to generate a card for each user and append it to the specified section
function createUserCard(userId, userData, section) {
    const card = document.createElement('div');
    card.className = 'card';

    const userName = userData.name;
    const year = userData.year;
    const semester = userData.semester;
    const count = userData.count;
    const regno = userData.regno
    const branch = userData.branch;
    const uid = userData.uid;
    //console.log("Card Created for "+userName+" and his/her userId is: "+uid)
    
    var profileImage = userData.profile;

    if(profileImage=="undefined"|| profileImage==undefined|| profileImage=="null" || profileImage==null ||  profileImage==NaN){
        profileImage = "https://firebasestorage.googleapis.com/v0/b/accelerp-2c3ce.appspot.com/o/image-removebg-preview%20(5).png?alt=media&token=b03c4c4f-4bd9-4ffb-b54b-b18bd97455fc"
    }

    card.innerHTML = `
        <img src="${profileImage}" alt="${userName}'s Profile Image" class="profile-image">
        <h2>${userName}</h2>
        <h3>[ ${regno} ]</h3> <!-- Display registration number -->
        <p>Year: ${year}</p>
        <p>Semester: ${semester}</p>
        <strong>${branch}</strong>
        <h6>Certification Count: <span class="card-count">${count}</span></h6>
    `;

    card.dataset.userId = uid;
    card.dataset.profile = profileImage;
    card.dataset.name = userName;
    card.dataset.branch = branch;
    card.dataset.year = year;
    card.dataset.semester = semester;
    card.dataset.regno = regno;
   
    // Add a click event listener to the card
    card.addEventListener('click', () => {
        // Copy the user's UID to localStorage
        localStorage.setItem('selectedUserId', userId);
        window.location.href="/html/admin/admin-info/events-stu-rec.html";
    });

    section.appendChild(card);
}


// Function to fetch and display user data
function displayUserData() {
    const usersRef = database.ref('user'); // Change 'users' to your Firebase database path

    usersRef.on('child_added', (snapshot) => {
        const userId = snapshot.key;
        const userData = snapshot.val();

        // Check if the user's role is "student"
        if (userData.role === 'student') {
            const year = userData.year;

            // Create or select the section element for the corresponding year
            let yearSection = document.getElementById(`year-${year}-section`);
            if (!yearSection) {
                // If the section doesn't exist, create it
                yearSection = document.createElement('div');
                yearSection.id = `year-${year}-section`;
                yearSection.className = 'year-section';
                yearSection.innerHTML = `<h2>${year} Year</h2>`;
                document.getElementById('card-container').appendChild(yearSection);
            }

            createUserCard(userId, userData, yearSection);
        }
    });
}



function filterUserCards() {
    console.log("filtering...")
    const searchInput = document.getElementById('search-input');
    const filter = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        const userName = card.querySelector('h2').textContent.toLowerCase();
        const regNo = card.querySelector('h3').textContent.toLowerCase();

        if (userName.includes(filter) || regNo.includes(filter)) {
            card.style.display = 'block'; // Show matching cards
        } else {
            card.style.display = 'none'; // Hide non-matching cards
        }
    });
}






// ... Your existing JavaScript code ...



function filterUserCardsByDepartment(department) {
    console.log("Selected filter is dept "+ department)
    document.getElementById("filtered").innerHTML="Filtered by Department '"+department+"'"
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
        const userDepartment = card.querySelector('strong').textContent.toLowerCase();
        if (userDepartment === department) {
            card.style.display = 'block'; // Show matching cards
        } else {
            card.style.display = 'none'; // Hide non-matching cards
        }
    });
}




function filterAndSortUserCardsByCount(countFilter) {
    const cardContainer = document.getElementById('card-container');
    const cards = Array.from(document.querySelectorAll('.card'));

    // Convert cards NodeList to an array for sorting

    // Sort the cards by certification count
    cards.sort((a, b) => {
        const countA = extractCertificationCount(a);
        const countB = extractCertificationCount(b);

        if (countFilter === 'Greater') {
            return countB - countA; // Sort in descending order (most to least)
        } else if (countFilter === 'Shorter') {
            return countA - countB; // Sort in ascending order (least to most)
        }
    });

    // Display the sorted cards
    cardContainer.innerHTML = ''; // Clear the card container

    cards.forEach((card) => {
        cardContainer.appendChild(card);
    });
}




function extractCertificationCount(card) {
    const countElement = card.querySelector('h6');
    const countText = countElement.textContent;
    const match = countText.match(/\d+/); // Extract the number from the text

    if (match) {
        return parseInt(match[0], 10);
    } else {
        return 0; // Default value if no count is found
    }
}







// Event listener for the download button
function download(){

    document.getElementById("download-button").innerHTML="Downloading...!"
    // Get the filtered cards
    const filteredCards = getFilteredCards();

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Filtered Users');

    // Define column headers
    worksheet.addRow(['Name', 'Year & Semester', 'Certification Count']);

    // Extract and format the data from filtered cards
    filteredCards.forEach((card) => {
        const name = card.querySelector('h2').textContent;
        const yearSemester = card.querySelector('h3').textContent;
        const count = extractCertificationCount(card);
        worksheet.addRow([name, yearSemester, count]);
    });

    // Generate the Excel file as a blob
    workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a download link and trigger the download
        const downloadLink = document.createElement('a');
        const fileName = 'filtered_users.xlsx';
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
}

// Function to get the filtered cards
function getFilteredCards() {
    const cards = document.querySelectorAll('.card');
    const filteredCards = [];

    // Add logic here to filter the cards (based on department, year, count, etc.)
    // For now, let's assume all cards are filtered and return them all
    cards.forEach((card) => {
        if (card.style.display !== 'none') {
            filteredCards.push(card);
        }
    });

    return filteredCards;
}




async function downloadpdf() {

    document.getElementById("download-pdf-button").innerHTML="Downloading...!"
    // Get the filtered cards (already displayed)
    const filteredCards = getFilteredCards();

    // Define a content array for pdfmake
    const pdfContent = [];

    // Define a style for keys (brown color and capitalize first letter)
    const keyStyle = {
        color: 'brown',
        bold: true,
        margin: [0, 5, 0, 0], // Adjust margin as needed
        decoration: 'underline', // Underline the keys
    };

    // Iterate over the filtered cards
    for (const card of filteredCards) {
        try {
            // Extract user details from each card (adjust as per your HTML structure)
            const name = card.dataset.name;
            const branch = card.dataset.branch;
            const year = card.dataset.year;
            const semester = card.dataset.semester;
            const regno = card.dataset.regno;
            const uid = card.dataset.userId;
            console.log(name+" "+uid)

            // Define user card content with the profile image
            const userCardContent = [
                {
                    stack: [
                        {
                            text: 'User Details',
                            style: 'header',
                        },
                        {
                            text: `Name: ${name}`,
                        },
                        {
                            text: `Branch: ${branch}`,
                        },
                        {
                            text: `Year: ${year}`,
                        },
                        {
                            text: `Semester: ${semester}`,
                        },
                        {
                            text: `Reg No: ${regno}`,
                        },
                    ],
                    alignment: 'left', // Align the user card to the left
                    margin: [0, 0, 0, 10], // Adjust margins as needed
                },
            ];

            // Retrieve additional info for the user from 'stucertify'
            const userStucertifySnapshot = await firebase.database().ref(`stucertify/${uid}`).once('value');

           
            const userStucertifyData = userStucertifySnapshot.val();


            if(userStucertifyData==null||userStucertifyData==undefined||userStucertifyData=="undefined"){
                pdfContent.push(userCardContent);
            
            }

            else{

            // Group additional information by date
            const additionalInfoByDate = {};

            // Iterate over 'eventname' keys
            for (const eventName in userStucertifyData) {
                if (userStucertifyData.hasOwnProperty(eventName)) {
                    // Get 'eventname' data
                    const eventnameData = userStucertifyData[eventName];

                    // Iterate over 'date' keys
                    for (const date in eventnameData) {
                        if (eventnameData.hasOwnProperty(date)) {
                            if (!additionalInfoByDate[date]) {
                                additionalInfoByDate[date] = [];
                            }

                            // Iterate over the keys in dateData and add them to the group
                            for (const key in eventnameData[date]) {
                                if (eventnameData[date].hasOwnProperty(key)) {
                                    additionalInfoByDate[date].push({
                                        key: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
                                        value: eventnameData[date][key],
                                    });
                                }
                            }
                        }
                    }
                }
            }

            // Iterate over the grouped additional information and create tables
            for (const date in additionalInfoByDate) {
                if (additionalInfoByDate.hasOwnProperty(date)) {
                    const dateData = additionalInfoByDate[date];

                    // Sort the data by key with the desired order
                    dateData.sort((a, b) => {
                        const keyOrder = {
                            Event: 0,
                            Date: 1,
                            Certificate: 2,
                        };

                        const keyA = a.key.toLowerCase();
                        const keyB = b.key.toLowerCase();

                        return keyOrder[keyA] - keyOrder[keyB];
                    });

                    // Create a table for additional info for each date
                    const additionalInfoTable = {
                        table: {
                            headerRows: 1,
                            widths: ['auto', '*'], // Adjust column widths as needed
                            body: [
                                // Header row
                                [{ text: 'Fields', style: keyStyle }, { text: 'Data', style: keyStyle }],
                            ],
                        },
                        layout: {
                            hLineWidth: function (i, node) {
                                return (i === 0) ? 1 : 0; // Add line for the header row only
                            },
                            hLineColor: function (i, node) {
                                return 'gray'; // Color of horizontal lines
                            },
                        },
                    };

                    // Add rows to the additional info table
                    for (const info of dateData) {
                        if (info.key === 'certificate' || info.key === 'Certificate') {
                            additionalInfoTable.table.body.push([{ text: info.key, link: info.value, bold: false}, {text: 'click here', link: info.value, color: 'blue'}]);
                        } else if (info.key === 'event' || info.key === 'Event') {
                            additionalInfoTable.table.body.push([{ text: info.key, bold: true, color: 'red', fontSize: 14 }, {text:info.value,bold: true, color:'red',fontSize: 14 }]);
                        } else {
                            additionalInfoTable.table.body.push([info.key, info.value]);
                        }
                    }

                    // Push the user card content followed by the additional info table to pdfContent
                    pdfContent.push(userCardContent, additionalInfoTable);
                }
            }
            }
        } catch (error) {
            console.error('Error retrieving stucertify data from Firebase:', error);
            document.getElementById("download-pdf-button").innerHTML="Error Occured! Contact Admin support."
        }
    
    }//closing filtered cards iteration forloop

    // Define the PDF document definition using pdfmake
    const documentDefinition = {
        content: pdfContent,
        styles: {
            header: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5],
            },
        },
    };

    // Generate the PDF using pdfmake
    pdfMake.createPdf(documentDefinition).download('filtered_users.pdf');
}








  function getFilteredCards() {
    const cards = document.querySelectorAll('.card');
    const filteredCards = [];
  
    // Add logic here to filter the cards (based on department, year, count, etc.)
    // For now, let's assume all cards are filtered and return them all
    cards.forEach((card) => {
        if (card.style.display !== 'none') {
            filteredCards.push(card);
        }
    });
  
    return filteredCards;
  }
  
  // Function to extract certification count (same as before)
  function extractCertificationCount(card) {
    const countText = card.querySelector('h6').textContent;
    const match = countText.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }




  














  //faculty export
  function downloadfac(){

    document.getElementById("download-button").innerHTML="Downloading...!"
    // Get the filtered cards
    const filteredCards = getFilteredCards1();

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Filtered Users');

    // Define column headers
    worksheet.addRow(['Name', 'Year & Semester', 'Certification Count']);

    // Extract and format the data from filtered cards
    filteredCards.forEach((card) => {
        const name = card.querySelector('h2').textContent;
        const yearSemester = card.querySelector('h3').textContent;
        const count = extractCertificationCount(card);
        worksheet.addRow([name, yearSemester, count]);
    });

    // Generate the Excel file as a blob
    workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a download link and trigger the download
        const downloadLink = document.createElement('a');
        const fileName = 'filtered_users.xlsx';
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = fileName;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
}

// Function to get the filtered cards
function getFilteredCards1() {
    const cards = document.querySelectorAll('.card');
    const filteredCards = [];

    // Add logic here to filter the cards (based on department, year, count, etc.)
    // For now, let's assume all cards are filtered and return them all
    cards.forEach((card) => {
        if (card.style.display !== 'none') {
            filteredCards.push(card);
        }
    });

    return filteredCards;
}




async function downloadfacpdf() {

    document.getElementById("download-pdf-button").innerHTML="Downloading...!"
    // Get the filtered cards (already displayed)
    const filteredCards = getFilteredCards();

    // Define a content array for pdfmake
    const pdfContent = [];

    // Define a style for keys (brown color and capitalize first letter)
    const keyStyle = {
        color: 'brown',
        bold: true,
        margin: [0, 5, 0, 0], // Adjust margin as needed
        decoration: 'underline', // Underline the keys
    };

    // Iterate over the filtered cards
    for (const card of filteredCards) {
        try {
            // Extract user details from each card (adjust as per your HTML structure)
            const name = card.dataset.name;
            const branch = card.dataset.branch;
            const year = card.dataset.year;
            const semester = card.dataset.semester;
            const regno = card.dataset.regno;
            const uid = card.dataset.userId;
            console.log(name+" "+uid)

            // Define user card content with the profile image
            const userCardContent = [
                {
                    stack: [
                        {
                            text: 'User Details',
                            style: 'header',
                        },
                        {
                            text: `Name: ${name}`,
                        },
                        {
                            text: `Branch: ${branch}`,
                        },
                        {
                            text: `Year: ${year}`,
                        },
                        {
                            text: `Semester: ${semester}`,
                        },
                        {
                            text: `Reg No: ${regno}`,
                        },
                    ],
                    alignment: 'left', // Align the user card to the left
                    margin: [0, 0, 0, 10], // Adjust margins as needed
                },
            ];

            // Retrieve additional info for the user from 'stucertify'
            const userStucertifySnapshot = await firebase.database().ref(`facultycertify/${uid}`).once('value');

           
            const userStucertifyData = userStucertifySnapshot.val();


            if(userStucertifyData==null||userStucertifyData==undefined||userStucertifyData=="undefined"){
                pdfContent.push(userCardContent);
            
            }

            else{

            // Group additional information by date
            const additionalInfoByDate = {};

            // Iterate over 'eventname' keys
            for (const eventName in userStucertifyData) {
                if (userStucertifyData.hasOwnProperty(eventName)) {
                    // Get 'eventname' data
                    const eventnameData = userStucertifyData[eventName];

                    // Iterate over 'date' keys
                    for (const date in eventnameData) {
                        if (eventnameData.hasOwnProperty(date)) {
                            if (!additionalInfoByDate[date]) {
                                additionalInfoByDate[date] = [];
                            }

                            // Iterate over the keys in dateData and add them to the group
                            for (const key in eventnameData[date]) {
                                if (eventnameData[date].hasOwnProperty(key)) {
                                    additionalInfoByDate[date].push({
                                        key: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
                                        value: eventnameData[date][key],
                                    });
                                }
                            }
                        }
                    }
                }
            }

            // Iterate over the grouped additional information and create tables
            for (const date in additionalInfoByDate) {
                if (additionalInfoByDate.hasOwnProperty(date)) {
                    const dateData = additionalInfoByDate[date];

                    // Sort the data by key with the desired order
                    dateData.sort((a, b) => {
                        const keyOrder = {
                            Event: 0,
                            Date: 1,
                            Certificate: 2,
                        };

                        const keyA = a.key.toLowerCase();
                        const keyB = b.key.toLowerCase();

                        return keyOrder[keyA] - keyOrder[keyB];
                    });

                    // Create a table for additional info for each date
                    const additionalInfoTable = {
                        table: {
                            headerRows: 1,
                            widths: ['auto', '*'], // Adjust column widths as needed
                            body: [
                                // Header row
                                [{ text: 'Fields', style: keyStyle }, { text: 'Data', style: keyStyle }],
                            ],
                        },
                        layout: {
                            hLineWidth: function (i, node) {
                                return (i === 0) ? 1 : 0; // Add line for the header row only
                            },
                            hLineColor: function (i, node) {
                                return 'gray'; // Color of horizontal lines
                            },
                        },
                    };

                    // Add rows to the additional info table
                    for (const info of dateData) {
                        if (info.key === 'certificate' || info.key === 'Certificate') {
                            additionalInfoTable.table.body.push([{ text: info.key, link: info.value, bold: false}, {text: 'click here', link: info.value, color: 'blue'}]);
                        } else if (info.key === 'event' || info.key === 'Event') {
                            additionalInfoTable.table.body.push([{ text: info.key, bold: true, color: 'red', fontSize: 14 }, {text:info.value,bold: true, color:'red',fontSize: 14 }]);
                        } else {
                            additionalInfoTable.table.body.push([info.key, info.value]);
                        }
                    }

                    // Push the user card content followed by the additional info table to pdfContent
                    pdfContent.push(userCardContent, additionalInfoTable);
                }
            }
            }
        } catch (error) {
            console.error('Error retrieving stucertify data from Firebase:', error);
            document.getElementById("download-pdf-button").innerHTML="Error Occured! Contact Admin support."
        }
    
    }//closing filtered cards iteration forloop

    // Define the PDF document definition using pdfmake
    const documentDefinition = {
        content: pdfContent,
        styles: {
            header: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5],
            },
        },
    };

    // Generate the PDF using pdfmake
    pdfMake.createPdf(documentDefinition).download('filtered_users.pdf');
}


function uploadresume(){
    const fileInput = document.getElementById('resume1');
  const file = fileInput.files[0];
  const storageRef = storage.ref();
 

  if (!file) {
    alert('Please select a file.');
    return;
  }

  if (file.size > 3 * 1024 * 1024) {
    alert('File size exceeds the limit of 3MB.');
    return;
  }

  const fileName = file.name;
  const uploadTask = storageRef.child(`resumes/${fileName}`).put(file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Show upload progress (optional)
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById('status').textContent = `Uploading: ${Math.round(progress)}%`;
    },
    (error) => {
      console.error('Upload error:', error);
      document.getElementById('status').textContent = 'Upload failed.';
    },
    () => {
      // Upload completed, now get the download URL and save it to the database
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        // Save the download URL in Firebase Realtime Database
        const newUserRef = database.ref("user/"+global_uid+"/")
        newUserRef.update({
          resume: downloadURL,
        })
        
        

        // Reset form and status
        fileInput.value = '';
        document.getElementById('status').textContent = 'Upload complete.';
        
      });
    }
  );
}


function checkresume(){
    const pdfFrame = document.getElementById("pdf-frame");
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
           var uid = user.uid;

           firebase.database().ref('user/'+uid).once('value').then(function(snapshot){
            let resume=snapshot.val().resume;

            if(resume==""||resume==undefined||resume=="undefined"||resume==null){
                document.getElementById("resumecontainer").style.visibility="hidden"
                pdfFrame.style.visibility="hidden"
            }
            else{

                document.getElementById("uploadingresumecontainer").style.visibility="hidden";
                pdfFrame.style.visibility="visible"
                const pdfUrl = resume;
                pdfFrame.src = pdfUrl;
            }
      



})
}
})
}