import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "../redux/actions";

const Main = (props) => {
  const user = useSelector((state) => state.userState.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bem vindo {user?.name}!</Text>
    </View>
  );
};

export default Main;
