import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";

import { ActivityIndicator, Avatar, Card, Paragraph } from "react-native-paper";
const initialMockData = [
  {
    user: {
      name: "Maria",
      email: "maria@examples.com",
      avatar:
        "https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg",
    },
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/imagigram-d632e.appspot.com/o/post%2FAg4HBTxIvxMhmJgsq4XWawv1AoB3%2F0.b52kstyu45?alt=media&token=f08508b7-ff79-4e9b-8e66-fe90dc6ff27f",
    caption: "cat 1",
  },
  {
    user: {
      name: "Maria",
      email: "maria@examples.com",
      avatar:
        "https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg",
    },
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/imagigram-d632e.appspot.com/o/post%2FAg4HBTxIvxMhmJgsq4XWawv1AoB3%2F0.1pvf1ja22xw?alt=media&token=50cd9ac7-a1c2-4bb0-9c9c-3e1400036cf7",
    caption: "cat 2",
  },
  {
    user: {
      name: "Grace",
      email: "grace@example.com",
      avatar:
        "https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg",
    },
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/imagigram-d632e.appspot.com/o/post%2FAFRTFyglJOYdIshn9WoYazlEszO2%2F0.lvgodlpqtbb?alt=media&token=145c6029-15f3-41df-a493-f1ecf6fd53f2",
    caption: "dog 1",
  },
  {
    user: {
      name: "Maria",
      email: "grace@example.com",
      avatar:
        "https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg",
    },
    downloadURL:
      "https://firebasestorage.googleapis.com/v0/b/imagigram-d632e.appspot.com/o/post%2FAFRTFyglJOYdIshn9WoYazlEszO2%2F0.1g9vpaav6mg?alt=media&token=15222345-8971-401e-b075-cd5fb5d2c526",
    caption: "dog 2",
  },
];

const Loading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" />
  </View>
);

const Feed = () => {
  const [post, setPost] = useState(initialMockData);
  return (
    <View style={styles.container}>
      {post.length === 0 && <Loading />}
      <View style={styles.gallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={post}
          renderItem={({ item }) => (
            <Card>
              <Card.Title
                title={item?.user?.name}
                subtitle={item?.user.email}
                left={(props) => (
                  <Avatar.Image
                    size={24}
                    {...props}
                    source={
                      item?.user?.avatar ||
                      "https://wealthspire.com/wp-content/uploads/2017/06/avatar-placeholder-generic-1.jpg"
                    }
                  />
                )}
              />
              <Card.Content>
                <View style={styles.images}>
                  <Image
                    style={styles.images}
                    source={{ uri: item?.downloadURL }}
                  />
                </View>
                <Paragraph>{item?.caption}</Paragraph>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  gallery: {
    flex: 1,
  },
  images: {
    flex: 1,
    height: 100,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
    width: "100%",
  },
});
export default Feed;
