import React from "react";

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
export default function AppointmentFinalPage({ navigation, route }) {
  const {
    username,
    specification,
    patientName,
    userId,
    time,
    dateOfAppointment,
  } = route.params;
  const Formik = useFormik({
    initialValues: {
      reason: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [appointSuccess, setAppointSuccess] = React.useState();
  const [appointmentMessage, setAppointmentMessage] = React.useState();
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const onSubmit = () => {
    setIsSubmitting(true);
    if (Formik.values.reason == null) {
      setMessage("Reason for appointment can't be empty");
      setIsSubmitting(false);
    } else {
      const appointment = {
        username,
        specification,
        patientName,
        userId,
        time,
        dateOfAppointment,
        reason: Formik.values.reason,
      };
      Axios.post(
        "https://node-tek-health-backend.herokuapp.com/add-appointment",
        appointment
      ).then((res) => {
        const { status, message } = res.data;
        if (status == "SUCCESS") {
          setAppointSuccess(status);
          setAppointmentMessage(message);
          setHasSubmitted(true);
          return Alert.alert("Message", "Appointment booked successfully", [
            {
              text: "OK",
            },
            {
              text: "Go Back",
              onPress: () => navigation.navigate("Dashboard"),
            },
          ]);
        } else {
          setMessage(message);
          setIsSubmitting(false);
        }
      });
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Tekhealth</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Book an appointment</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{time}</Text>
          <Text style={styles.questionText}>
            What's the Reason For Your Visit?
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={Formik.handleChange("reason")}
            value={Formik.values.reason}
            onBlur={Formik.handleBlur("reason")}
          />
          {message ? <Text style={styles.error}>{message}</Text> : null}
          {!isSubmitting && (
            <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
              <Text style={styles.submitBtnText}>Book This Appointment</Text>
            </TouchableOpacity>
          )}

          {isSubmitting && (
            <TouchableOpacity style={styles.submitBtn} disabled={true}>
              <ActivityIndicator size="small" color="white" />
            </TouchableOpacity>
          )}
        </View>
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
  timeContainer: {
    alignItems: "center",
    top: 50,
  },
  timeText: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30,
    letterSpacing: 2,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30,
    letterSpacing: 1,
    top: 20,
  },
  input: {
    width: "80%",
    borderWidth: 3,
    height: 50,
    borderColor: "blue",
    top: 50,
    borderRadius: 20,
    padding: 10,
    fontSize: 20,
  },
  submitBtn: {
    top: 70,
    width: "80%",
    backgroundColor: "#073E7E",
    borderRadius: 50,
    alignItems: "center",
    padding: 10,
  },
  submitBtnText: {
    color: "white",
    fontSize: 20,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
    top: 70,
    marginBottom: 10,
    textAlign: "center",
  },
});
