import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Avatar, Chip, Paragraph, Button, TextInput } from "react-native-paper";

import { db } from "../../database/firebaseConfig";
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const Comment = ({ currentUser, route }) => {
  const { postId, uid } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showUpdate, setShowUpdate] = useState(true);

  useEffect(() => {
    if (showUpdate) {
      const postsRef = collection(db, "posts");
      const queryComments = query(
        collection(postsRef, uid, "userPosts", postId, "comments")
      );
      getDocs(queryComments).then((snapShot) => {
        const comments = snapShot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setComments(comments);
      });
      setShowUpdate(false);
    }
  }, [postId, showUpdate]);

  const handleCommentSubmit = () => {
    if (comment) {
      const postsRef = collection(db, "posts");

      addDoc(collection(postsRef, uid, "userPosts", postId, "comments"), {
        creator: currentUser.uid,
        comment,
      }).then((snapShot) => {
        setComment("");
        setShowUpdate(true);
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => (
          <>
            <Chip
              style={{ margin: 12 }}
              avatar={
                <Avatar.Image
                  size={24}
                  source={
                    item?.user?.avatar ||
                    "https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg"
                  }
                />
              }
            >
              {item?.user?.name}
            </Chip>
            <Paragraph style={{ marginLeft: 48, marginBottom: !2 }}>
              {item.comment}
            </Paragraph>
          </>
        )}
      />
      <View>
        <TextInput
          placeholder="Leave a comment..."
          value={comment}
          onChangeText={(value) => setComment(value)}
        />
        <Button icon="send" mode="contained" onPress={handleCommentSubmit}>
          Send
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Comment);
