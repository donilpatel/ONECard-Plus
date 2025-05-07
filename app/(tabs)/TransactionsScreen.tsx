import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const PAGE_SIZE = 5;

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
}

const TransactionsScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const flatListRef = useRef<FlatList>(null);

  // Fetch transactions based on page number
  const fetchTransactions = async (page: number): Promise<Transaction[]> => {
    console.log("Fetching transactions for page:", page);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const startIndex = (page - 1) * PAGE_SIZE;
    const data = Array.from({ length: PAGE_SIZE }, (_, i) => ({
      id: `${startIndex + i + 1}`,
      name: `Transaction ${startIndex + i + 1}`,
      amount: Math.floor(Math.random() * 1000),
      date: getRandomDate(),
    }));

    return data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  // Load transactions based on page number
  const loadTransactions = async (page: number) => {
    if (loading) return;
    setLoading(true);
    setPageLoading(true);

    try {
      const newTransactions = await fetchTransactions(page);
      setTransactions(newTransactions);

      const totalTransactionCount = 50;
      setTotalPages(Math.ceil(totalTransactionCount / PAGE_SIZE));
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setPageLoading(false), 500);
    }
  };

  useEffect(() => {
    loadTransactions(page);

    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
  }, [page]);

  // Filter transactions based on date range
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date + "T00:00:00Z");

    const startUTC = Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const endUTC = Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );
    const transactionUTC = Date.UTC(
      transactionDate.getFullYear(),
      transactionDate.getMonth(),
      transactionDate.getDate()
    );

    return transactionUTC >= startUTC && transactionUTC <= endUTC;
  });

  // Go to the first page
  const goToFirstPage = () => {
    setPage(1);
  };

  // Go to the last page
  const goToLastPage = () => {
    setPage(totalPages);
  };

  // Go to the next page
  const goToNextPage = () => {
    if (filteredTransactions.length > 0 && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const downloadTransactionsPDF = async () => {
    try {
      // Start download and show progress
      setIsDownloading(true);
      setProgress(0);

      const allFetchedTransactions: Transaction[] = [];

      // Fetch transactions and update progress
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const newTransactions = await fetchTransactions(pageNum);
        allFetchedTransactions.push(...newTransactions);

        const randomIncrement = Math.floor(Math.random() * 21) + 5;
        setProgress((prev) => Math.min(prev + randomIncrement, 100));

        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
      }

      // Filter the transactions based on date
      const filteredTransactions = allFetchedTransactions.filter(
        (transaction) => {
          const transactionDate = new Date(transaction.date + "T00:00:00Z");

          const startUTC = Date.UTC(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate()
          );
          const endUTC = Date.UTC(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate()
          );
          const transactionUTC = Date.UTC(
            transactionDate.getFullYear(),
            transactionDate.getMonth(),
            transactionDate.getDate()
          );

          return transactionUTC >= startUTC && transactionUTC <= endUTC;
        }
      );

      // Generate HTML for PDF
      const htmlContent = generateHTMLForPDF(filteredTransactions);

      // Save file to the file system
      const fileUri = FileSystem.documentDirectory + "transactions.html";
      await FileSystem.writeAsStringAsync(fileUri, htmlContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Share the file directly without timeout
      await Sharing.shareAsync(fileUri);

      // If the share was successful, reset progress and modal
      setIsDownloading(false);
      setProgress(0);
      Alert.alert(
        "File Ready",
        "The file is saved and ready to view. You can open it with a compatible app."
      );
    } catch (error) {
      // Ensure progress and modal reset after error
      console.error("Error generating PDF:", error);

      setIsDownloading(false); // Hide the loading modal
      setProgress(0); // Reset the progress

      // Handle cancellation or other errors
      Alert.alert("Error", "Failed to generate PDF");
    }
  };

  const generateHTMLForPDF = (transactions: Transaction[]) => {
    let htmlContent =
      '<h1>Transactions Report</h1><table border="1"><tr><th>ID</th><th>Name</th><th>Amount</th><th>Date</th></tr>';
    transactions.forEach((transaction) => {
      htmlContent += `<tr><td>${transaction.id}</td><td>${transaction.name}</td><td>${transaction.amount}</td><td>${transaction.date}</td></tr>`;
    });
    htmlContent += "</table>";
    return htmlContent;
  };

  const getRandomDate = (): string => {
    const start = new Date(2023, 0, 1);
    const end = new Date(2023, 11, 31);
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate.toISOString().split("T")[0];
  };

  return (
    <View style={styles.container}>
      <Modal visible={isDownloading} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Generating PDF...</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.modalText}>{progress}%</Text>
          </View>
        </View>
      </Modal>

      {pageLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="blue" />
          <Text style={styles.loadingText}>Loading Page {page}...</Text>
        </View>
      )}

      {!pageLoading && <Text style={styles.pageLabel}>Page {page}</Text>}

      <View style={styles.filterContainer}>
        <View style={styles.datePickerContainer}>
          <Text style={styles.filterLabel}>Start Date:</Text>
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(e, selectedDate) =>
              setStartDate(selectedDate || startDate)
            }
          />
        </View>

        <View style={styles.datePickerContainer}>
          <Text style={styles.filterLabel}>End Date:</Text>
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(e, selectedDate) => setEndDate(selectedDate || endDate)}
          />
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={filteredTransactions}
        keyExtractor={(item) => `${item.id}-${page}`}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Amount: ${item.amount}</Text>
            <Text style={styles.text}>Date: {item.date}</Text>
          </View>
        )}
        ListEmptyComponent={
          !loading && filteredTransactions.length === 0 ? (
            <Text style={styles.text}>No transactions available.</Text>
          ) : null
        }
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="blue" /> : null
        }
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.pageButton}
          onPress={goToFirstPage}
          disabled={
            page === 1 || pageLoading || filteredTransactions.length === 0
          }
        >
          <Ionicons name="arrow-undo" size={24} color="blue" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pageButton}
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={
            page === 1 || pageLoading || filteredTransactions.length === 0
          }
        >
          <Ionicons name="chevron-back" size={24} color="blue" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pageButton}
          onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={
            page === totalPages ||
            pageLoading ||
            filteredTransactions.length === 0
          }
        >
          <Ionicons name="chevron-forward" size={24} color="blue" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pageButton}
          onPress={goToLastPage}
          disabled={
            page === totalPages ||
            pageLoading ||
            filteredTransactions.length === 0
          }
        >
          <Ionicons name="arrow-redo" size={24} color="blue" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={downloadTransactionsPDF}
        style={[
          styles.downloadButton,
          filteredTransactions.length === 0 && styles.disabledButton, // Apply the disabled style if no transactions
        ]}
        disabled={filteredTransactions.length === 0} // Disable the button if there are no transactions
      >
        <Text style={styles.downloadText}>Download as PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 16, marginBottom: 10 },
  progressBar: {
    width: "100%",
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6A4C9C",
  },
  loaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  loadingText: {
    fontSize: 16,
    marginLeft: 10,
    color: "gray",
  },
  filterContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePickerContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  pageLabel: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  transactionItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: "#6A4C9C",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.3, // Lower opacity to make it appear grayed out or "blurred"
    backgroundColor: "#d0d0d0", // Optional: Change background color to a light gray when disabled
  },
  downloadText: { color: "white", fontSize: 18 },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  pageButton: {
    marginHorizontal: 10,
  },
});

export default TransactionsScreen;
