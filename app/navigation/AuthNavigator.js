import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import FeedScreen from "../screens/FeedScreen";
import AppNavigator from "./AppNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      headerMode: "none",
    }}
  >
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={() => ({
        tabBarStyle: {
          display: "none",
        },
        tabBarButton: () => null,
      })}
    />
    <Stack.Screen name="Default" component={AppNavigator} />
  </Stack.Navigator>
);

export default AuthNavigator;
