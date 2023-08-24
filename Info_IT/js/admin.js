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