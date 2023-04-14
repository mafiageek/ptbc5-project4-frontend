import { createStackNavigator } from "@react-navigation/stack";
import FeedDetailScreen from "../screens/FeedDetailScreen";
import FeedScreen from "../screens/FeedScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Listings"
      component={FeedScreen}
      options={{
        headerBackTitleVisible: false,
        headerMode: "none",
      }}
    />
    <Stack.Screen name="Detail" component={FeedDetailScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
