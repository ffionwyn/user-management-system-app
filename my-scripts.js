async function seeAllUsers() {
    fetch('http://localhost:5000/users')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let peopleIDS = Object.keys(data);
            let content = document.getElementById("main-content");
            
            content.innerHTML = "";
            
                peopleIDS.map(id => {
                let person = document.createElement("div");
                person.classList.add("mb-3");

                let firstName = document.createElement("h5");
                firstName.classList.add("fs-6");
                firstName.innerHTML = "First Name: " + data[id].FirstName;

                let secondName = document.createElement("h5");
                secondName.classList.add("fs-6");
                secondName.innerHTML = "Second Name: " + data[id].SecondName;

                let dob = document.createElement("h5");
                dob.classList.add("fs-6");
                dob.innerHTML = "DOB: " + data[id].DOB;
                    
                person.appendChild(firstName);
                person.appendChild(secondName);
                person.appendChild(dob);

                content.appendChild(person);
            });
        });
}

document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const createUserButton = document.getElementById("modal-create-user-button");
  const updateButton = document.getElementById("update-button");

  searchButton.addEventListener("click", handleSearch);
  createUserButton.addEventListener("click", handleCreateUser);
  updateButton.addEventListener("click", handleUpdateUser);

    
function handleSearch() {
  const query = searchInput.value.toLowerCase();

  fetch('http://localhost:5000/users')
    .then(response => response.json())
    .then(data => {
      const filteredUsers = Object.values(data).filter(person =>
        person.FirstName.toLowerCase().includes(query)
      );

      searchInput.value = "";

      displayFilteredUsers(filteredUsers);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
}

  function displayFilteredUsers(filteredUsers) {
    let content = document.getElementById("main-content");
    content.innerHTML = "";

    filteredUsers.forEach(person => {
      let personContainer = document.createElement("div");
      personContainer.classList.add("mb-3");

      let firstName = document.createElement("h5");
      firstName.classList.add("fs-6");
      firstName.innerHTML = "First Name: " + person.FirstName;

      let secondName = document.createElement("h5");
      secondName.classList.add("fs-6");
      secondName.innerHTML = "Second Name: " + person.SecondName;

      let dob = document.createElement("h5");
      dob.classList.add("fs-6");
      dob.innerHTML = "DOB: " + person.DOB;

      personContainer.appendChild(firstName);
      personContainer.appendChild(secondName);
      personContainer.appendChild(dob);

      content.appendChild(personContainer);
    });
  }
});

 function handleCreateUser() {
  const firstNameInput = document.getElementById("new-first-name");
  const secondNameInput = document.getElementById("new-second-name");
  const dobInput = document.getElementById("new-dob");

   const userData = {
    FirstName: firstNameInput.value,
    SecondName: secondNameInput.value,
    DOB: dobInput.value
  };

    createNewUser(userData);
  }

function createNewUser(data) {
  fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      console.log("New user created:", result);
    })
    .catch(error => {
      console.error("Error creating user:", error);
    });
}
  
function handleUpdateUser() {
  const firstNameInput = document.getElementById("user-name");
  const secondNameInput = document.getElementById("second-name-input"); 
  const dobInput = document.getElementById("dob-input");

  const userData = {
    FirstName: firstNameInput.value,
    SecondName: secondNameInput.value,
    DOB: dobInput.value,

  };

  const userId = firstNameInput

  updateUserData(userId, userData);
}

function updateUserData(userId, data) {
  fetch(`http://localhost:5000/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      console.log("User updated:", result);
    })
    .catch(error => {
      console.error("Error updating user:", error);
    });
}
