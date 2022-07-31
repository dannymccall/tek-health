import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { getItemFromAsyncStorage } from "./storage";

export default function AdminPage({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [typeOfUser, setTypeOfUser] = React.useState("");
  const [id, setId] = React.useState("");
  const [priorityCode, setPriorityCode] = React.useState("");

  getItemFromAsyncStorage("username").then((username) => setUsername(username));
  getItemFromAsyncStorage("email").then((email) => setEmail(email));
  getItemFromAsyncStorage("typeOfUser").then((typeOfUser) =>
    setTypeOfUser(typeOfUser)
  );
  getItemFromAsyncStorage("_id").then((_id) => setId(_id));
  getItemFromAsyncStorage("priorityCode").then((priorityCode) =>
    setPriorityCode(priorityCode)
  );
  return (
    <>
      <View style={styles.container}>
        <View style={styles.article}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text style={styles.header}>TekHealth</Text>
            <TouchableOpacity>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              ></View>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AdminProfile", {
                  username: username,
                  userType: typeOfUser,
                  email: email,
                })
              }
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Admin
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line}></View>
          <Text style={styles.question}>What are you looking for?</Text>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.chat}
            onPress={() =>
              navigation.navigate("AdminCheckAppointment", {
                patientName: username,
                userId: id,
              })
            }
          >
            <Image
              source={require("../assets/images/checkappointments.png")}
              style={styles.checkappoint}
            />
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Check Appointments
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chat}
            onPress={() =>
              navigation.navigate('BloodStockForm')
            }
          >
            <Image
              source={require("../assets/images/sellblood.png")}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Fill Stock for blood bank
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    top: 35,
  },
  header: {
    color: "#121936",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "baseline",
    left: 250,
    top: 15,
  },
  imageContainer: {
    backgroundColor: "#121936",
    width: 50,
    height: 50,
    alignItems: "center",
    borderRadius: 50,
    alignSelf: "center",
    bottom: 20,
    right: 150,
    justifyContent: "center",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  line: {
    width: "100%",
    backgroundColor: "#BEBEBE",
    height: 2,
    alignSelf: "center",
    bottom: 20,
  },
  section: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-around",
    bottom: 100,
    top: 20,
  },
  chat: {
    width: "45%",
    height: "30%",
    backgroundColor: "#121936",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  checkappoint: {
    width: 70,
    height: 70,
  },
});
