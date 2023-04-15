import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import FeedScreen from "../screens/ListingsScreen";
import AppNavigator from "./AppNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
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
  </Stack.Navigator>
);

export default AuthNavigator;
