import { Text, View, StyleSheet } from "react-native";
import axios from "axios";
import React from "react";
export default function AdminCheckAppointment() {
  const [appointments, setAppointments] = React.useState();
  const [message, setMessage] = React.useState();
  axios
    .get("https://node-tek-health-backend.herokuapp.com/get-all-appointments")
    .then((res) => {
      const result = res.data;
      const { status, appointments } = result;
      if (status == "SUCCESS") {
        setAppointments(appointments);
      } else {
        setMessage("Something happened");
      }
    });

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Appointment(s)
          </Text>
        </View>
        {appointments
          ? appointments.map((appointment) => {
              return (
                <>
                  <View
                    style={{
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{}}>Patient Name:</Text>
                      <Text style={styles.details}>
                        {" "}
                        {appointment.patientName}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Doctor Name:</Text>
                      <Text style={styles.details}>
                        {appointment.doctorName}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Date of Appointment: </Text>
                      <Text style={styles.details}>
                        {appointment.dateOfAppointment}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Time of Appointment: </Text>
                      <Text style={styles.details}>{appointment.time}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text>Reason for Appointment: </Text>
                      <Text style={styles.details}>{appointment.reason}</Text>
                    </View>
                  </View>
                </>
              );
            })
          : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EEE2",
    top: 30,
  },
  details: {
    fontSize: 15,
    fontWeight: "bold",
    color: "blue",
  },
});
