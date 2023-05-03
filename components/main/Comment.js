import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Avatar, Chip, Paragraph, Button, TextInput } from "react-native-paper";

const commentsMockData = [
  {
    uid: "12314",
    user: {
      avatar:
        "https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg",
      name: "yuri",
    },
    comment: "Primeiro comentario",
  },
  {
    uid: "5462",
    user: {
      avatar:
        "https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg",
      name: "yuri2",
    },
    comment: "Segundo comentario",
  },
  {
    uid: "33334",
    user: {
      avatar:
        "https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg",
      name: "yuri3",
    },
    comment: "Terceiro comentario",
  },
];

const Comment = ({ route }) => {
  const { postId, uid } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(commentsMockData);

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
    </View>
  );
};

export default Comment;
