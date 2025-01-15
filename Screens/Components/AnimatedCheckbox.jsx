import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnimatedCheckbox = ({ isSelected, onPress }) => {
    // Animated value for smooth transition of scale and opacity
    const scale = new Animated.Value(isSelected ? 1.1 : 1);
    const opacity = new Animated.Value(isSelected ? 1 : 0.6);

    // Animate the checkbox when selected/deselected
    React.useEffect(() => {
        Animated.timing(scale, {
            toValue: isSelected ? 1.1 : 1,
            duration: 150,
            useNativeDriver: true,
        }).start();

        Animated.timing(opacity, {
            toValue: isSelected ? 1 : 0.6,
            duration: 150,
            useNativeDriver: true,
        }).start();
    }, [isSelected]);

    return (
        <TouchableOpacity
            style={[styles.checkbox, isSelected && styles.selectedCheckbox]}
            onPress={() => onPress(isSelected)}
        >
            <Animated.View
                style={[styles.iconContainer, { transform: [{ scale }], opacity }]}
            >
                <Ionicons
                    name={isSelected ? "checkbox" : "checkbox-outline"}
                    size={22}  // Smaller size for a more sophisticated look
                    color={isSelected ? '#fff' : '#005faf'}
                />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        width: 28,  // Smaller size for a more subtle look
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,  // Slightly thinner border
        borderRadius: 50,
        borderColor: '#005faf',
        backgroundColor: 'transparent',
        margin: 8, // Smaller margin for a more compact design
        overflow: 'hidden', // Ensures clean rounding of the checkbox
    },
    selectedCheckbox: {
        backgroundColor: '#005faf', // Highlight color when selected
        borderColor: '#005faf',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
});

export default AnimatedCheckbox;
