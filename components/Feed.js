import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { getItemFromAsyncStorage } from "./storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import Inculde from "./Include";
export default function Feed({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [typeOfUser, setTypeOfUser] = React.useState("");
  const [priorityCode, setPriorityCode] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [currentDoctorId, setDoctorId] = React.useState("");

  getItemFromAsyncStorage("typeOfUser").then((typeOfUser) =>
    setTypeOfUser(typeOfUser)
  );
  getItemFromAsyncStorage("priorityCode").then((priorityCode) =>
    setPriorityCode(priorityCode)
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
    <>
      <View style={{ flex: 1, marginTop: 30, backgroundColor: "white" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#00b4d8",
              fontWeight: "bold",
              letterSpacing: 1,
              textTransform: "uppercase",
              margin: 10,
            }}
          >
            TekHealth
          </Text>
          <TouchableOpacity style={{ margin: 10 }}>
            <Ionicons name="logo-snapchat" size={20} color="#00b4d8" />
          </TouchableOpacity>
        </View>
        <Inculde
          string="Welcome"
          question="What are you looking for?"
          name={username}
          navigation={navigation}
        />

        <ScrollView>
          <View
            style={{
              width: "90%",
              height: 230,
              backgroundColor: "#0077b6",
              opacity: 1,
              borderRadius: 15,
              marginBottom: 20,
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            {
              priorityCode === '1' ?
              <Image
              source={require("../assets/images/adminStock.jpg")}
              style={{ width: 352, height: 198, borderRadius: 10,top:1,alignSelf:'center' }}
            />:
            <Image
              source={require("../assets/images/appointment.jpg")}
              style={{ width: 352, height: 198, borderRadius: 10,top:1,alignSelf:'center' }}
            />
            }
            {typeOfUser === "Doctor" ? (
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontSize: 15,
                  letterSpacing: 2,
                  top: 3,
                }}
              >
                Complete your appointments
              </Text>
            ) : typeOfUser === "Normal User" ? (
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontSize: 15,
                  letterSpacing: 2,
                  top: 3,
                }}
              >
                Book an appointment with us
              </Text>
            ) : (
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontSize: 15,
                  letterSpacing: 2,
                  top: 3,
                }}
              >
                Check if Stock are available
              </Text>
            )}
           
          </View>
          <View
            style={{
              width: "90%",
              height: 230,
              backgroundColor: "#0077b6",
              borderRadius: 15,
              marginBottom: 20,
              alignSelf: "center",
            }}
          >
            {
              priorityCode === '1' ?
              <Image
                source={require("../assets/images/adminAppointment.jpg")}
                style={{ width: 351, height: 198, borderRadius: 10,alignSelf:'center',top:1 }}
              />:
              <Image
                source={require("../assets/images/doctor-chat.jpg")}
                style={{ width: 352, height: 200, borderRadius: 10,alignSelf:'center',top:1 }}
              />
            }
            {
              typeOfUser === 'Doctor' ?
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontSize: 15,
                  letterSpacing: 2,
                  top: 3,
                }}
              >
                Attend to your patients chats 
              </Text>:
              typeOfUser === 'Normal User'?
              <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: 15,
                letterSpacing: 2,
                top: 3,
              }}
            >
              Have a chat with doctors online
            </Text>:
              <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: 15,
                letterSpacing: 2,
                top: 3,
              }}
            >
              Check completed appointments
            </Text>

            }
          </View>
          <View
            style={{
              width: "90%",
              height: 230,
              backgroundColor: "#0077b6",
              borderRadius: 15,
              marginBottom: 30,
              alignSelf: "center",
            }}
          >

            {
              priorityCode === '1' ?
              <Image
                source={require("../assets/images/updateStock.jpg")}
                style={{ width: 352, height: 198, borderRadius: 10, alignSelf:'center',top:1 }}
              />:
              <Image
              source={require("../assets/images/home.jpg")}
              style={{ width: 354, height: 200, borderRadius: 10, alignSelf:'center',top:1}}
            />

            }
           {
              typeOfUser === 'Doctor' ?
              <Text
                style={{
                  alignSelf: "center",
                  color: "white",
                  fontSize: 15,
                  letterSpacing: 2,
                  top: 3,
                }}
              >
                Be ready for them
              </Text>:
              typeOfUser === 'Normal User'?
              <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: 15,
                letterSpacing: 2,
                top: 3,
              }}
            >
              We are here for you 
            </Text>:
              <Text
              style={{
                alignSelf: "center",
                color: "white",
                fontSize: 15,
                letterSpacing: 2,
                top: 3,
              }}
            >
              Update Stock
            </Text>

            }
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
