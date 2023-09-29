function copyfacid(formid){
    console.log("in fucntion" +formid)

    localStorage.setItem("id", formid) 
window.location.href = "/Info_IT/html/editfac.html"   
}


function deletefacForm(formid){
    console.log(formid)
    lightboxWrapper = document.getElementById("lightboxWrapper");
    lightboxWrapper.style.display = 'flex';

    var cancelButton = document.getElementById("cancelButton")
    var deletebutton = document.getElementById("delconfirm")

    deletebutton.addEventListener('click', () => {

        localStorage.setItem("delid",formid)
        deletefacevents()
    
      });
    
      cancelButton.addEventListener('click', () => {
        lightboxWrapper.style.display = 'none';
      });

  
        
   
   

}





  function editfacform1() {
    var searchId = localStorage.getItem("id");
    console.log(searchId)

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;
            const path = `facultycertify/${uid}`;

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


// Function to update data in Firebase
function updateDataInFirebase(updatedData) {
    var searchId = localStorage.getItem("id");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;

          
                path=`facultycertify/${uid}`;
         

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