import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import React from "react";
import KeyboardAvoidingWrapper from "./KeyboardAvoidingWrapper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import { storeInAsyncStorage, getItemFromAsyncStorage } from "./storage";
import { LinearGradient } from "expo-linear-gradient";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Signin({ navigation }) {
  const [priorityCode, setPriorityCode] = React.useState();
  getItemFromAsyncStorage("priorityCode").then((priorityCode) =>
    setPriorityCode(priorityCode)
  );
  React.useEffect(() => {
    getItemFromAsyncStorage("username").then((username) => {
      if (username !== null && priorityCode == "0") {
        navigation.navigate("Dashboard");
      }
      if (priorityCode == "1") {
        navigation.navigate("AdminPage");
      }
    });
  }, []);
  const Formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "The username should not be more than 15 characters")
        .required("Required"),
      password: Yup.string()
        .max(15, "The username should not be more than 15 characters")
        .required("Required"),
    }),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState();
  const [specification, setSpecification] = useState("yes");
  const onSubmit = () => {
    if (specification == "yes") {
      setIsSubmitting(true);
      const user = {
        username: Formik.values.username,
        password: Formik.values.password,
      };
      axios
        .post(
          "https://node-tek-health-backend.herokuapp.com/doctor-signin",
          user
        )
        .then((res) => {
          const result = res.data;
          const { status, message, user } = result;
          const { username, email, typeOfUser, _id, priorityCode, userStatus } =
            user;
          if (status !== "SUCCESS") {
            setMessage(message);
            setIsSubmitting(false);
          } else {
            storeInAsyncStorage("username", username);
            storeInAsyncStorage("email", email);
            storeInAsyncStorage("typeOfUser", typeOfUser);
            storeInAsyncStorage("doctorId", _id);
            storeInAsyncStorage("userId", _id);
            storeInAsyncStorage("priorityCode", priorityCode);
            storeInAsyncStorage("doctorStatus", userStatus);
            console.log(_id);

            navigation.navigate("Dashboard");

            setIsSubmitting(false);
          }
        });
    } else {
      setIsSubmitting(true);
      const user = {
        username: Formik.values.username,
        password: Formik.values.password,
      };
      axios
        .post("https://node-tek-health-backend.herokuapp.com/signin", user)
        .then((res) => {
          const result = res.data;
          const { status, message, user } = result;
          const { username, email, typeOfUser, _id, priorityCode, userStatus } =
            user;
          if (status !== "SUCCESS") {
            setMessage(message);
            console.log(result);
            setIsSubmitting(false);
          } else {
            storeInAsyncStorage("username", username);
            storeInAsyncStorage("email", email);
            storeInAsyncStorage("typeOfUser", typeOfUser);
            storeInAsyncStorage("userId", _id);
            storeInAsyncStorage("priorityCode", priorityCode);
            storeInAsyncStorage("userStatus", userStatus);
            navigation.navigate("Dashboard");
            setIsSubmitting(false);
          }
        });
    }
  };

  return (
    <>
      <LinearGradient
        colors={["#023047", "#3d405b"]}
        style={{ height: "100%", marginTop: 30 }}
      >
        <View>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              height: 200,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
          >
            <Image
              source={require("../assets/images/login.jpg")}
              style={{ width: 200, height: 150, alignSelf: "center" }}
            />
            <Text
              style={{
                alignSelf: "center",
                fontSize: 35,
                textTransform: "uppercase",
                color: "#00b4d8",
              }}
            >
              tekhealth
            </Text>
          </View>
          <View style={styles.formContainer}>
            <View style={{ bottom: 50, marginTop: 30, width: "70%" }}>
              <Text style={styles.header}>Login</Text>
            </View>
            <View style={styles.formData}>
              <TextInput
                style={styles.input}
                onChangeText={Formik.handleChange("username")}
                value={Formik.values.username}
                onBlur={Formik.handleBlur("username")}
                placeholder="Username"
                placeholderTextColor={"#9E9A9E"}
              />
              {Formik.touched.username && Formik.errors.username ? (
                <Text style={styles.error}>{Formik.errors.username}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                onChangeText={Formik.handleChange("password")}
                value={Formik.values.password}
                secureTextEntry={true}
                onBlur={Formik.handleBlur("password")}
                placeholder="Password"
                placeholderTextColor={"#9E9A9E"}
              />

              {Formik.touched.password && Formik.errors.password ? (
                <Text style={styles.error}>{Formik.errors.password}</Text>
              ) : null}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignSelf: "center",
                  right: 20,
                }}
              >
                <Text style={{ color: "#9E9A9E", fontSize: 20 }}>
                  Are you a doctor?
                </Text>
                <RadioButton
                  value="yes"
                  status={specification === "yes" ? "checked" : "unchecked"}
                  onPress={() => setSpecification("yes")}
                  style={{ color: "white" }}
                />
                <Text style={styles.label}>yes</Text>
                <RadioButton
                  value="no"
                  status={specification === "no" ? "checked" : "unchecked"}
                  onPress={() => setSpecification("no")}
                  style={{ color: "white" }}
                />
                <Text style={styles.label}>no</Text>
              </View>
              {message ? <Text style={styles.error}>{message}</Text> : null}
              {!isSubmitting && (
                <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
                  <Text style={styles.btnText}>Sign in</Text>
                </TouchableOpacity>
              )}
              {isSubmitting && (
                <TouchableOpacity style={styles.submitBtn} disabled={true}>
                  <ActivityIndicator size="large" color="#fff" />
                </TouchableOpacity>
              )}
              <View style={{ top: 30 }}>
                <Text style={styles.quesionJoin}>OR</Text>
              </View>
              <View style={styles.questionContainer}>
                <Text style={styles.question}>Dont't have an account ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                  <Text style={styles.questionBotton}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3d405b",
  },
  login: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.1,
    alignSelf: "center",
    top: windowHeight * 0.07,
    left: windowWidth * 0.02,
    marginBottom: 10,
  },
  header: {
    top: windowHeight * 0.1,
    fontSize: 25,
    color: "white",
    marginLeft: 20,
  },
  loginText: {
    top: windowHeight * 0.1,
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#353C64",
    padding: 7,
    borderRadius: 10,
  },
  formData: {
    top: windowHeight * 0.07,
    paddingLeft: 20,
  },
  input: {
    borderWidth: 2,
    width: "90%",
    borderColor: "#9E9A9E",
    height: 40,
    borderRadius: 10,
    marginBottom: 20,
    top: 5,
    padding: 10,
    color: "#9E9A9E",
    fontSize: 18,
  },
  label: {
    fontSize: windowWidth * 0.045,
    fontWeight: "bold",
    color: "white",
  },
  submitBtn: {
    width: "40%",
    padding: 10,
    top: windowHeight * 0.01,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    alignSelf: "center",
    right: 20,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  dash: {
    width: "40%",
    height: 2,
    backgroundColor: "#AFAFAF",
  },
  quesionJoin: {
    left: 140,
    bottom: 15,
    fontSize: 20,
    color: "white",
    margin: 10,
  },
  dashSecond: {
    left: 200,
    width: "35%",
    height: 2,
    backgroundColor: "#AFAFAF",
    bottom: 27,
  },
  questionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    top: windowHeight * 0.06,
  },
  question: {
    fontSize: 18,
    color: "#9E9A9E",
  },
  questionBotton: {
    fontSize: 18,
    color: "white",
    left: 5,
  },
  error: {
    color: "red",
    fontSize: 15,
  },
});
