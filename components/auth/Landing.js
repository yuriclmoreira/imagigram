import { Text, View, Button } from "react-native";

const Landing = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text style={{ marginBottom: "1rem" }}>Welcome to Imagigran</Text>
    <View style={{ marginBottom: "1rem" }}>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
    <Button title="Login" onPress={() => navigation.navigate("Login")} />
  </View>
);

export default Landing;
