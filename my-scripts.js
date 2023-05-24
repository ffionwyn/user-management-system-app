async function seeAllUsers() {
    fetch('http://localhost:5000/users')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let peopleIDS = Object.keys(data);
            let content = document.getElementById("main-content");
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

  searchButton.addEventListener("click", handleSearch);

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