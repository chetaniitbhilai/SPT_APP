// src/CompanyCarousel.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Modal, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CompanyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [callRemark, setCallRemark] = useState('');
  const [mailRemark, setMailRemark] = useState('');
  const [inputCallRemark, setInputCallRemark] = useState('');
  const [inputMailRemark, setInputMailRemark] = useState('');
  const [showMailRemarkModal, setShowMailRemarkModal] = useState(false);
  const [selectedMailTemplate, setSelectedMailTemplate] = useState('');

  const companies = [
    { id: '1', name: 'Google', hrname: 'Ayush', phone: '123-456-7890', email: 'contact@google.com' },
    { id: '2', name: 'Apple', hrname: 'Bhoomi', phone: '987-654-3210', email: 'contact@apple.com' },
    { id: '3', name: 'Microsoft', hrname: 'Anand', phone: '555-123-4567', email: 'contact@microsoft.com' },
    { id: '4', name: 'Amazon', hrname: 'Chetan', phone: '444-555-6666', email: 'contact@amazon.com' },
    { id: '5', name: 'Facebook', hrname: 'XYZ', phone: '777-888-9999', email: 'contact@facebook.com' },
  ];

  const callRemarks = ['Answered', 'Interested', 'Did not pick'];
  const mailRemarks = ['Reply received', 'Awaiting reply', 'No response'];

  const handleNext = () => {
    if (currentIndex < companies.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCallRemark('');
      setMailRemark('');
      setInputCallRemark('');
      setInputMailRemark('');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCallRemark('');
      setMailRemark('');
      setInputCallRemark('');
      setInputMailRemark('');
    }
  };

  const handleSubmit = () => {
    console.log('Call Remark:', callRemark || inputCallRemark);
    console.log('Mail Remark:', mailRemark || inputMailRemark);
  };

  const handleMailNow = () => {
    setShowMailRemarkModal(true);
  };

  const handleSendMail = (template) => {
    setSelectedMailTemplate(template);
    console.log(template);
    ToastAndroid.showWithGravity(
        `Selected template is of ${template}`, 
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
    );
    // setShowMailRemarkModal(false); // Close the mail remark modal after selecting and sending
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.companyName}>{companies[currentIndex].name}</Text>
          <Text style={styles.companyInfo}>HR Name: {companies[currentIndex].hrname}</Text>
          <Text style={styles.companyInfo}>Phone: {companies[currentIndex].phone}</Text>
          <Text style={styles.companyInfo}>Email: {companies[currentIndex].email}</Text>

          <Text style={styles.label}>Call Remarks:</Text>
          <Picker
            selectedValue={callRemark}
            style={styles.picker}
            onValueChange={(itemValue) => setCallRemark(itemValue)}
          >
            <Picker.Item label="Select a call remark" value="" />
            {callRemarks.map((remark, index) => (
              <Picker.Item key={index} label={remark} value={remark} />
            ))}
          </Picker>

          <Text style={styles.label}>Or Enter Call Remark:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter call remark"
            value={inputCallRemark}
            onChangeText={(text) => setInputCallRemark(text)}
          />

          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleMailNow}>
              <Text style={styles.actionButtonText}>Mail Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Calling now...')}>
              <Text style={styles.actionButtonText}>Call Now</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Mail Remarks:</Text>
          <Picker
            selectedValue={mailRemark}
            style={styles.picker}
            onValueChange={(itemValue) => setMailRemark(itemValue)}
          >
            <Picker.Item label="Select a mail remark" value="" />
            {mailRemarks.map((remark, index) => (
              <Picker.Item key={index} label={remark} value={remark} />
            ))}
          </Picker>

          <Text style={styles.label}>Or Enter Mail Remark:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mail remark"
            value={inputMailRemark}
            onChangeText={(text) => setInputMailRemark(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePrevious} disabled={currentIndex === 0}>
            <Text style={[styles.buttonText, currentIndex === 0 && styles.disabledText]}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext} disabled={currentIndex === companies.length - 1}>
            <Text style={[styles.buttonText, currentIndex === companies.length - 1 && styles.disabledText]}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showMailRemarkModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showMailRemarkModal}
          onRequestClose={() => setShowMailRemarkModal(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.mailModal}>
              <Text style={styles.label}>Select Mail Template:</Text>
              <ScrollView>
                <TouchableOpacity style={styles.mailTemplate} onPress={() => handleSendMail('Welcome Mail')}>
                  <Text>Welcome Mail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mailTemplate} onPress={() => handleSendMail('Follow Up Mail')}>
                  <Text>Follow Up Mail</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mailTemplate} onPress={() => handleSendMail('Comformation Mail')}>
                  <Text>Comformation Mail</Text>
                </TouchableOpacity>
              </ScrollView>
              <TouchableOpacity style={styles.sendButton} onPress={() => setShowMailRemarkModal(false)}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CompanyCarousel;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    width: '90%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#F0F5F5',
    justifyContent: 'center',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  companyInfo: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    width: '48%', // Adjust width as needed
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mailModal: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mailTemplate: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  sendButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#AAAAAA',
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
