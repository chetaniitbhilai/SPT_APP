// src/SendEmail.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const Email = () => {
  const [email, setEmail] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templates = [
    { id: 'template1', text: 'Template 1: Welcome Mail' },
    { id: 'template2', text: 'Template 2: Follw up Mail' },
    { id: 'template3', text: 'Template 3: Confirmation Mail' },
  ];

  const sendEmail = () => {
    // Logic for sending email using the selected template
    console.log('Sending email to:', email);
    console.log('Selected template:', selectedTemplate);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Send Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient's email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={styles.templateContainer}>
          <Text style={styles.templateTitle}>Select Email Template:</Text>
          {templates.map(template => (
            <TouchableOpacity
              key={template.id}
              style={styles.templateOption}
              onPress={() => setSelectedTemplate(template.id)}
            >
              <View style={styles.radioCircle}>
                {selectedTemplate === template.id && <View style={styles.selectedRb} />}
              </View>
              <Text style={styles.templateText}>{template.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button title="Send Email" onPress={sendEmail} disabled={!email || !selectedTemplate} />
      </View>
    </SafeAreaView>
  );
};

export default Email;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 20,
    backgroundColor: '#F0F5F5',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
  },
  templateContainer: {
    marginBottom: 20,
  },
  templateTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  templateOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  templateText: {
    fontSize: 16,
  },
});
