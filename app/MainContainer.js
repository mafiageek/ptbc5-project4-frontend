import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import FeedScreen from "./screens/FeedScreen";
import AddScreen from "./screens/AddScreen";
import AccountScreen from "./screens/AccountScreen";

const FeedRoute = () => <FeedScreen />;

const AddRoute = () => <AddScreen />;

const AccountRoute = () => <AccountScreen />;

const MainContainer = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "feed",
      title: "Feed",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },

    { key: "adds", title: "Add", focusedIcon: "plus-circle" },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    feed: FeedRoute,

    adds: AddRoute,
    account: AccountRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MainContainer;
