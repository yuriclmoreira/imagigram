import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

import { app, db } from "../../database/firebaseConfig";

const Register = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async () => {
    const auth = getAuth(app);
    try {
      const dataUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (dataUser) {
        try {
          const usersRef = collection(db, "users");
          await setDoc(doc(usersRef, auth.currentUser.uid), {
            name,
            email,
          });
        } catch (err) {
          console.log("errDoc: ", err);
        }
      }
    } catch (err) {
      console.log("errUser: ", err);
    }
  };

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
