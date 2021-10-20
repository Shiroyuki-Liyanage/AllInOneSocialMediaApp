import * as React from "react";
import { View, Text } from "react-native";

class AccountsPage extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>Reddit Screen</Text>
      </View>
    );
  }
}

export default AccountsPage;
