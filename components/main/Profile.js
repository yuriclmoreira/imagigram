import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, FlatList } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { connect } from "react-redux";

import { doc, collection, query, getDocs, getDoc } from "firebase/firestore";

import { db } from "../../database/firebaseConfig";

const Profile = ({ currentUser, posts, route }) => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { uid } = route.params;

  useEffect(() => {
    if (uid && uid === currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      fetchUser();
      fetchUserPosts();
    }
  }, [uid]);

  const fetchUser = () => {
    const docRef = doc(db, "users", uid);

    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists) {
        const data = snapshot.data();
        setUser({ ...data, uid });
      } else {
        console.log("Action Fetch User: User does not exists");
      }
    });
  };

  const fetchUserPosts = async () => {
    const postsRef = collection(db, "posts");

    const queryPosts = query(collection(postsRef, uid, "userPosts"));
    const querySnapshot = await getDocs(queryPosts);

    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });

    setUserPosts(posts);
  };

  if (!user) return <View />;

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Card>
          <Card.Title
            title={user?.name}
            subtitle={user?.email}
            left={(props) => (
              <Avatar.Image
                size={24}
                {...props}
                source={
                  user?.avatar ||
                  "https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg"
                }
              />
            )}
          />
        </Card>
      </View>
      <View style={styles.gallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.images}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    margin: 20,
  },
  gallery: {
    flex: 1,
  },
  images: {
    flex: 1 / 3,
    height: 100,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
