import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { getItemFromAsyncStorage } from "./storage";
import Axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import Inculde from "./Include";
export default function Appointment({ navigation, route }) {
  const [doctors, setDoctors] = React.useState();
  const [message, setMessage] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [typeOfUser, setTypeOfUser] = React.useState();
  const [email, setEmail] = React.useState();
  const [username, setUsername] = React.useState();
  const [userId, setUserId] = React.useState();
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

  React.useEffect(() => {
    setInterval(() => {
      Axios.get(
        "https://node-tek-health-backend.herokuapp.com/get-doctors"
      ).then((res) => {
        const { status, data } = res.data;
        if (status == "SUCCESS") {
          setIsLoading(true);
          setDoctors(data);
        } else {
          setMessage("Something is wrong");
        }
      });
    }, 5000);
  }, []);
  return (
    <>
      <View style={styles.container}>
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
        <Inculde />
        {!isLoading ? <ActivityIndicator size="large" color="green" /> : null}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {doctors
            ? doctors.map((doctor) => {
                return (
                  <View
                    style={{
                      backgroundColor: "#0077b6",
                      width: "40%",
                      marginBottom: 10,
                      height: "90%",
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                      borderRadius: 10,
                    }}
                  >
                    <View style={styles.PictureContainer}>
                      <Image
                        source={require("../assets/images/doctor.jpeg")}
                        style={styles.doctorPicture}
                      />
                    </View>
                    <View style={styles.doctorInfo} key={doctor._id}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {doctor.username}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        {doctor.specification}
                      </Text>
                      <Text
                        style={{
                          color:
                            doctor.userStatus == "online" ? "#3DC75E" : "red",
                          fontSize: 13,
                          fontWeight: "bold",
                        }}
                      >
                        {doctor.userStatus}
                      </Text>
                    </View>
                    <View style={{ justifyContent: "flex-end" }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("AppointmentPage", {
                            username: doctor.username,
                            specification: doctor.specification,
                            userStatus: doctor.userStatus,
                            patientName: username,
                            userId: userId,
                            doctorName: doctors.username,
                          })
                        }
                        style={styles.appointmentBtn}
                      >
                        <Text style={styles.doctorBtnText}>Start</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            : null}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#023047",
            alignSelf: "center",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={()=>navigation.navigate('Dashboard')}
        >
          <Text style={{color:'white'}}>Go Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    top: 30,
  },
  headerContainer: {
    width: "100%",
    backgroundColor: "#E2E2E2",
    alignContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#696969",
    borderBottomWidth: 1,
  },

  header: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  infoContainer: {
    backgroundColor: "#858484",
    width: "100%",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
  },
  info: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 25,
    fontWeight: "bold",
  },
  doctorPicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  doctorInfo: {
    top: 5,
    width: "100%",
  },
  doctorDetails: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  appointmentBtn: {
    alignSelf: "flex-end",
    padding: 5,
    borderRadius: 50,
  },
  doctorBtnText: {
    color: "#3DC75E",
    fontSize: 15,
    backgroundColor: "#03045e",
    padding: 1,
    borderRadius: 10,
    textAlign: "center",
    color: "white",
    letterSpacing: 2,
  },
});
