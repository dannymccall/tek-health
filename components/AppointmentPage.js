import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import DatePicker from "react-native-datepicker";
import { Ionicons } from "@expo/vector-icons";
import Include from "./Include";
export default function AppointmentPage({ navigation, route }) {
  const {
    username,
    specification,
    userStatus,
    patientName,
    userId,
    doctorName,
  } = route.params;
  const [time, setTime] = React.useState("");
  const [dateOfAppointment, setDateOfAppointment] =
    React.useState("1909-01-01");

  const eigthToNine = "8:00am to 9:30am";
  const tenToEleven = "10:30am to 11:30am";
  const twoToThree = "2:30pm to 3:30pm";
  const fourTofive = "4:30pm to 5:30pm";

  const onPressEightToNine = () => {
    setTime(eigthToNine);
    navigation.navigate("AppointmentFinalPage", {
      username: username,
      specification: specification,
      patientName: patientName,
      userId: userId,
      doctorName: doctorName,
      time: time,
      dateOfAppointment: dateOfAppointment,
    });
  };
  const onPressTenToEleven = () => {
    setTime(tenToEleven);
    navigation.navigate("AppointmentFinalPage", {
      username: username,
      specification: specification,
      patientName: patientName,
      userId: userId,
      doctorName: doctorName,
      time: time,
      dateOfAppointment: dateOfAppointment,
    });
  };
  const onPressTwoToThree = () => {
    setTime(twoToThree);
    navigation.navigate("AppointmentFinalPage", {
      username: username,
      specification: specification,
      patientName: patientName,
      userId: userId,
      doctorName: doctorName,
      time: time,
      dateOfAppointment: dateOfAppointment,
    });
  };
  const onPressFourToFive = () => {
    setTime(fourTofive);
    navigation.navigate("AppointmentFinalPage", {
      username: username,
      specification: specification,
      patientName: patientName,
      userId: userId,
      doctorName: doctorName,
      time: time,
      dateOfAppointment: dateOfAppointment,
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
        <Include />
        <View style={styles.doctorInfo}>
          <Image
            source={require("../assets/images/doctor.jpeg")}
            style={styles.doctorPicture}
          />
          <Text style={styles.doctorDetails}>{username}</Text>
          <Text style={styles.doctorDetails}>{specification}</Text>
          <Text
            style={{
              color: userStatus == "online" ? "#3DC75E" : "red",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {userStatus}
          </Text>
        </View>
        <View style={{ top: 50, left: 30 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
              right: 30,
            }}
          >
            Pick a date and time
          </Text>
          <DatePicker
            style={{
              width: "85%",
              borderColor: "#073E7E",
              marginBottom: 20,
              borderWidth: 5,
              borderRadius: 50,
            }}
            date={dateOfAppointment}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2022-01-01"
            maxDate="2022-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => setDateOfAppointment(date)}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              right: 30,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={onPressEightToNine}
              style={styles.timeButton}
            >
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                {eigthToNine}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressTenToEleven}
              style={styles.timeButton}
            >
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                {tenToEleven}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              right: 30,
            }}
          >
            <TouchableOpacity
              onPress={onPressTwoToThree}
              style={styles.timeButton}
            >
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                {twoToThree}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressFourToFive}
              style={styles.timeButton}
            >
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                {fourTofive}
              </Text>
            </TouchableOpacity>
          </View>
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
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  doctorPicture: {
    width: 80,
    height: 80,
    borderRadius: 50
  },
  PictureContainer: {
    width: 100,
    backgroundColor: "#E7E7E7",
    borderRadius: 50,
    height: 100,
    alignContent: "center",
    alignItems: "center",
    left: 20,
    marginTop: 20,
  },
  doctorInfo: {
    top: 30,
    alignItems: "center",
  },
  doctorDetails: {
    color: "blue",
    fontSize: 20,
    fontWeight: "bold",
  },
  timeButton: {
    backgroundColor: "#073E7E",
    width: 170,
    alignItems: "center",
    padding: 5,
    borderRadius: 50,
  },
});
