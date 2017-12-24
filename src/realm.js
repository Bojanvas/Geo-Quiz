import Realm from 'realm';
import User from "./user.js";
console.log("this is value of this "+User);
const realm = new Realm({
  schema: [
    User
  ],
})

export default realm