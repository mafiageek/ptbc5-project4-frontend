import { createStackNavigator } from "@react-navigation/stack";
import FeedDetailScreen from "../screens/FeedDetailScreen";
import FeedScreen from "../screens/FeedScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator initialRouteName="Feed">
    <Stack.Screen name="Listings" component={FeedScreen} />
    <Stack.Screen name="Detail" component={FeedDetailScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
