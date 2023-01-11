const apiUser = "http://localhost:3000/users";

function start() {
    getUsers(renderUsers);
    handleCreateUser();
}
start();

// Object blueprints
function User(name, phone, id) {
    this.phone = phone;
    this.name = name;
    this.id = id;
}

// Functions
function getUsers(callback) {
    var options = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }

    fetch(apiUser, options)
        .then((resp) => resp.json())
        .then(callback)
}
function handleDeleteUser(id) {
    const userItemDom = document.querySelector(`.user-item-${id}`);
    deleteUser(id);
    userItemDom.remove();
}
function deleteUser(id) {
    var options = {
        method: "DELETE"
    }
    fetch(`${apiUser}/${id}`, options)
}

function handleCreateUser() {
    var btnCreateUserDom = document.querySelector("#btn-createUser");
    btnCreateUserDom.onclick = function () {
        var name = document.querySelector("input[name='name']").value;
        var phone = document.querySelector("input[name='phone']").value;
        var newUser = new User(name, phone);
        createUser(newUser, (user) => {
            const listUserDom = document.querySelector("#list-user");
            var userItemDom = `<li class="user-item-${user.id}">Name: ${user.name}; Phone: ${user.phone} </li>`;
            listUserDom.append = userItemDom;
        });
    }
}

function createUser(user, callback) {
    var options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }
    fetch(apiUser, options)
        .then((resp) => resp.json())
        .then(callback);
}

function renderUsers(users) {
    const listUserDom = document.querySelector("#list-user");
    var userItemDom = "";
    users.forEach(u => {
        userItemDom += `<li class="user-item-${u.id}">Name: ${u.name}; Phone: ${u.phone}
        <button onclick="handleDeleteUser(${u.id})">Delete</button></li>`;
    });
    listUserDom.innerHTML = userItemDom;
}