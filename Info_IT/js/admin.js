const searchInput = document.getElementById('searchText');

  const resultsContainer = document.getElementById('results');

  function search(){
    const query = searchInput.value
    console.log(query)
    if (query !== '') {
      // Reference to the Firebase database
      const databaseRef = firebase.database().ref('user');

      // Search for user details based on the query
      databaseRef.orderByKey().once('value').then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const uid = childSnapshot.key;
          const userDetails = childSnapshot.val();
          if (userDetails.name === query) {
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `
              <p>Name: ${userDetails.name}</p>
              <p>ID: ${userDetails.id}</p>
              <p>Role: ${userDetails.role}</p>
              <!-- Add more fields as needed -->
            `;
            resultsContainer.appendChild(resultElement);
          }
        });
      });
    }
  }


  function specificfaculty(){
    

      // Retrieve UID from Local Storage
      const uid = localStorage.getItem("selectedUserId");
      console.log(uid)
      
      // Reference to the Firebase database
      const db = firebase.database();
      
      // Reference to the user's personal details
      const userDetailsRef = db.ref(`user/${uid}`);
      
      // Reference to the stucertify data
      const stucertifyRef = db.ref(`facultycertify/${uid}`);
      
      // Reference to the DOM elements
      const profilePhoto = document.getElementById("profile-photo");
      const nameElement = document.getElementById("name");
      const branchElement = document.getElementById("branch");
      const yearElement = document.getElementById("yearsem");
      const emailElement = document.getElementById("email");
      const genderElement = document.getElementById("gender");
      const phoneElement = document.getElementById("phone");
      
      const eventsContainer = document.querySelector(".events-container");
      
      // Retrieve and display personal details
      userDetailsRef.on("value", (snapshot) => {
        const userDetails = snapshot.val();
        if (userDetails) {
            profilePhoto.src = userDetails.profile || "https://firebasestorage.googleapis.com/v0/b/accelerp-2c3ce.appspot.com/o/image-removebg-preview%20(5).png?alt=media&token=b03c4c4f-4bd9-4ffb-b54b-b18bd97455fc";
            nameElement.textContent = userDetails.name || "";
            genderElement.textContent = userDetails.gender || "";
            emailElement.textContent = userDetails.email || "";
            phoneElement.textContent = userDetails.phone || "";
            branchElement.textContent = userDetails.branch || "";
            yearElement.textContent = userDetails.year+" & "+userDetails.semester || "";
           
        }
      });
      
      // Retrieve and display stucertify data
      // ...
      
      // Initialize a variable to keep track of the date numbering
      let dateNumber = 0;
      
      // Retrieve and display stucertify data
      stucertifyRef.on("child_added", (snapshot) => {
          const eventName = snapshot.key;
          const eventDates = snapshot.val();
      
          // Create an event card
          const eventCard = document.createElement("div");
          eventCard.classList.add("event-card");
      
          // Count the total number of dates
          const totalDates = Object.keys(eventDates).length;
      
          // Create event name element
          const eventNameElement = document.createElement("p");
          eventNameElement.classList.add("event-name");
          eventNameElement.textContent = `Event Name: ${eventName}`;
          eventCard.appendChild(eventNameElement);
      
          // Display total count of dates
          const totalCountElement = document.createElement("strong");
          totalCountElement.classList.add("event-total-count");
          totalCountElement.style.textDecoration = "underline";
          totalCountElement.textContent = `Total ${totalDates} Certifications in ${eventName}`;
          eventCard.appendChild(totalCountElement);
      
          // Reset date numbering for each event
          dateNumber = 0;
      
          // Loop through event dates and display details
          // ...
      
      // Loop through event dates and display details
      for (const date in eventDates) {
        if (eventDates.hasOwnProperty(date)) {
            const eventData = eventDates[date];
      
            const eventDateElement = document.createElement("div");
            eventDateElement.classList.add("event-date");
      
            // Increment date numbering
            dateNumber++;
      
            // Display date numbering
            const dateNumberElement = document.createElement("p");
            dateNumberElement.classList.add("date-number");
            dateNumberElement.textContent = `Event ${dateNumber}:`;
            dateNumberElement.style.textDecoration = "underline";
            eventDateElement.appendChild(dateNumberElement);
      
            // Display date
            const dateElement = document.createElement("p");
            dateElement.textContent = `Date: ${date}`;
            eventDateElement.appendChild(dateElement);
      
            // Display all other data dynamically
            for (const key in eventData) {
                if (eventData.hasOwnProperty(key)) {
                    const dataElement = document.createElement("p");
                    if (key === "certificate") {
                        // If the key is "certificate," display the image and add a click event listener
                        const certificateImage = document.createElement("img");
                        certificateImage.src = eventData[key];
                        certificateImage.alt = "Certificate";
                        certificateImage.classList.add("certificate-image");
                        certificateImage.addEventListener("click", () => {
                            window.open(eventData[key], "_blank");
                        });
                        dataElement.appendChild(certificateImage);
                    } else {
                        // Otherwise, display the data as text
                        dataElement.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${eventData[key]}`;
                    }
                    eventDateElement.appendChild(dataElement);
                }
            }
      
            // Append a horizontal line after each date's data
            const horizontalLine = document.createElement("hr");
            eventDateElement.appendChild(horizontalLine);
      
            // Append the event date details to the event card
            eventCard.appendChild(eventDateElement);
        }
      }
      
      // ...
      
      
          // Append the event card to the events container
          eventsContainer.appendChild(eventCard);
      });
      
      // ...
      
      
      
  }



function specificstudent(){

// Retrieve UID from Local Storage
const uid = localStorage.getItem("selectedUserId");
console.log(uid)

// Reference to the Firebase database
const db = firebase.database();

// Reference to the user's personal details
const userDetailsRef = db.ref(`user/${uid}`);

// Reference to the stucertify data
const stucertifyRef = db.ref(`stucertify/${uid}`);

// Reference to the DOM elements
const profilePhoto = document.getElementById("profile-photo");
const nameElement = document.getElementById("name");
const branchElement = document.getElementById("branch");
const yearElement = document.getElementById("yearsem");
const emailElement = document.getElementById("email");
const genderElement = document.getElementById("gender");
const phoneElement = document.getElementById("phone");

const eventsContainer = document.querySelector(".events-container");

// Retrieve and display personal details
userDetailsRef.on("value", (snapshot) => {
  const userDetails = snapshot.val();
  if (userDetails) {
      profilePhoto.src = userDetails.profile || "https://firebasestorage.googleapis.com/v0/b/accelerp-2c3ce.appspot.com/o/image-removebg-preview%20(5).png?alt=media&token=b03c4c4f-4bd9-4ffb-b54b-b18bd97455fc";
      nameElement.textContent = userDetails.name || "";
      genderElement.textContent = userDetails.gender || "";
      emailElement.textContent = userDetails.email || "";
      phoneElement.textContent = userDetails.phone || "";
      branchElement.textContent = userDetails.branch || "";
      yearElement.textContent = userDetails.year+" & "+userDetails.semester || "";
     
  }
});

// Retrieve and display stucertify data
// ...

// Initialize a variable to keep track of the date numbering
let dateNumber = 0;

// Retrieve and display stucertify data
stucertifyRef.on("child_added", (snapshot) => {
    const eventName = snapshot.key;
    const eventDates = snapshot.val();

    // Create an event card
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");

    // Count the total number of dates
    const totalDates = Object.keys(eventDates).length;

    // Create event name element
    const eventNameElement = document.createElement("p");
    eventNameElement.classList.add("event-name");
    eventNameElement.textContent = `Event Name: ${eventName}`;
    eventCard.appendChild(eventNameElement);

    // Display total count of dates
    const totalCountElement = document.createElement("strong");
    totalCountElement.classList.add("event-total-count");
    totalCountElement.style.textDecoration = "underline";
    totalCountElement.textContent = `Total ${totalDates} Certifications in ${eventName}`;
    eventCard.appendChild(totalCountElement);

    // Reset date numbering for each event
    dateNumber = 0;

    // Loop through event dates and display details
    // ...

// Loop through event dates and display details
for (const date in eventDates) {
  if (eventDates.hasOwnProperty(date)) {
      const eventData = eventDates[date];

      const eventDateElement = document.createElement("div");
      eventDateElement.classList.add("event-date");

      // Increment date numbering
      dateNumber++;

      // Display date numbering
      const dateNumberElement = document.createElement("p");
      dateNumberElement.classList.add("date-number");
      dateNumberElement.textContent = `Event ${dateNumber}:`;
      dateNumberElement.style.textDecoration = "underline";
      eventDateElement.appendChild(dateNumberElement);

      // Display date
      const dateElement = document.createElement("p");
      dateElement.textContent = `Date: ${date}`;
      eventDateElement.appendChild(dateElement);

      // Display all other data dynamically
      for (const key in eventData) {
          if (eventData.hasOwnProperty(key)) {
              const dataElement = document.createElement("p");
              if (key === "certificate") {
                  // If the key is "certificate," display the image and add a click event listener
                  const certificateImage = document.createElement("img");
                  certificateImage.src = eventData[key];
                  certificateImage.alt = "Certificate";
                  certificateImage.classList.add("certificate-image");
                  certificateImage.addEventListener("click", () => {
                      window.open(eventData[key], "_blank");
                  });
                  dataElement.appendChild(certificateImage);
              } else {
                  // Otherwise, display the data as text
                  dataElement.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${eventData[key]}`;
              }
              eventDateElement.appendChild(dataElement);
          }
      }

      // Append a horizontal line after each date's data
      const horizontalLine = document.createElement("hr");
      eventDateElement.appendChild(horizontalLine);

      // Append the event date details to the event card
      eventCard.appendChild(eventDateElement);
  }
}

// ...


    // Append the event card to the events container
    eventsContainer.appendChild(eventCard);
});

// ...


}



function displayFacultyData() {
  const usersRef = database.ref('user'); // Change 'users' to your Firebase database path

  usersRef.on('child_added', (snapshot) => {
      const userId = snapshot.key;
      const userData = snapshot.val();

      // Check if the user's role is "student"
      if (userData.role === 'faculty') {
          const department = userData.department;

          // Create or select the section element for the corresponding year
          let deptSection = document.getElementById(`year-${department}-section`);
          if (!deptSection) {
              // If the section doesn't exist, create it
              deptSection = document.createElement('div');


              deptSection.id = `year-${department}-section`;
              deptSection.className = 'year-section';
              deptSection.innerHTML = `<h2>${department} Dept</h2>`;
              document.getElementById('card-container').appendChild(deptSection);
          }

          createFacUserCard(userId, userData, deptSection);
      }
  });
}

function createFacUserCard(userId, userData, section) {
  const card = document.createElement('div');
  card.className = 'card';

  const userName = userData.name;
  const department = userData.department;
  const designation = userData.designation;
  const email = userData.email;
  const phone = userData.phone
  const uid = userData.uid;
  const count = userData.count;
  //console.log("Card Created for "+userName+" and his/her userId is: "+uid)
  
  var profileImage = userData.profile;

  if(profileImage=="undefined"|| profileImage==undefined|| profileImage=="null" || profileImage==null ||  profileImage==NaN){
      profileImage = "https://firebasestorage.googleapis.com/v0/b/accelerp-2c3ce.appspot.com/o/image-removebg-preview%20(5).png?alt=media&token=b03c4c4f-4bd9-4ffb-b54b-b18bd97455fc"
  }

  card.innerHTML = `
      <img src="${profileImage}" alt="${userName}'s Profile Image" class="profile-image">
      <h2>${userName}</h2>
      <h3>[ ${designation} ]</h3> <!-- Display registration number -->
      <p>Department: ${department}</p>
      <p>Email id: ${email}</p>
      <strong>${phone}</strong>
      <h6>Certification Count: <span class="card-count">${count}</span></h6>
  `;

  card.dataset.userId = uid;
  card.dataset.profile = profileImage;
  card.dataset.name = userName;
  card.dataset.department = department;
  card.dataset.designation = designation;
  card.dataset.phone = phone;
  card.dataset.email = email;
 
  // Add a click event listener to the card
  card.addEventListener('click', () => {
      // Copy the user's UID to localStorage
      localStorage.setItem('selectedUserId', userId);
      window.location.href="events-fac-rec.html";
  });

  section.appendChild(card);
}

