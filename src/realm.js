import User from "./user.js";
import Realm from 'realm';

const realm = new Realm({
  schema: [
    User
  ],
})

export default realm