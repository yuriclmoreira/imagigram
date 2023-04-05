import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { Text, Button, View } from "react-native";

export default function Add() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Camera style={{ flex: 1, aspectRatio: 1 }} type={type} ratio={"1:1"} />
        <Button title="Flip Camera" onPress={toggleCameraType} />
      </View>
    </View>
  );
}
