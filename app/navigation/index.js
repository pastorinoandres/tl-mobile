//info: Apartado de configuración donde diseña la navegación de la app con React Navigation
import React from "react";
import { useSelector } from "../hooks";

//dependecies
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import {
  Auth,
  Register,
  SignIn,
  AddPhoto,
  EmailConfirmation,
  UpdateEmail,
} from "../modules/auth/screens";
import { Home, Explore, Contacts } from "../modules/demandante/screens";

//selectors
import { getIsAuthenticated } from "../state/ducks/user/userSelectors";

import {
  AUTH,
  SIGN_IN,
  REGISTER,
  ADD_PHOTO,
  EMAIL_CONFIRMATION,
  UPDATE_EMAIL,
  EXPLORE,
  CONTACTS,
} from "./constants";

import TabBar from "./TabBar";
import {
  Home as HomeIcon,
  Store as StoreIcon,
  Contacts as ContactsIcon,
} from "./../shared/vectors";
import { colors } from "../shared/styles";
import { View } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ReactNavigationContainer() {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator
          tabBar={(props) => <TabBar {...props} />}
          lazy={false}
          tabStyle={{
            backgroundColor: "transparent",
          }}
        >
          {/*<Tab.Screen 
            name="Inicio" 
            component={Home}
            options={{
              tabBarLabel: 'Inicio',
              tabBarIcon: ({ color, size }) => (
                <HomeIcon size={size} color={color} />
              ),
              tabBarVisible:true
            }} 
          />*/}
          <Tab.Screen
            name={EXPLORE}
            component={Explore}
            options={{
              tabBarLabel: "Tienda",
              tabBarIcon: ({ color, size }) => (
                <StoreIcon size={size} color={color} />
              ),
              tabBarVisible: true,
            }}
          />
          <Tab.Screen
            name={CONTACTS}
            component={Contacts}
            options={{
              tabBarLabel: "Agenda",
              tabBarIcon: ({ color, size }) => (
                <ContactsIcon size={size} color={color} />
              ),
              tabBarVisible: true,
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name={AUTH} component={Auth} />
          <Stack.Screen name={SIGN_IN} component={SignIn} />
          <Stack.Screen name={REGISTER} component={Register} />
          <Stack.Screen
            name={EMAIL_CONFIRMATION}
            component={EmailConfirmation}
          />
          <Stack.Screen name={ADD_PHOTO} component={AddPhoto} />
          <Stack.Screen name={UPDATE_EMAIL} component={UpdateEmail} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default React.memo(ReactNavigationContainer);
