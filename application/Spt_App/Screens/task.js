// src/ContactList.js

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView , ToastAndroid} from 'react-native';
import Modal from 'react-native-modal';

const Task = () => {
  const [contacts, setContacts] = useState([
    { id: '1', company: 'Google', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', company: 'Microsoft', name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: '3', company: 'Twitter', name: 'Sam Johnson', email: 'sam.johnson@example.com' },
    { id: '4', company: 'LinkedIn', name: 'Bhoomi', email: 'bhoomi@example.com' },
    { id: '5', company: 'Oracle', name: 'Anand', email: 'anand@example.com' },
    { id: '6', company: 'Meta', name: 'Chetan', email: 'chetan@example.com' },
    { id: '7', company: 'Infosys', name: 'Ayush', email: 'ayush@example.com' },
  ]);

  const [volunteers] = useState([
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
  ]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const assignContact = (contactId,companyName) => {
    setSelectedContact(contactId);
    setModalVisible(true);
  };

  const handleVolunteerSelection = (volunteerId,volunteerName,companyName) => {
    console.log('Assigning contact with id:', selectedContact, 'to volunteer with id:', volunteerId);
    ToastAndroid.showWithGravity(
        `This company is assigned to volunteer ${volunteerName} `, 
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
    );
    setModalVisible(false);
    setSelectedContact(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactDetails}>
        <Text style={styles.companyName}>{item.company}</Text>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactEmail}>{item.email}</Text>
      </View>
      <TouchableOpacity 
        style={styles.assignButton}
        onPress={() => assignContact(item.id,item.company)}
      >
        <Text style={styles.assignButtonText}>Assign Member</Text>
      </TouchableOpacity>
    </View>
  );

  const renderVolunteerItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.volunteerItem}
      onPress={() => handleVolunteerSelection(item.id,item.name)}
    >
      <Text style={styles.volunteerName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.safeArea}>
        <Text style={styles.assignText}>
          Assign Contacts
        </Text>
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a Volunteer</Text>
          <FlatList
            data={volunteers}
            renderItem={renderVolunteerItem}
            keyExtractor={item => item.id}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Task;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#F0F5F5',
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    marginVertical: 5,
    fontSize: 14,
  },
  contactEmail: {
    fontSize: 14,
    color: 'gray',
  },
  assignText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
  },
  assignButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  assignButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  volunteerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  volunteerName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
