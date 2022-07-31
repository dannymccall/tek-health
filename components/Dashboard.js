import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getItemFromAsyncStorage } from "./storage";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import Feed from "./Feed";
import Appointment from "./Appointment";
import Doctors from "./Doctors";
import AppointmentRecords from "./AppointmentRecords";
import Records from "./Records";
import BloodStockForm from "./BloodStockForm";
import BloodOrder from './BloodOrder';


export default function ({ navigation }) {
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
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let MaterialIcon;
            let icon;
            if (route.name === "Feed") {
              iconName = "home";
            } else if (route.name === "Appointment Records") {
              iconName = "calendar-outline";
            } else if (route.name === "eConsultation") {
              iconName = "ios-chatbubbles";
            } else if (route.name === "Records") {
              MaterialIcon = "database";
            } else if (route.name === "Update Stock") {
              MaterialIcon = "system-update-alt";
            }else if(route.name === 'Blood Order'){
              icon = 'blood-drop'
            }

            // You can return any component that you like here!
            return (
              <>
                <Ionicons name={iconName} size={25} color={color} />
                {MaterialIcon === "database" ? (
                  <MaterialCommunityIcons
                    name={MaterialIcon}
                    size={25}
                    color={color}
                    style={{ bottom: 15 }}
                  />
                ) : MaterialIcon === "system-update-alt" ? (
                  <MaterialIcons
                    name={MaterialIcon}
                    size={25}
                    color={color}
                    style={{ bottom: 15 }}
                  />
                ) : icon === "blood-drop" ?
                <Fontisto name={icon} size={25} color={color}   style={{ bottom: 15 }}/>:null
                
                }
              </>
            );
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{ headerShown: false, tabBarBadge: 2 }}
        />
        {priorityCode === "1" ? (
          <Tab.Screen
            name="Update Stock"
            component={BloodStockForm}
            options={{ headerShown: false, tabBarBadge: 2 }}
          />
        ) : (
          <Tab.Screen
            name="Appointment Records"
            component={AppointmentRecords}
            options={{ headerShown: false, tabBarBadge: 2 }}
          />
        )}

        {priorityCode === "1" ? null : 

        typeOfUser === 'Normal User' ?
          <Tab.Screen
            name="eConsultation"
            component={Doctors}
            options={{ headerShown: false, tabBarBadge: 2 }}
          />:
          <Tab.Screen
            name="Blood Order"
            component={BloodOrder}
            options={{ headerShown: false, tabBarBadge: 2 }}
          />
        }
        <Tab.Screen
          name="Records"
          component={Records}
          options={{ headerShown: false, tabBarBadge: 2 }}
        />
      </Tab.Navigator>
      {/* <View style={styles.container}>
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
              >
                <Image
                  source={require("../assets/images/sms.png")}
                  style={{ width: 30, height: 30, top: 16 }}
                />
                <View style={styles.message}>
                  <Text style={styles.messageCount}>2</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

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
                    ? require("../assets/images/doctor.png")
                    : require("../assets/images/normal.png")
                }
                style={typeOfUser === "Doctor" ? styles.doctor : styles.normal}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.line}></View>
          <Text style={styles.question}>What are you looking for?</Text>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.chat}
            onPress={() =>
              navigation.navigate(
                typeOfUser === "Doctor" ? "DoctorAppointments" : "Appointment"
              )
            }
          >
            <Image
              source={
                typeOfUser === "Doctor"
                  ? require("../assets/images/appointment.png")
                  : require("../assets/images/doc_appoint.png")
              }
              style={styles.chatImage}
            />
            <Text style={styles.chatText}>
              {typeOfUser === "Doctor" ? "Check Appointment" : "Doctors"}
            </Text>
            <Text style={styles.chatText}>
              {typeOfUser === "Doctor" ? null : "Book Appointment"}
            </Text>
          </TouchableOpacity>
          {typeOfUser !== "Doctor" ? (
            <TouchableOpacity
              style={styles.chat}
              onPress={() =>
                navigation.navigate(
                  typeOfUser === "Doctor" ? "Chat" : "Doctors"
                )
              }
            >
              <Image
                source={require("../assets/images/chat.png")}
                style={styles.chatImage}
              />
              <Text style={styles.chatText}>eConsultation</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.sectionTwo}>
          {typeOfUser == "Doctor" ? (
            <TouchableOpacity
              style={styles.chat}
              onPress={() => navigation.navigate("BloodOrder")}
            >
              <Image
                source={require("../assets/images/sellblood.png")}
                style={styles.chatImage}
              />
              <Text style={styles.chatText}>Blood Bank</Text>
            </TouchableOpacity>
          ) : null}
          {typeOfUser == "Doctor" ? null : (
            <TouchableOpacity
              style={styles.chat}
              onPress={() => navigation.navigate("Records")}
            >
              <Image
                source={require("../assets/images/record.png")}
                style={styles.chatImage}
              />
              <Text style={styles.chatText}>Check Records</Text>
            </TouchableOpacity>
          )}
        </View>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    top: 35,
  },
  article: {
    backgroundColor: "white",
    width: "100%",
    height: "35%",
  },
  line: {
    width: "100%",
    backgroundColor: "#BEBEBE",
    height: 2,
    alignSelf: "center",
    bottom: 20,
  },
  doctor: {
    width: 40,
    height: 40,
    top: 5,
  },
  normal: {
    width: 40,
    height: 40,
    top: 5,
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
    bottom: 40,
  },
  header: {
    color: "#121936",
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    left: 100,
    top: 15,
  },
  message: {
    width: 18,
    height: 18,
    backgroundColor: "#17886C",
    alignItems: "center",
    borderRadius: 50,
    right: 13,
    top: 10,
  },
  messageCount: {
    color: "white",
    fontWeight: "bold",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  chat: {
    width: "45%",
    height: "70%",
    backgroundColor: "#121936",
    borderRadius: 20,
    alignItems: "center",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-around",
    bottom: 100,
  },
  sectionTwo: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "space-around",
    bottom: 150,
  },
  chatImage: {
    width: 70,
    height: 70,
    top: 30,
  },
  chatText: {
    top: 40,
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
