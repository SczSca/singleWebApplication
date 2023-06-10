class Usuarios {
    constructor(){
        this.users = [];
        this.last = null;
    }
    agregar(newUser){
        this.last ? newUser['id'] = this.last['id'] + 1 : newUser['id'] = 1;
        this.users.push(newUser);
        this.last = newUser;
    }
    buscar(username){
        let i = 0;
        let notFound = true;
        let userPosicion = null;
        while(this.users[i] && notFound){
            if(this.users[i]['username'] == username){
                notFound = false;
                userPosicion = i;
            }
            i++;
        }
        return userPosicion;
    }
    listar(){
        return this.users;
    }

}


export default Usuarios;