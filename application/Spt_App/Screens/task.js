import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ToastAndroid, Alert } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Task = () => {
  const [contacts, setContacts] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const cookie = await AsyncStorage.getItem('cookie');
        if (!cookie) {
          throw new Error('No cookie found');
        }

        const response = await fetch('http://192.168.1.4:5000/api/company/coordinator', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'cookie': cookie,
          },
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setContacts(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    const fetchVolunteers = async () => {
      try {
        const cookie = await AsyncStorage.getItem('cookie');
        if (!cookie) {
          throw new Error('No cookie found');
        }

        const response = await fetch('http://192.168.1.4:5000/api/auth/volunteer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'cookie': cookie,
          },
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setVolunteers(data.volunteers);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchContacts();
    fetchVolunteers();
  }, []);

  const assignContact = (contactId, companyName) => {
    setSelectedContact(contactId);
    setModalVisible(true);
  };

  const getCurrentDateTimeString = () => {
    const now = new Date();

    const date = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${month}/${date}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const handleVolunteerSelection = async (volunteerId, volunteerName) => {
    try {
      const cookie = await AsyncStorage.getItem('cookie');
      if (!cookie) {
        throw new Error('No cookie found');
      }
      const dateTime = getCurrentDateTimeString();

      const response = await fetch(`http://192.168.1.4:5000/api/company/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'cookie': cookie,
        },
        body: JSON.stringify({ 
          volunteerName,
          selectedContact,
          status:'assigned',
          dateTime
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setContacts(prevContacts =>
        prevContacts.filter(contact => contact._id !== selectedContact)
      );

      ToastAndroid.showWithGravity(
        `This company is assigned to volunteer ${volunteerName}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );

      setModalVisible(false);
      setSelectedContact(null);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactDetails}>
        <Text style={styles.companyName}>{item.companyName}</Text>
        <Text style={styles.contactName}>{item.hrName}</Text>
        <Text style={styles.contactEmail}>{item.hrEmail}</Text>
      </View>
      <TouchableOpacity
        style={styles.assignButton}
        onPress={() => assignContact(item._id, item.companyName)}
      >
        <Text style={styles.assignButtonText}>Assign Member</Text>
      </TouchableOpacity>
    </View>
  );

  const renderVolunteerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.volunteerItem}
      onPress={() => handleVolunteerSelection(item._id, item.name)}
    >
      <Text style={styles.volunteerName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <View style={styles.safeArea}>
        <Text style={styles.assignText}>Assign Contacts</Text>
        {contacts.length === 0 ? (
          <Text style={styles.noContactsMessage}>Take a break. No contacts to assign.</Text>
        ) : (
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a Volunteer</Text>
          <FlatList
            data={volunteers}
            renderItem={renderVolunteerItem}
            keyExtractor={item => item._id}
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
  noContactsMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
  },
});
