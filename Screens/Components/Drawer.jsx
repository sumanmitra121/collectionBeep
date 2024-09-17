// MyDrawerComponent.js
import React, { useState } from 'react';
import { Drawer } from 'react-native-paper';

const DrawerComponent = ({ visible, onClose }) => {
  const [active, setActive] = useState('');

  return (
    visible && (
    //   <Drawer.Section title="Options" style={{ backgroundColor: '#f4f4f4' }}>
    //     <Drawer.Item
    //       label="First Item"
    //       active={active === 'first'}
    //       onPress={() => {
    //         setActive('first');
    //         onClose(); 
    //       }}
    //     />
    //     <Drawer.Item
    //       label="Second Item"
    //       active={active === 'second'}
    //       onPress={() => {
    //         setActive('second');
    //         onClose(); 
    //       }}
    //     />
    //   </Drawer.Section>
    <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
    )
  );
};

export default DrawerComponent;
