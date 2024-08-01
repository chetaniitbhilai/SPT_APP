// email.js (React Native)
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';

const Email = () => {
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');

  const templates = [
    { id: 'template1', text: 'Template 1: Welcome Mail' },
    { id: 'template2', text: 'Template 2: Follow-up Mail' },
    { id: 'template3', text: 'Template 3: Confirmation Mail' },
  ];

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch('http://192.168.1.4:5000/api/auth/email', {
          headers: {
            Authorization: `Bearer YOUR_AUTH_TOKEN`, // Replace with your actual token handling
          },
        });
        const data = await response.json();
        setEmail(data.email);
        setEmail2(data.email_2);
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchEmails();
  }, []);

  const sendEmail = async () => {
    let subject, body;
    switch (selectedTemplate) {
      case 'template1':
        subject = 'Welcome Mail';
        body = 'Welcome to our service!';
        break;
      case 'template2':
        subject = 'Follow-up Mail';
        body = 'Just following up on our previous conversation.';
        break;
      case 'template3':
        subject = 'Confirmation Mail';
        body = 'This is to confirm your recent transaction.';
        break;
      default:
        Alert.alert('Error', 'Invalid template ID');
        return;
    }

    try {
      const response = await fetch('http://192.168.1.36:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientEmail,
          subject,
          body,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Email sent successfully');
      } else {
        Alert.alert('Error', 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      Alert.alert('Error', 'An error occurred while sending email');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Send Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient's email"
          placeholderTextColor="gray"
          value={recipientEmail}
          onChangeText={setRecipientEmail}
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
        <Button title="Send Email" onPress={sendEmail} disabled={!recipientEmail || !selectedTemplate} />
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
