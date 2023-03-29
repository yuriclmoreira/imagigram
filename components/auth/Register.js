import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    return;
    //TODO:Implement firebase accont creation , sending name,email and password
  };
  return (
    <View>
      <TextInput placeholder="Nome" onChange={setName}></TextInput>
      <TextInput placeholder="E-mail" onChange={setEmail}></TextInput>
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChange={setPassword}
      ></TextInput>
      <Button title="Submit" onPress={handleSubmit}></Button>
    </View>
  );
};
export default Register;
