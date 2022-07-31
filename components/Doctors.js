import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Axios from "axios";

export default function Doctors({ navigation }) {
  const [doctors, setDoctors] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState();
  React.useEffect(() => {
    Axios.get("https://node-tek-health-backend.herokuapp.com/get-doctors").then(
      (res) => {
        const { status, data } = res.data;
        if (status === "SUCCESS") {
          setDoctors(data);
          console.log(doctors);
        } else {
          setMessage("Something happened");
        }
      }
    );
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            top: 5,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              marginTop: 20,
              left: 10,
              color: "black",
            }}
          >
            Chats
          </Text>
        </View>
        {doctors
          ? doctors.map((doctor) => {
              return (
                <>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        width: "15%",
                        padding: 5,
                        borderRadius: 50,
                        height: 60,
                        alignItems: "center",
                        borderColor: "#D4D4C0",
                        top: 20,
                        left: 10,
                      }}
                    >
                      <Image
                        source={require("../assets/images/doctor.jpeg")}
                        style={{ width: 50, height: 50, borderRadius: 50 }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Chat", {
                          doctorId: doctor._id,
                          doctorName: doctor.username,
                          doctorStatus: doctor.userStatus,
                        })
                      }
                      style={{ top: 10, left: 20 }}
                    >
                      <View style={{ top: 20 }}>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {doctor.username}
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: 18,
                          }}
                        >
                          ({doctor.specification})
                        </Text>
                      </View>
                      <View></View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "70%",
                      backgroundColor: "#D4D4C0",
                      height: 2,
                      marginBottom: 20,
                      left: 80,
                      top: 20,
                    }}
                  ></View>
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
    backgroundColor: "white",
    top: 30,
  },
  doctorsContainer: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    padding: 5,
    top: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderColor: "#D4D4C0",
  },
});
