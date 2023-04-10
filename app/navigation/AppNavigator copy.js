import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import AccountScreen from "../screens/AccountScreen";
import AddNavigator from "./AddNavigator";
import FeedNavigator from "./FeedNavigator";

const AccountRoute = () => <AccountScreen />;

const AppNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "feed",
      title: "Feed",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },

    { key: "new", title: "New", focusedIcon: "plus-circle" },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: FeedNavigator,

    add: AddNavigator,
    account: AccountRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    ></BottomNavigation>
  );
};

export default AppNavigator;
