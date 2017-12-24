import realm from './realm.js';

export default class UserRealm {
    static schema = {
        //schema for User
        name: 'User',
        primaryKey:"id",
        properties: 
        {
            id:{type:"string", default:null},
            level:{type: 'int', default: 1},
            exp:{type: 'int', default: 0},
        }
    }

    //method to return all notes
    static getUser(){
        return realm.objects('User');
    }

    //method to write note
    static newUser (user) {
        realm.write(() =>
          realm.create('User', {
            id: user.id,
            level: user.level,
            exp: user.exp,
             })
        )
    }
       
}