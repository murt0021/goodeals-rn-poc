import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

const storeOptions = ["loblaws", "metro", "walmart"];

const RadioButton = ({ options, value, onPress }) => {
  return (
    <View style={styles.radioButtonGroup}>
      {options.map((option, index) => (
        <View key={index} style={styles.radioButtonContainer}>
          <Text style={styles.radioButtonText}>{option}</Text>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => onPress(option)}
          >
            {value === option && <View style={styles.radioButtonIcon} />}
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default function App() {
  const [postalCode, setPostalCode] = useState("");
  const [store, setStore] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/search?postalCode=${postalCode}&store=${store}`
      );
      const data = await response.json();
      console.log(response);
      console.log(data);
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Postal Code"
        value={postalCode}
        onChangeText={setPostalCode}
        autoCapitalize="none"
      />
      <RadioButton
        options={storeOptions}
        value={store}
        onPress={(newStore) => setStore(newStore)}
      />
      <Button title="Search" onPress={fetchData} />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      <ScrollView style={styles.resultsContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>Name: {item.name}</Text>
            <Text style={styles.itemText}>Price: ${item.current_price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  resultsContainer: {
    width: "100%",
    marginTop: 20,
  },
  item: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
  radioButtonGroup: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  radioButtonText: {
    marginRight: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonIcon: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
});
