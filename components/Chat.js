import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
} from "react-native";
import React from "react";
import { getItemFromAsyncStorage } from "./storage";
import { headerHeight } from "@react-navigation/native-stack";
import Axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Chat({ route }) {
  const [users, setUsers] = React.useState([]);

  const [username, setUsername] = React.useState("");
  const [doctorName, setDoctorName] = React.useState();
  const [email, setEmail] = React.useState("");
  const [typeOfUser, setTypeOfUser] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [currentDoctorId, setDoctorId] = React.useState("");
  const [currentMessage, setCurrentMessage] = React.useState();
  const [isTyping, setIsTyping] = React.useState(false);
  const [messageSent, setMessageSent] = React.useState();
  const [doctorStatus, setDoctorStatus] = React.useState();
  const [userStatus, setUserStatus] = React.useState();
  getItemFromAsyncStorage("typeOfUser").then((typeOfUser) =>
    setTypeOfUser(typeOfUser)
  );
  if (typeOfUser === "Doctor") {
    getItemFromAsyncStorage("username").then((username) =>
      setDoctorName(username)
    );
    getItemFromAsyncStorage("email").then((email) => setEmail(email));
    getItemFromAsyncStorage("doctorId").then((_id) => setDoctorId(_id));
    getItemFromAsyncStorage("doctorStatus").then((doctorStatus) =>
      setDoctorStatus(doctorStatus)
    );
  } else {
    getItemFromAsyncStorage("username").then((username) =>
      setUsername(username)
    );
    getItemFromAsyncStorage("email").then((email) => setEmail(email));
    getItemFromAsyncStorage("userId").then((_id) => setUserId(_id));
    getItemFromAsyncStorage("userStatus").then((userStatus) =>
      setUserStatus(userStatus)
    );
  }
  let newMessage = {};
  const onChange = (value) => {
    if (value.length) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
    setCurrentMessage(value);
    console.log(currentMessage);
  };

  const submitMessage = () => {
    if (typeOfUser === "Normal User") {
      newMessage = {
        patientId: userId,
        doctorId: doctorId,
        doctorName: doctorName,
        messageText: currentMessage,
      };
    } else {
      newMessage = {
        patientId: userId,
        doctorId: currentDoctorId,
        doctorName: username,
        messageText: currentMessage,
      };
    }
    console.log(newMessage);
    Axios.post(
      "https://node-tek-health-backend.herokuapp.com/send-message",
      newMessage
    )
      .then((res) => {
        const result = res.data;
        const { status, data, message } = result;
        if (status === "SUCCESS") {
          return;
        } else {
          console.log(message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    let doctorId = "";
    if (typeOfUser === "Doctor") {
      doctorId = doctorId;
      //    setInterval(() => {
      Axios.get(
        `https://node-tek-health-backend.herokuapp.com/doctor-message/${doctorId}`
      )
        .then((res) => {
          const { status, messages } = res.data;
          console.log(res.data);
          console.log("doctor");
          const {} = messages;
          if (status === "SUCCESS") {
          }
        })
        .catch();
      //    }, 5000);
    } else {
      console.log(userId);
      let patientId = "";
      patientId = userId;
      // setInterval(() => {
      Axios.get(
        `https://node-tek-health-backend.herokuapp.com/patient-message/${patientId}`
      )
        .then((res) => {
          const { status, messages } = res.data;
          console.log(messages);
          console.log("hello");
          const {} = messages;
          if (status === "SUCCESS") {
            setMessageSent(messages);
          }
        })
        .catch();
      // }, 5000);
    }
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.chatContainer}>
          <Image
            source={require("../assets/images/doctor.png")}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#D3D3D2",
            }}
          />
          <View>
            <Text
              style={{
                top: 5,
                fontSize: 15,
                left: 10,
              }}
            >
              {doctorName}
            </Text>
            <Text
              style={{
                top: 5,
                fontSize: 15,
                left: 10,
                color: doctorStatus === "online" ? "green" : "red",
              }}
            >
              {doctorStatus}
            </Text>
          </View>
        </View>
        {messageSent
          ? messageSent.map((message) => {
              return (
                <View
                  style={{
                    backgroundColor: "#3746A7",
                    marginBottom: 10,
                  }}
                  key={message._id}
                >
                  <Text>{message.messageText}</Text>
                </View>
              );
            })
          : null}

        <KeyboardAvoidingView behavior="padding" style={styles.keyboard}>
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: "#AFAFAD",
              width: "80%",
              height: 40,
              borderRadius: 50,
              padding: 10,
              fontSize: 20,
              marginTop: windowHeight * 0.7,
            }}
            onChangeText={(value) => onChange(value)}
          />
          {isTyping ? (
            <TouchableOpacity onPress={submitMessage}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "black",
                  borderRadius: 50,
                  alignItems: "center",
                  top: windowHeight * 0.58,
                }}
              >
                <Image
                  source={require("../assets/images/telegram.png")}
                  style={{ top: windowHeight * 0.05, left: 3 }}
                />
              </View>
            </TouchableOpacity>
          ) : null}
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    top: windowHeight * 0.03,
    flexDirection: "column",
  },
  keyboard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  chatContainer: {
    backgroundColor: "#F3F3F2",
    width: "100%",
    padding: 10,
    flexDirection: "row",
  },
  chatText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    top: windowHeight * 0.02,
    fontSize: 30,
  },
  inputContainer: {
    top: 640,
    flexDirection: "row",
    borderRadius: 50,
    justifyContent: "space-evenly",
  },
  button: {
    width: "100%",
    backgroundColor: "#AFAFAD",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    height: 40,
  },
});
