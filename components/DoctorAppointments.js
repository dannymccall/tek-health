import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import { getItemFromAsyncStorage } from "./storage";
import Axios from "axios";

export default function Records({ navigation }) {
  const [appointments, setAppointments] = React.useState();
  const [username, setUsername] = React.useState();
  const [appointmentUpdated, setAppointmentUpdated] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [typeOfUser, setTypeOfUser] = React.useState();

  getItemFromAsyncStorage("typeOfUser").then((typeOfUser) =>
    setTypeOfUser(typeOfUser)
  );
  console.log(typeOfUser);
  if (typeOfUser === "Doctor") {
    getItemFromAsyncStorage("username").then((username) =>
      setUsername(username)
    );
  }
  React.useEffect(() => {
    Axios.get(
      `https://node-tek-health-backend.herokuapp.com/doctor-appointments/${username}`
    ).then((res) => {
      const { status, appointments } = res.data;
      if (status === "SUCCESS") {
        setAppointments(appointments);
        let appointmentStatus;
        appointments.map((key) => {
          appointmentStatus = key.appointmentStatus;
        });
        if (appointmentStatus == "yes") {
          setAppointmentUpdated(true);
        }
      } else {
        setMessage("Something happened");
      }
    });
  }, []);

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
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#D4D4C0",
          alignItems: "center",
          padding: 20,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Appointments</Text>
      </View>
      {appointments
        ? appointments.map((appointment) => {
            return (
              <>
                <View
                  style={{
                    top: 40,
                    backgroundColor: "#D4D4C0",
                    width: "90%",
                    borderRadius: 30,
                    padding: 10,

                    marginBottom: 10,
                  }}
                >
                  <Image source={require("../assets/images/appointment.png")} style={{alignSelf:'center'}}/>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    key={appointment._id}
                  >
                    <Text style={{}}>Patient Name:</Text>
                    <Text style={styles.details}>
                      {" "}
                      {appointment.patientName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Doctor Name:</Text>
                    <Text style={styles.details}>{appointment.doctorName}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Date of Appointment: </Text>
                    <Text style={styles.details}>
                      {appointment.dateOfAppointment}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Time of Appointment: </Text>
                    <Text style={styles.details}>{appointment.time}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>Reason for Appointment: </Text>
                    <Text style={styles.details}>{appointment.reason}</Text>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {!appointmentUpdated
                          ? "Are you done with the appointment ?"
                          : null}
                      </Text>

                      <View style={{ alignItems: "center" }}>
                        {!appointmentUpdated && (
                          <TouchableOpacity
                            style={{ backgroundColor: "#3746A7", padding: 5, borderRadius:20 }}
                            onPress={submitAppointmentStatus}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 15,
                                fontWeight: "bold",
                              }}
                            >
                              Yes
                            </Text>
                          </TouchableOpacity>
                        )}
                        {appointmentUpdated && (
                          <TouchableOpacity
                            style={{ backgroundColor: "#45F062", padding: 5 }}
                            disabled={true}
                          >
                            <Image
                              source={require("../assets/images/correct.png")}
                              style={{ width: 40, height: 40 }}
                            />
                            <Text
                              style={{
                                color: "white",
                                fontSize: 15,
                                fontWeight: "bold",
                              }}
                            >
                              Done
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </>
            );
          })
        : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6D0",
    top: 30,
    alignItems: "center",
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
  details: {
    fontSize: 15,
    fontWeight: "bold",
    color: "blue",
  },
});
