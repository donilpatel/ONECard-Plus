import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

const SignInScreen: React.FC = ({ navigation }: any) => {
  const { signIn, loading } = useAuth();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (!/^\d{1,9}$/.test(studentId)) {
      Alert.alert(
        "Invalid Student ID",
        "Student ID must be numeric and up to 9 digits."
      );
      return;
    }
    if (!password) {
      Alert.alert("Invalid Password", "Please enter your password.");
      return;
    }
    signIn();
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        keyboardType="numeric"
        maxLength={9}
        value={studentId}
        onChangeText={setStudentId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? "Signing In..." : "Sign In"}
        onPress={handleSignIn}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});

export default SignInScreen;
