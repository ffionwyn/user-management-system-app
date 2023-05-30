let selectedUser 

async function seeAllUsers() {
  fetch('http://localhost:5000/users', {
    headers: {
      'Authorization': `Basic ${btoa('testuser:testpass')}`
    }
  })
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
                  
                let email = document.createElement("h5");
                email.classList.add("fs-6");
                email.innerHTML = "Email: " + data[id].Email;

                  let deleteUserButton = document.createElement("button");
                  deleteUserButton.setAttribute("id", "delete-user-button") 
                  deleteUserButton.setAttribute("data-bs-toggle", "modal") 
                  deleteUserButton.setAttribute ("data-bs-target", "#deleteUserModal")
                  deleteUserButton.setAttribute("class", "btn btn-outline-dark btn-sm mb-2") 
                  deleteUserButton.setAttribute("data-bs-user-id", id)
                  deleteUserButton.innerHTML = "Delete User"

                  let updateUserButton = document.createElement("button");
                  updateUserButton.setAttribute("id", "update-user-button") 
                  updateUserButton.setAttribute("data-bs-toggle", "modal") 
                  updateUserButton.setAttribute ("data-bs-target", "#updateUser")
                  updateUserButton.setAttribute("class", "btn btn-outline-dark btn-sm mb-2") 
                  updateUserButton.setAttribute("data-bs-user-id", id)
                  updateUserButton.innerHTML = "Update User"

                  let uploadUserFileButton = document.createElement("button");
                  uploadUserFileButton.setAttribute("id", "upload-file-user-button") 
                  uploadUserFileButton.setAttribute("data-bs-toggle", "modal") 
                  uploadUserFileButton.setAttribute ("data-bs-target", "#uploadUserFile")
                  uploadUserFileButton.setAttribute("class", "btn btn-outline-dark btn-sm mb-2") 
                  uploadUserFileButton.setAttribute("data-bs-user-id", id)
                  uploadUserFileButton.innerHTML = "Upload User Contract"

                    
                person.appendChild(firstName);
                person.appendChild(secondName);
                person.appendChild(dob);
                person.appendChild(email);
                
                content.appendChild(deleteUserButton)
                content.appendChild(updateUserButton)
                content.appendChild(uploadUserFileButton)
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
  fetch('http://localhost:5000/users', {
    headers: {
      'Authorization': `Basic ${btoa('testuser:testpass')}`
    }
  })
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

      let email = document.createElement("h5");
      dob.classList.add("fs-6");
      dob.innerHTML = "Email: " + person.email;

      personContainer.appendChild(firstName);
      personContainer.appendChild(secondName);
      personContainer.appendChild(dob);
      person.Container.appendChild(email);

      content.appendChild(personContainer);
    });
  }
});

 function handleCreateUser() {
  const firstNameInput = document.getElementById("new-first-name");
  const secondNameInput = document.getElementById("new-second-name");
  const dobInput = document.getElementById("new-dob");
  const emailInput = document.getElementById("new-email");

   const userData = {
    FirstName: firstNameInput.value,
    SecondName: secondNameInput.value,
    DOB: dobInput.value,
    Email: emailInput.value,
  };

    createNewUser(userData);
  }

function createNewUser(data) {
  fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Basic ${btoa('testuser:testpass')}`
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
  const firstNameInput = document.getElementById("user-name-input");
  const secondNameInput = document.getElementById("second-name-input"); 
  const dobInput = document.getElementById("dob-input");
  const emailInput = document.getElementById("user-email-input");

  const userData = {
    FirstName: firstNameInput.value,
    SecondName: secondNameInput.value,
    DOB: dobInput.value,
    Email: emailInput.value,
  };
  const userId = firstNameInput
  handleUpdateButtonClick(userData);
}

function handleUpdateButtonClick(data) {
  console.log(selectedUser)
  fetch(`http://localhost:5000/users/${selectedUser}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Basic ${btoa('testuser:testpass')}`
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

function handleDeleteButtonClick() {
  fetch(`http://localhost:5000/users/${selectedUser}`, {
    method: "DELETE",
      headers: {
      'Authorization': `Basic ${btoa('testuser:testpass')}`
    }
  })
    .then(response => response.json())
    .then(result => {
      console.log("User deleted:", result);
    })
    .catch(error => {
      console.error("Error deleting user:", error);
    });
}

var deleteUserModal = document.getElementById('deleteUserModal');
deleteUserModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget;
  selectedUser = button.getAttribute('data-bs-user-id');
});

var updateUserModal = document.getElementById('updateUser');
updateUserModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget;
  console.log(button)
  selectedUser = button.getAttribute('data-bs-user-id');
});

function handleUploadFileClick() {
  const fileInput = document.getElementById("customFile");
  console.log("file input", fileInput)
  const file = fileInput.files[0];
  console.log("file", file)

  if (!file) {
    console.error("No file selected.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  console.log("form data", formData)

  fetch(`http://localhost:5000/users/contracts/${selectedUser}`, {
    method: "POST",
    headers: {
      'Authorization': `Basic ${btoa('testuser:testpass')}`
    },
    body: formData,
  })
    .then(result => {
      console.log("File uploaded:", result);
    })
    .catch(error => {
      console.error("Error uploading file:", error);
    });
}

var uploadUserFileModal = document.getElementById('uploadUserFile');
uploadUserFileModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget;
  selectedUser = button.getAttribute('data-bs-user-id');
});


