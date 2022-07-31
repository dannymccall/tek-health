import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { getItemFromAsyncStorage } from "./storage";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
export default function Home({ navigation }) {
  const [priorityCode, setPriorityCode] = React.useState();
  getItemFromAsyncStorage("priorityCode").then((priorityCode) =>
    setPriorityCode(priorityCode)
  );

  React.useEffect(() => {
    getItemFromAsyncStorage("username").then((username) => {
      if (username !== null) {
        navigation.navigate("Dashboard");
      }
    });
  }, []);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#40e0d0", marginTop: 30 }}>
        <LinearGradient
          colors={["#90e0ef", "#00b4d8", "#0077b6"]}
          style={{ height: "100%" }}
        >
          <View>
            <Image
              source={require("../assets/images/health.png")}
              style={{ width: 300, height: 200, alignSelf: "center", top: 100 }}
            />
            <Text style={styles.header}>Welcome to TekHealth</Text>
          </View>
          <View
            style={{
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Privacy")}
              style={styles.startButton}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 2,
                  lineHeight: 30,
                }}
              >
                Start
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  homePicture: {
    width: 300,
    height: 200,
    alignSelf: "center",
    top: 100,
  },
  article: {
    alignItems: "center",
    width: 350,
    top: 200,
    alignSelf: "center",
    alignContent: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    top: 120,
    alignSelf: "center",
  },
  terms: {
    color: "#0862F6",
    top: 5,
    fontSize: 16,
    left: 5,
  },
  section: {
    textAlign: "center",
    fontSize: 18,
    top: 10,
  },
  policy: {
    top: 5,
    color: "#0862F6",
    fontSize: 18,
    left: 5,
    marginRight: 10,
  },
  agree: {
    top: 20,
    fontSize: 35,
    color: "#0862F6",
  },
  startButton: {
    backgroundColor: "#03045e",
    margin: 20,
    padding: 10,
    borderRadius: 50,
  },
});
