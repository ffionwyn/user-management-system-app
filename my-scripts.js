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

                let email = document.createElement("h5");
                email.classList.add("fs-6");
                email.innerHTML = "Email: " + data[id].Email;

                let dob = document.createElement("h5");
                dob.classList.add("fs-6");
                dob.innerHTML = "DOB: " + data[id].DOB;

                person.appendChild(firstName);
                person.appendChild(secondName);
                person.appendChild(email);
                person.appendChild(dob);

                content.appendChild(person);
            });
        });
}
