import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";

const MainScreen: React.FC<any> = ({ navigation }: any) => {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigation.navigate("SignIn");
  };

  const student = {
    name: "John Doe",
    id: "123456",
    picture: "https://randomuser.me/api/portraits/lego/4.jpg", // Dummy profile picture
    fundsRemaining: 500, // Dummy funds value
  };

  const transactions = [
    { id: "1", name: "Transaction 1", amount: 100 },
    { id: "2", name: "Transaction 2", amount: 50 },
    { id: "3", name: "Transaction 3", amount: 200 },
    { id: "4", name: "Transaction 4", amount: 75 },
    { id: "5", name: "Transaction 5", amount: 120 },
  ];

  return (
    <View style={styles.container}>
      {/* Sign Out Button */}
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <Ionicons name="log-out-outline" size={30} color="white" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Student Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>OneCard</Text>
          </View>
          <View style={styles.cardBody}>
            <Image
              source={{ uri: student.picture }}
              style={styles.profilePicture}
            />
            <Text style={styles.cardName}>{student.name}</Text>
            <Text style={styles.cardSubtitle}>ID: {student.id}</Text>
            <Text style={styles.cardSubtitle}>
              Funds Remaining: ${student.fundsRemaining}
            </Text>
          </View>
        </View>

        {/* Latest Transactions */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.sectionTitle}>Latest Transactions</Text>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <Text style={styles.transactionText}>
                {transaction.name}: ${transaction.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
  },
  signOutButton: {
    position: "absolute",
    top: 15,
    right: 20,
    backgroundColor: "#6A4C9C", // Laurier Purple
    padding: 10,
    borderRadius: 50,
    zIndex: 1,
  },
  scrollContainer: {
    paddingTop: 80, // Adjusted to avoid overlap with sign-out button
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  cardHeader: {
    backgroundColor: "#6A4C9C", // Laurier Purple
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  cardBody: {
    alignItems: "center",
    marginTop: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  cardName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 5,
  },
  transactionsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionItem: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionText: {
    fontSize: 16,
  },
});

export default MainScreen;
