import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { getItemFromAsyncStorage } from "./storage";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import Axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Include from "./Include";
export default function BloodOrder() {
  const [blood, setBloodTypes] = React.useState([
    { label: "A+", item: "A+" },
    { label: "B+", item: "B+" },
    { label: "AB+", item: "AB+" },
    { label: "O+", item: "O+" },
    { label: "A-", item: "A-" },
    { label: "B-", item: "B-" },
    { label: "AB-", item: "AB-" },
    { label: "O-", item: "O-" },
  ]);
  const [selectBloodGroup, setSelectBloodGroup] = React.useState("");
  const [message, setMessage] = React.useState("");
  let [quantity, setQuantity] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [username, setUsername] = React.useState();

  getItemFromAsyncStorage("username").then((username) => setUsername(username));
  React.useEffect(()=> {
    Axios.get('https://node-tek-health-backend.herokuapp.com/get-blood-in-stock')
    .then(res => {
        const result = res.data;
        console.log(result);
    })  
  },[])
 
  const onSubmit = () => {
    const blood = {
      username,
      quantity,
      selectBloodGroup,
    };
    Axios.post("https://node-tek-health-backend.herokuapp.com/order-blood", blood)
    .then(res => {
        const result = res.data;
        console.log(result);
    })
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
        <View
          style={{
            alignItems: "center",
            top: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              color: "#023047",
              letterSpacing: 2,
            }}
          >
            Order for blood
          </Text>
          <Image
            source={require("../assets/images/sellblood.png")}
            style={{ width: 70, height: 70 }}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formData}>
            <Text style={styles.label}>Blood Group Type</Text>
            <Picker
              selectedValue={selectBloodGroup}
              onValueChange={(itemValue, itemIndex) =>
                setSelectBloodGroup(itemValue)
              }
            >
              {blood.map((value, i) => {
                return (
                  <Picker.Item label={value.label} value={value.item} key={i} />
                );
              })}
            </Picker>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setQuantity(value)}
              value={quantity}
            />
            {message ? (
              <Text style={styles.errorMessage}>{message}</Text>
            ) : null}

            {!isSubmitting && (
              <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
                <Text style={styles.btnText}>Order Blood</Text>
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
  input: {
    borderWidth: 2,
    width: "90%",
    borderColor: "#4A3EF1",
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    top: 5,
    padding: 10,
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    fontWeight: "400",
    color: "black",
  },
  submitBtn: {
    width: "90%",
    backgroundColor: "#0862F6",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
  },
  formData: {
    top: 60,
    paddingLeft: 20,
  },
  errorMessage:{
      color: 'red'
  }
});
