import Realm from 'realm';
import realm from './realm.js';

export default class ScoreRealm {
    static schema = {
        //schema for User
        name: 'Score',
        properties: 
        {
            name: "string",
            score: "int",
            date: "string",
            dificult: "string",
        }
    }

    //method to return all notes
    static getScore(){
        return realm.objects("Score");
    }

    //method to write note
    static addResults (result) {
        var today = new Date(); // current date
        var td = today.toDateString(); // format date
        realm.write( ()=>{
            // write to db res
        let myRes = realm.create('Score',{
         name : result.name,
         score : result.res,
         date : td,
         dificult : result.difi,
         location : result.location,
     })
 });
    }
}