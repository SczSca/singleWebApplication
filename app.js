//modules
import Forms from './js/class/form.js'
import Usuarios from './js/class/usuario.js'
import Posts from './js/class/post.js'
import UI from './js/class/ui.js'
import Montador from './js/class/mount.js'

//data json
import userData from './userData.json' assert {type: 'json'}
import UserPosts from './userPosts.json' assert {type: 'json'}

//Objects
const interfaz = new UI;
const usuarios = new Usuarios();
const posts = new Posts();
const montador = new Montador();
const form = new Forms("register");

//html elements
const inputSearch = document.getElementById('inputSearch');
const formR = document.forms['registerForm'];
const bodyTable = document.getElementById('table');
const usersSelectTag = document.getElementById('usersSelect');
const divUsersPosts = document.getElementById('usersPosts');

//mount data into Objects
montador.mountData(userData,usuarios);
montador.mountData(UserPosts, posts);

//show data into html elements
interfaz.printUsers(usuarios.listar(),bodyTable);
interfaz.mountUsersToSelect(usuarios.listar(),usersSelectTag);
interfaz.printPosts(posts.getPosts(),usuarios.listar(),divUsersPosts);

//button events
formR.addEventListener("submit",function(e){
    e.preventDefault();
    //saves data of new user and save it into usuario Object
    form.submit(formR, usuarios);
    //displays all users after submission
    interfaz.printUsers(usuarios.listar(), bodyTable)
    //updates select tags with new user
    interfaz.mountUsersToSelect(usuarios.listar(),usersSelectTag);

})
inputSearch.addEventListener("change",function(e){
    e.preventDefault();
    /**
     * usuarios.buscar(InputValue) returns the position of the user in the array
     * usuarios.listar() returns the users array
     * form.showUserFound(userPosition, userArr, formHtml) displays user found into the form and disables inputs
     */
    form.showUserFound(usuarios.buscar(inputSearch.value), usuarios.listar(), formR);

})
usersSelectTag.addEventListener("change",function(e){
    e.preventDefault();
    //everytime the select tag changes, hides and displays the selected user posts
    interfaz.showUserPostsFromSelectedUser(divUsersPosts,this);
})
