import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { getItemFromAsyncStorage } from "./storage";
import React from "react";
import Axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Include from "./Include";

export default function Records({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState();
  const [_id, setId] = React.useState("");
  const [username, setUsername] = React.useState();
  const [appointmentUpdated, setAppointmentUpdated] = React.useState(false);
  const [typeOfUser, setTypeOfUser] = React.useState("");
  const [appointmentId, setAppointmentId] = React.useState();
  const [priorityCode, setPriorityCode] = React.useState("");

  getItemFromAsyncStorage("typeOfUser").then((typeOfUser) =>
    setTypeOfUser(typeOfUser)
  );

  if (typeOfUser === "Doctor") {
    getItemFromAsyncStorage("username").then((username) =>
      setUsername(username)
    );
  }
  getItemFromAsyncStorage("_id").then((key) => setId(key));
  getItemFromAsyncStorage("priorityCode").then((priorityCode) =>
    setPriorityCode(priorityCode)
  );
  React.useEffect(() => {
      if (priorityCode === "1") {
        Axios.get(
          `https://node-tek-health-backend.herokuapp.com/get-all-appointments`
        ).then((res) => {
          const result = res.data;
          const { status, appointments } = result;
          if (status === "SUCCESS") {
            setIsLoading(true);
            setData(appointments);
            let appointmentStatus;
            appointments.map((key) => {
              appointmentStatus = key.appointmentStatus;
              setAppointmentId(key._id);
            });
            if (appointmentStatus == "yes") {
              setAppointmentUpdated(true);
            }
          }
        });
      } else {
        Axios.get(
          `https://node-tek-health-backend.herokuapp.com/get-appointments/${_id}`
        ).then((res) => {
          const result = res.data;
          const { status, appointments } = result;
          if (status === "SUCCESS") {
            setIsLoading(true);
            setData(appointments);
            let appointmentStatus;
            appointments.map((key) => {
              appointmentStatus = key.appointmentStatus;
              setAppointmentId(key._id);
            });
            if (appointmentStatus == "yes") {
              setAppointmentUpdated(true);
            }
          }
        });
      }
  }, [_id]);

  const submitAppointmentStatus = () => {
    Axios.post(
      `https://node-tek-health-backend.herokuapp.com/update-appointments/${appointmentId}`
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
        <Include navigation={navigation} />
        {!isLoading ? <ActivityIndicator size="large" color="#00b4d8" /> : null}
        <ScrollView>
          {data
            ? data.map((appointment) => {
                return (
                  <>
                    <View
                      style={{
                        top: 40,
                        backgroundColor: "#023047",
                        width: "80%",
                        borderRadius: 10,
                        padding: 10,
                        marginBottom: 10,
                        alignItems: "center",
                        height: 160,
                        alignSelf: "center",
                      }}
                    >
                      <Ionicons
                        name="calendar-outline"
                        size={30}
                        color="white"
                      />
                      {typeOfUser === "Doctor" ? (
                        <Text style={styles.details}>
                          Username: {appointment.patientName}
                        </Text>
                      ) : typeOfUser === "Normal User" ? (
                        <Text style={styles.details}>
                          Doctor name: {appointment.doctorName}
                        </Text>
                      ) : (
                        <>
                          <Text style={styles.details}>
                            Username: {appointment.patientName}
                          </Text>
                          <Text style={styles.details}>
                            Doctor name: {appointment.doctorName}
                          </Text>
                        </>
                      )}
                      <Text style={styles.details}>
                        Date: {appointment.dateOfAppointment}
                      </Text>
                      <Text style={styles.details}>
                        Time of appointment: {appointment.time}
                      </Text>
                      <View style={{ alignItems: "center" }}>
                        {!appointmentUpdated && priorityCode === '0'  ? 
                          <>
                          <Text style={{color:'red'}}>Are you done this appointment ?</Text>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#3746A7",
                              padding: 5,
                              borderRadius: 20,
                            }}
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
                          </>:null
                        }
                        {appointmentUpdated && (
                          <TouchableOpacity
                            style={{ backgroundColor: "#45F062", padding: 5 }}
                            disabled={true}
                          >
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
                  </>
                );
              })
            : null}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 30,
  },
  details: {
    color: "white",
  },
});
