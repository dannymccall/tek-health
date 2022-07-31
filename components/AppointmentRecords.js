import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { getItemFromAsyncStorage } from "./storage";
import Axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import Include from "./Include";
export default function Records({ navigation }) {
  const [_id, setId] = React.useState("");
  const [data, setData] = React.useState();
  const [typeOfUser, setTypeOfUser] = React.useState("");
  const [appointmentUpdated, setAppointmentUpdated] = React.useState(false);

  const [message, setMessage] = React.useState();
  getItemFromAsyncStorage("userId").then((key) => setId(key));
  getItemFromAsyncStorage("typeOfUser").then((typeOfUser) =>
    setTypeOfUser(typeOfUser)
  );
  const submitAppointmentStatus = () => {
    Axios.post(
      `https://node-tek-health-backend.herokuapp.com/update-appointments/${username}`
    ).then((res) => {
      const status = res.data;
      if (status == "SUCCESS") {
        setAppointmentUpdated(true);
        return Alert.alert("Message", "Appointment completed successfully", [
          {
            text: "OK",
          },
          {
            text: "Go Back",
            onPress: () => navigation.navigate("Dashboard"),
          },
        ]);
      } else {
        setMessage("Could not updated appointment status");
      }
    });
  };
  React.useEffect(() => {
    Axios.get(
      `https://node-tek-health-backend.herokuapp.com/get-appointments/${_id}`
    ).then((res) => {
      const { status, appointments } = res.data;
      if (status === "SUCCESS") {
        if (appointments.length == 0) {
          setMessage("Nothing");
          console.log(message);
        } else {
          setData(appointments);
          console.log(_id)
        }
      } else {
        setMessage("Something happened");
      }
    });
  }, [_id]);

  return (
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
      <Include navigation={navigation} />
      {data ? (
        <>
          <Text style={{ alignSelf: "center", fontSize: 18 }}>
            You have some pending appointments
          </Text>
        </>
      ) : null}
      <View style={{ alignItems: "center" }}>
        <ScrollView
          maximumZoomScale={1}
          minimumZoomScale={1}
          bouncesZoom={true}
          automaticallyAdjustContentInsets={true}
          pagingEnabled={true}
          style={{ height: "70%", width: "90%" }}
        >
          {data ? (
            data.map((appointment) => {
              return (
                <>
                  <View
                    style={{
                      top: 40,
                      backgroundColor: "#023047",
                      width: "100%",
                      borderRadius: 10,
                      padding: 10,
                      marginBottom: 10,
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="calendar-outline" size={30} color="white" />
                    {typeOfUser === "Doctor" ? (
                      <Text style={styles.details}>
                        Username: {appointment.patientName}
                      </Text>
                    ) : (
                      <Text style={styles.details}>
                        Doctor name: {appointment.doctorName}
                      </Text>
                    )}
                    <Text style={styles.details}>
                      Date: {appointment.dateOfAppointment}
                    </Text>
                    <Text style={styles.details}>
                      Time of appointment: {appointment.time}
                    </Text>
                  </View>
                </>
              );
            })
          ) : message === "Nothing" && typeOfUser === "Normal User" ? (
            <View style={{ alignItems: "center", marginTop: 100 }}>
              <Text style={{ fontSize: 17, color: "#00b4d8" }}>
                You don't have any pending appointment
              </Text>
              <Text style={{ fontSize: 17, color: "red" }}>
                Do you want to book an appointment now?
              </Text>
              <View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#00b4d8",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}
                  onPress={() => navigation.navigate("Appointment")}
                >
                  <Text style={{ fontSize: 20, color: "white" }}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : typeOfUser === "Doctor" ? (
            <View style={{ alignItems: "center", marginTop: 100 }}>
              <Text style={{ fontSize: 17, color: "#00b4d8" }}>
                You don't have any pending appointment
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
      {data && typeOfUser === "Normal User" ? (
        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "#023047",
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("Appointment")}
        >
          <Text style={{ color: "white" }}>
            Still want to book new appointment
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
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
  details: {
    fontSize: 15,
    color: "white",
  },
});
