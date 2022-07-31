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
  Alert,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-datepicker";
import axios from "axios";
import Include from "./Include";
import { Ionicons } from "@expo/vector-icons";
import { getItemFromAsyncStorage } from "./storage";

export default function Signin({ navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectBloodGroup, setSelectBloodGroup] = useState("A+");
  const [username, setUsername] = useState();
  const [message, setMessage] = useState();
  let [quantity, setQuantity] = useState("");
  const [blood, setBloodTypes] = useState([
    { label: "A+", item: "A+" },
    { label: "B+", item: "B+" },
    { label: "AB+", item: "AB+" },
    { label: "O+", item: "O+" },
    { label: "A-", item: "A-" },
    { label: "B-", item: "B-" },
    { label: "AB-", item: "AB-" },
    { label: "O-", item: "O-" },
  ]);

  getItemFromAsyncStorage("username").then((username) => setUsername(username));

  const onSubmit = () => {
    setIsSubmitting(true);
    quantity = Number(quantity);
    console.log();
    const blood = {
      quantity,
      selectBloodType: selectBloodGroup,
    };
    axios
      .post("https://node-tek-health-backend.herokuapp.com/add-blood", blood)
      .then((res) => {
        const result = res.data;
        const { status, message } = result;
        if (status == "SUCCESS") {
          setQuantity("");
          setIsSubmitting(false);
          return Alert.alert("Message", message, [
            {
              text: "Add a new stock",
              onPress: () => navigation.navigate("BloodStockForm"),
            },
            {
              text: "Go Back",
              onPress: () => navigation.navigate("AdminPage"),
            },
          ]);
        } else {
          setIsSubmitting(false);
          setMessage(message);
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
              color: "#023047",
              fontWeight: "bold",
              letterSpacing: 1,
              textTransform: "uppercase",
              margin: 10,
            }}
          >
            TekHealth
          </Text>
          <TouchableOpacity style={{ margin: 10 }}>
            <Ionicons name="logo-snapchat" size={20} color="#023047" />
          </TouchableOpacity>
        </View>
        <Include navigation={navigation} name={username} />

        <View style={styles.formContainer}>
          <View style={{ alignItems: "center", bottom: 60 }}>
            <Text style={styles.header}>Fill Stock for Blood</Text>
          </View>
          <View style={styles.formData}>
            <Text style={styles.label}>Blood Group Type</Text>
            <Picker
              selectedValue={selectBloodGroup}
              onValueChange={(itemValue, itemIndex) =>
                setSelectBloodGroup(itemValue)
              }
              style={{ color: "white", borderWidth: 2 }}
            >
              {blood.map((value, i) => {
                return (
                  <Picker.Item label={value.label} value={value.item} key={i} />
                );
              })}
            </Picker>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setQuantity(value)}
              value={quantity}
              placeholder="Quantity"
              placeholderTextColor={"white"}
            />
            {message ? (
              <Text style={styles.errorMessage}>{message}</Text>
            ) : null}

            {!isSubmitting && (
              <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
                <Text style={styles.btnText}>Fill Stock</Text>
              </TouchableOpacity>
            )}
            {isSubmitting && (
              <TouchableOpacity style={styles.submitBtn} disabled={true}>
                <ActivityIndicator size="large" color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00b4d8",
    marginTop: 30,
  },
  login: {
    width: 150,
    height: 100,
    alignSelf: "center",
    top: 50,
    left: 20,
  },
  header: {
    alignSelf: "center",
    top: 100,
    fontSize: 25,
    color: "white",
  },
  loginText: {
    top: 100,
    fontSize: 17,
    fontWeight: "300",
    color: "black",
  },
  formData: {
    top: 60,
    paddingLeft: 20,
  },
  input: {
    borderWidth: 2,
    width: "90%",
    borderColor: "#023047",
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    top: 5,
    padding: 10,
    color: "white",
    fontSize: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
  },
  submitBtn: {
    width: "40%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#023047",
    alignSelf: "center",
    right: 10,
    marginTop: 20,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
