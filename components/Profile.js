import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getItemFromAsyncStorage, removeKeyFromAsyncStorage } from "./storage";
import axios from "axios";
import React from "react";

export default function Profile({ route, navigation }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [typeOfUser, setTypeOfUser] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState("");

  getItemFromAsyncStorage("username").then((username) => setUsername(username));
  getItemFromAsyncStorage("email").then((email) => setEmail(email));
  getItemFromAsyncStorage("typeOfUser").then((typeOfUser) =>
    setTypeOfUser(typeOfUser)
  );

  const logout = async () => {
    if (typeOfUser === "Doctor") {
      setIsSubmitting(true);
      axios
        .post("https://node-tek-health-backend.herokuapp.com/doctor-logout", {
          username,
        })
        .then((res) => {
          const result = res.data;
          const { status } = result;
          if (status !== "SUCCESS") {
            setMessage("FAILED");
          } else {
            removeKeyFromAsyncStorage("username")
              .then(removeKeyFromAsyncStorage("email"))
              .then(removeKeyFromAsyncStorage("typeOfUser"))
              .then(() => {
                navigation.navigate("Home");
                setIsSubmitting(false);
              });
          }
        });
    } else {
      setIsSubmitting(true);
      axios
        .post("https://node-tek-health-backend.herokuapp.com/logout", {
          username,
        })
        .then((res) => {
          const result = res.data;
          const { status } = result;
          if (status !== "SUCCESS") {
            setMessage("FAILED");
          } else {
            removeKeyFromAsyncStorage("username")
              .then(removeKeyFromAsyncStorage("email"))
              .then(removeKeyFromAsyncStorage("typeOfUser"))
              .then(() => {
                navigation.navigate("Home");
                setIsSubmitting(false);
              });
          }
        });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={
              typeOfUser === "Doctor"
                ? require("../assets/images/doctor.jpeg")
                :
                typeOfUser === 'Normal User' ?
                 require("../assets/images/normal.jpg")
                 :
                 require("../assets/images/admin.jpg")
            }
            style={typeOfUser === "Doctor" ? styles.doctor : styles.normal}
          />
          <View style={styles.detailContainer}>
            <Text style={styles.main}>Username: {username || "user"}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.main}>Email: {email || "user@gmail.com"}</Text>
          </View>
        </View>
        {!isSubmitting && (
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        )}
        {isSubmitting && (
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <ActivityIndicator color="white" size="small" />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#023047",
    top: 35,
  },
  doctor: {
    width: 150,
    height: 150,
    top: 10,
    borderRadius:50
  },
  normal: {
    width: 150,
    height: 150,
    top: 10,
    borderRadius:50
  },
  imageContainer: {
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    top: 20,
  },
  detailContainer: {
    top: 70,
    width: 250,
    height: 40,
    backgroundColor: "white",
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutBtn: {
    width: 100,
    height: 40,
    borderWidth:2,
    borderColor:'white',
    paddingLeft: 10,
    paddingTop: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    top: 150,
    alignSelf: "center",
  },
  main: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0862F6",
  },
  logout: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    bottom: 5,
  },
});
