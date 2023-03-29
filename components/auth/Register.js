import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";

const Register = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {};
  return (
    <View>
      <TextInput placeholder="Nome" onChangeText={setName}></TextInput>
      <TextInput placeholder="E-mail" onChangeText={setEmail}></TextInput>
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      ></TextInput>
      <Button title="Submit" onPress={handleSubmit}></Button>
    </View>
  );
};
export default Register;
