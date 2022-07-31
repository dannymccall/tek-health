import {
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ActivityIndicator,
  Dimensions,
  ImageBackground
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-datepicker";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Signin({ navigation }) {
  const Formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
      specification: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "The username should not be more than 15 characters")
        .required("Required"),
      password: Yup.string()
        .max(15, "The username should not be more than 15 characters")
        .required("Required"),
      email: Yup.string()
        .email("The email you entered is not valid")
        .required("Required"),
      specification: Yup.string().required("Required"),
    }),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("None");
  const [dateOfBirth, setDateOfBirth] = useState("2016-05-15");
  const [message, setMessage] = useState();

  const onSubmit = async () => {
    if (Formik.values.specification) {
      setIsSubmitting(true);
      const user = {
        email: Formik.values.email,
        username: Formik.values.username,
        password: Formik.values.password,
        dateOfBirth: dateOfBirth,
        typeOfUser: selectedLanguage,
        specification: Formik.values.specification,
      };
      console.log(selectedLanguage);
      axios
        .post(
          "https://node-tek-health-backend.herokuapp.com/doctor-signup",
          user
        )
        .then((res) => {
          const result = res.data;
          const { status, message, data } = result;
          if (status !== "SUCCESS") {
            setMessage(message);
            console.log(result);
            setIsSubmitting(false);
          } else {
            navigation.navigate("Signin");
          }
        });
    } else {
      setIsSubmitting(true);
      const user = {
        email: Formik.values.email,
        username: Formik.values.username,
        password: Formik.values.password,
        dateOfBirth: dateOfBirth,
        typeOfUser: selectedLanguage,
      };
      console.log(selectedLanguage);
      axios
        .post("https://node-tek-health-backend.herokuapp.com/signup", user)
        .then((res) => {
          const result = res.data;
          const { status, message, data } = result;
          if (status !== "SUCCESS") {
            setMessage(message);
            console.log(result);
            setIsSubmitting(false);
          } else {
            navigation.navigate("Signin");
          }
        });
    }
  };
  return (
    <>
       <LinearGradient
          colors={["#023047", "#3d405b"]}
          style={{height: '100%', marginTop:30}}
        >
           <View
            style={{
              width: "100%",
              backgroundColor: "white",
              height: 150,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            
            }}
          >
            <Image source={require('../assets/images/signup.jpg')} style={{width:70, height:70, alignSelf:'center', marginTop:15}}/>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 35,
                textTransform: "uppercase",
                color:'#00b4d8'
              }}
            >
              tekhealth
            </Text>
          </View>
        <View style={styles.formContainer}>
          <View style={{ alignItems: "center", bottom: 60 }}>
            <Text style={styles.header}>Let's Get Started</Text>
          </View>
          <View style={styles.formData}>
            <TextInput
              style={styles.input}
              onChangeText={Formik.handleChange("email")}
              value={Formik.values.email}
              onBlur={Formik.handleBlur("email")}
              placeholder="Email"
              placeholderTextColor={'#9E9A9E'}
            />
            {Formik.touched.email && Formik.errors.email ? (
              <Text style={styles.error}>{Formik.errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.input}
              onChangeText={Formik.handleChange("username")}
              value={Formik.values.username}
              onBlur={Formik.handleBlur("username")}
              placeholder="Username"
              placeholderTextColor={'#9E9A9E'}
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
              placeholderTextColor={'#9E9A9E'}
            />
            {Formik.touched.password && Formik.errors.password ? (
              <Text style={styles.error}>{Formik.errors.password}</Text>
            ) : null}

            <Text style={styles.label}>Pick date of birth</Text>
            <DatePicker
              style={{
                width: "90%",
        
                marginBottom: 5,
                borderWidth: 2,
                borderColor: "white",
                borderRadius:5
              }}
              date={dateOfBirth}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1909-05-01"
              maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => setDateOfBirth(date)}
            />

            <Text style={styles.label}>Are you a doctor or a normal user</Text>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
              style={{color:'white',fontWeight:'bold'}}
            >
              <Picker.Item label="Doctor" value="Doctor" />
              <Picker.Item label="Normal user" value="Normal User" />
              <Picker.Item label="none" value="None" />
            </Picker>
            {selectedLanguage === "Doctor" ? (
              <TextInput
                style={styles.input}
                onChangeText={Formik.handleChange("specification")}
                value={Formik.values.specification}
                onBlur={Formik.handleBlur("specification")}
                placeholder="Type your specification"
                placeholderTextColor={"#747474"}
              />
            ) : null}
            {Formik.touched.specification && Formik.errors.specification ? (
              <Text style={styles.error}>{Formik.errors.specification}</Text>
            ) : null}
            {message ? (
              <Text style={styles.errorMessage}>{message}</Text>
            ) : null}

            {!isSubmitting && (
              <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
                <Text style={styles.btnText}>Sign up</Text>
              </TouchableOpacity>
            )}
            {isSubmitting && (
              <TouchableOpacity style={styles.submitBtn} disabled={true}>
                <ActivityIndicator size="large" color="#fff" />
              </TouchableOpacity>
            )}
            <View style={{ top: 10 }}>
          
              <Text style={styles.quesionJoin}>OR</Text>
  
            </View>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>Already a Member ?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                <Text style={styles.questionBotton}>Sign in</Text>
              </TouchableOpacity>
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
    backgroundColor: "#fff",
  },
  login: {
    width: 150,
    height: 100,
    alignSelf: "center",
    top: windowHeight * 0.05,
    left: 20,
  },
  header: {
    alignSelf: "center",
    top: windowHeight * 0.12,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  loginText: {
    top: windowHeight * 0.12,
    fontSize: 17,
    fontWeight: "300",
    color: "white",
    backgroundColor: '#0862F6',
    padding: 7,
    borderRadius: 10
  },
  formData: {
    top: windowHeight * 0.06,
    paddingLeft: 20,
  },
  input: {
    borderWidth: 2,
    width: "90%",
    borderColor: "#9E9A9E",
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    top: 5,
    padding: 10,
    color: "#9E9A9E",
    fontSize: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9E9A9E",

  },
  submitBtn: {
    width: "40%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor:'#9E9A9E',
    alignSelf:'center',
    right:20
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  dash: {
    width: "40%",
    height: 2,
    backgroundColor: "white",
  },
  quesionJoin: {
    left: 160,
    bottom: 15,
    fontSize: 20,
    color: "white",
    marginTop: 20
  },
  dashSecond: {
    left: 200,
    width: "35%",
    height: 2,
    backgroundColor: "white",
    bottom: 27,
  },
  questionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    right: 20,
    marginTop: 10
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
    right: 10
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
