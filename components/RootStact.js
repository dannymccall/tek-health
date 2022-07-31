import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Chat from "./Chat";
import React from "react";
import Appointment from "./Appointment";
import { getItemFromAsyncStorage } from "./storage";
import AppointmentPage from "./AppointmentPage";
import AppointmentFinalPage from "./AppointmentFinalPage";
import Doctors from "./Doctors";
import AdminPage from "./AdminPage";
import AdminProfile from "./AdminProfile";
import BloodStockForm from "./BloodStockForm";
import AdminCheckAppointment from "./AdminCheckAppointments";
import DoctorAppointments from "./DoctorAppointments";
import BloodOrder from "./BloodOrder";
import Privacy from "./Privacy";
const Stack = createNativeStackNavigator();

export default function RootStack({ navigation }) {
  const key = getItemFromAsyncStorage("username");
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Appointment"
            component={Appointment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AppointmentPage"
            component={AppointmentPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AppointmentFinalPage"
            component={AppointmentFinalPage}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Doctors"
            component={Doctors}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminPage"
            component={AdminPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminProfile"
            component={AdminProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BloodStockForm"
            component={BloodStockForm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdminCheckAppointment"
            component={AdminCheckAppointment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoctorAppointments"
            component={DoctorAppointments}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BloodOrder"
            component={BloodOrder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Privacy"
            component={Privacy}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
