import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDropdown = ({ items, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: theme.colors.background }]}
      onPress={() => handleSelect(item)}
    >
      <Text style={[styles.itemText, { color: theme.colors.primary }]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={[styles.dropdown, { backgroundColor: theme.colors.background }]}

      >
        <Text style={[styles.selectedText, { color: theme.colors.primary }]}>
          {selectedValue || 'Select a session'}
        </Text>
        <Ionicons name="chevron-down-circle" size={20} color={theme.colors.primary} style={styles.icon} 
        onPress={() => setIsOpen(!isOpen)} />
      </View>

      {isOpen && (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          style={[styles.dropdownList,{color:theme.colors.primary,borderColor:theme.colors.primary}]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdown: {
    padding: 4,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:40,
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  selectedText: {
    fontSize: 14,
  },
  dropdownList: {
    position: 'absolute',
    top: '70%',
    left: 0,
    right: 0,
    maxHeight: 150,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 10,
  },
  item: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  itemText: {
    fontSize: 14,
  },
});

export default CustomDropdown;
