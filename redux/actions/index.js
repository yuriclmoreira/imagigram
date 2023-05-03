import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import "firebase/auth";
import "firebase/firestore";
import {
  USER_STATE_CHANGE,
  USER_POST_CHANGE,
  USER_FOLLOWING_CHANGE,
  USERS_DATA_CHANGE,
  USERS_POST_CHANGE,
  CLEAR_DATA,
} from "../constants";

import { app, db } from "../../database/firebaseConfig";

export const clearData = () => {
  return (dispatch) => dispatch({ type: CLEAR_DATA });
};

export const fetchUser = () => {
  return (dispatch) => {
    const auth = getAuth(app);
    const uid = auth.currentUser.uid;

    const docRef = doc(db, "users", uid);

    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        dispatch({ type: USER_STATE_CHANGE, currentUser: { ...data, uid } });
      } else {
        console.log("Action Fetch User: User does not exists");
      }
    });
  };
};

export const fetchUserPosts = () => {
  return async (dispatch) => {
    const auth = getAuth(app);
    const uid = auth.currentUser.uid;

    const postsRef = collection(db, "posts");

    const queryPosts = query(collection(postsRef, uid, "userPosts"));
    const querySnapshot = await getDocs(queryPosts);

    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });

    dispatch({ type: USER_POST_CHANGE, posts });
  };
};

export const fetchUserFollowing = () => {
  return async (dispatch) => {
    const auth = getAuth(app);
    const uid = auth.currentUser.uid;

    const followingRef = collection(db, "following");

    const queryFollowing = query(
      collection(followingRef, uid, "userFollowing")
    );
    const querySnapshot = await getDocs(queryFollowing);

    const following = querySnapshot.docs.map((doc) => doc.id);

    dispatch({ type: USER_FOLLOWING_CHANGE, following });

    following.map((value, index) => {
      dispatch(fetchUsersData(following[index], true));
    });
  };
};

export const fetchUsersData = (uid, getPosts) => {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some((el) => el.uid === uid);
    if (!found) {
      const docRef = doc(db, "users", uid);
      getDoc(docRef).then((snapshot) => {
        if (snapshot.exists) {
          const data = snapshot.data();
          dispatch({ type: USERS_DATA_CHANGE, user: { ...data, uid } });
        } else {
          console.log("Action Fetch Users Data: Users data does not exists");
        }
      });

      if (getPosts) {
        dispatch(fetchUsersFollowingPosts(uid));
      }
    }
  };
};

export function fetchUsersFollowingPosts(uid) {
  return (dispatch, getState) => {
    const postsRef = collection(db, "posts");
    const queryPosts = query(
      collection(postsRef, uid, "userPosts"),
      orderBy("creation")
    );

    getDocs(queryPosts).then((snapshot) => {
      const uid = snapshot.docs[0]._key.path.segments[6];
      const user = getState().usersState.users.find((el) => el?.uid === uid);
      const posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data, user };
      });

      dispatch({ type: USERS_POST_CHANGE, posts, uid });
    });
  };
}
