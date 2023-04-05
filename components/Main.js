import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUser } from "../redux/actions";

const Main = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Bem vindo {props.currentUser?.name}!</Text>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
