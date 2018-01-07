import User from "./user.js";
import Score from "./score_realm.js";
import Realm from 'realm';

const realm = new Realm({
  schema: [
    User,
    Score
  ],
})

export default realm