import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSession } from './SessionContext'; // Import the session context

const CustomDropdown = ({ items, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const { selectedSession, setSelectedSession } = useSession(); // Use session context


  const handleSelect = (value) => {
    setSelectedSession(value);
    onSelect(value);
    setIsOpen(false);
  };

  const renderItem = ({ item }) => (
    // <TouchableOpacity
    //   style={[styles.item, { backgroundColor: theme.colors.background,shadowColor:theme.colors.p }]}
    //   onPress={() => handleSelect(item)}
    // >
    //   <Text style={[styles.itemText, { color: theme.colors.primary }]}>{item}</Text>
    // </TouchableOpacity>
    <TouchableOpacity
    style={[
      styles.item,
      {
        backgroundColor: item === selectedSession ? theme.colors.secondaryContainer : theme.colors.background, // Set background color based on selection
        shadowColor: theme.colors.primary,
      },
    ]}
    onPress={() => handleSelect(item)}
  >
    <Text style={[styles.itemText, { color: item === selectedSession ? theme.colors.background : theme.colors.primary }]}>{item}</Text>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={[styles.dropdown, { backgroundColor: theme.colors.background,shadowColor:theme.colors.primary }]}

      >
        <Text style={[styles.selectedText, { color: theme.colors.primary }]}>
          {selectedSession  || 'Select a session'}
        </Text>
        {isOpen ? (<Ionicons name="chevron-up-outline" size={18} color={theme.colors.primary} style={styles.icon} 
        onPress={() => setIsOpen(!isOpen)} />):(
        <Ionicons name="chevron-down-outline" size={18} color={theme.colors.primary} style={styles.icon} 
        onPress={() => setIsOpen(!isOpen)} />)}
      </View>

      {isOpen && (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          style={[styles.dropdownList,{color:theme.colors.primary,}]}
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
    padding: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', 
    alignItems: 'center' ,
    elevation: 5,
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.5,
    shadowRadius:10,
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
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 10,
    elevation:5,
    shadowOffset:{width:0,height:1},
    shadowOpacity:0.5,
    shadowRadius:10,
  },
  item: {
    padding: 9,
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  icon:{
    paddingLeft:12,
  },

});

export default CustomDropdown;
