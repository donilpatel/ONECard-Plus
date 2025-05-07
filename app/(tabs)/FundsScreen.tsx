import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const fundsData = [
  { name: "FLEX APARTMENT", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "5-DAY FLEX", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "CARRY FORWARD", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "CONVENIENCE", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "DON DORM", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "7-DAY FLEX", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "BR CARRYFORWARD", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "BRANTFORD MP", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "DON APARTMENT", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "FLEX-35 ADMIN", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "TAXED 49 ADMIN", type: "Normal", amount: "$0.00", credit: "$0.00" },
  { name: "NOT IN USE", type: "Normal", amount: "$0.00", credit: "$0.00" },
];

const FundsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Balances</Text>
      <FlatList
        data={fundsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.type}</Text>
            <Text style={styles.cell}>{item.amount}</Text>
            <Text style={styles.cell}>{item.credit}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default FundsScreen;
