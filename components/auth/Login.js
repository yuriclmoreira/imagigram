import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../database/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    const auth = getAuth(app);
    const data = await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <View>
      <TextInput placeholder="E-mail" onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        title="Entrar"
        icon="login-variant"
        mode="contained"
        onPress={handleSubmit}
        style={{ marginTop: 10, marginHorizontal: 50 }}
      >
        Submit
      </Button>
    </View>
  );
};

export default Login;
