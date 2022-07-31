import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { getItemFromAsyncStorage } from './storage';
import React from 'react';

export default function Include({question, name, navigation, string}){
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [typeOfUser, setTypeOfUser] = React.useState("");
    const [priorityCode, setPriorityCode] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [currentDoctorId, setDoctorId] = React.useState("");

    getItemFromAsyncStorage("typeOfUser").then((typeOfUser) =>
    setTypeOfUser(typeOfUser)
  );
  if (typeOfUser === "Doctor") {
    getItemFromAsyncStorage("username").then((username) =>
      setUsername(username)
    );
    getItemFromAsyncStorage("email").then((email) => setEmail(email));
    getItemFromAsyncStorage("doctorId").then((_id) => setDoctorId(_id));
  } else {
    getItemFromAsyncStorage("username").then((username) =>
      setUsername(username)
    );
    getItemFromAsyncStorage("email").then((email) => setEmail(email));
    getItemFromAsyncStorage("userId").then((_id) => setUserId(_id));
  }
    return (
        <View style={{ flexDirection: "row" }}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
                username: username,
                userType: typeOfUser,
                email: email,
              })
            }
          >
            <Image
              source={
                typeOfUser === "Doctor"
                  ? require("../assets/images/doctor.jpeg")
                  : typeOfUser === "Normal User" ? 
                  require("../assets/images/normal.jpg"):
                  require("../assets/images/admin.jpg")
              }
              style={typeOfUser === "Doctor" ? styles.doctor : styles.normal}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 5 }}>
          <View>
            <Text style={{ fontSize: 20, color: "#0077b6" }}>
              {string} {name}
            </Text>
          </View>
          <Text
            style={{ fontSize: 15, letterSpacing: 2, fontWeight: "bold" }}
          >
            {question}
          </Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    doctor: {
        width: 40,
        height: 40,
        top: 5,
        borderRadius:50,
        marginLeft:15
      },
      normal: {
        width: 40,
        height: 40,
        top: 5,
        borderRadius:50,
        marginLeft:15
      },
})