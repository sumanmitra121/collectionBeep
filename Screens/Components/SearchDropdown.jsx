import React, { useState } from 'react';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { View, Modal, TouchableOpacity, FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const SearchDropdown = ({ items, selectedValue, onSelect, placeholder }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  const handleSelect = (item) => {
    onSelect(item);
    setModalVisible(false);
  };

  const handleOutsideClick = () => {
    setModalVisible(false);
  };

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>{selectedValue ? selectedValue : placeholder}</Text>
        <Ionicons name="chevron-down" size={20} color="gray" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContent}>
                <TextInput
                  placeholder="Search"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.searchBar}
                  mode="outlined"
                  // left={<TextInput.Icon name="eye" />}
                  // right={<TextInput.Icon icon="search" />}
                  
                />
                <FlatList
                  data={filteredItems}
                  keyExtractor={(item) => item.value.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                      <Text style={styles.itemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  dropdownText: {
    fontSize: 14,
    color: 'gray',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  searchBar: {
    marginBottom: 10,
    height: 50,
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default SearchDropdown;
