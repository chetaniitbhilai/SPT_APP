import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Linking from 'react-native/Libraries/Linking/Linking';

const TaskVolunteer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [callRemark, setCallRemark] = useState('');
  const [mailRemark, setMailRemark] = useState('');
  const [inputCallRemark, setInputCallRemark] = useState('');
  const [inputMailRemark, setInputMailRemark] = useState('');
  const [showMailRemarkModal, setShowMailRemarkModal] = useState(false);
  const [selectedMailTemplate, setSelectedMailTemplate] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email,setEmail]= useState("");

  const callRemarks = ['Answered', 'Interested', 'Did not pick'];
  const mailRemarks = ['Reply received', 'Awaiting reply', 'No response'];

  const emailTemplates = {
    template1: {
      subject: 'Follow-up on our recent conversation',
      body: 'Dear [HR Name],\n\nI hope this email finds you well. I wanted to follow up on our recent conversation regarding volunteer opportunities at [Company Name].\n\nBest regards,',
    },
    template2: {
      subject: 'Volunteer Opportunities Inquiry',
      body: 'Hi [HR Name],\n\nI am reaching out to inquire about volunteer opportunities at [Company Name]. I believe our collaboration could be beneficial for both parties.\n\nThank you,',
    },
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const cookie = await AsyncStorage.getItem('cookie');
        const email = await AsyncStorage.getItem('email'); // Fetch the logged-in user's email
        setEmail(email || '');

        if (!cookie) {
          throw new Error('No cookie found');
        }

        const response = await fetch('http://192.168.1.4:5000/api/company/volunteer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'cookie': cookie, // Use the cookie directly if it's formatted correctly
          },
        });

        const data = await response.json();
        setCompanies(data);
        console.log(companies);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

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

  const handleNext = () => {
    if (currentIndex < companies.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetRemarks();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetRemarks();
    }
  };

  const resetRemarks = () => {
    setCallRemark('');
    setMailRemark('');
    setInputCallRemark('');
    setInputMailRemark('');
  };

  const handleSubmit = async () => {
    const currentCompany = companies[currentIndex];
    const dateTime = getCurrentDateTimeString();
    console.log(currentCompany);
    console.log(currentCompany._id);

    try {
      const result = await fetch(`http://192.168.1.4:5000/api/company/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId: currentCompany._id,
          callRemark,
          mailRemark,
          callTextRemark: inputCallRemark,
          emailTextRemark: inputMailRemark,
          status: 'Talked with',
          dateTime,
        }),
      });
      console.log(result);
      Alert.alert('Success', 'Company status updated');

      const updatedCompanies = companies.filter((_, index) => index !== currentIndex);
      setCompanies(updatedCompanies);

      if (updatedCompanies.length > 0) {
        setCurrentIndex(0);
        resetRemarks();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update company status');
    }
  };

  const handleMailNow = () => {
    setShowMailRemarkModal(true);
  };

  const handleCall = () => {
    const phoneNumber = currentCompany.hrPhone;
    Linking.openURL(`tel:${phoneNumber}`)
      .then(() => console.log('Calling', phoneNumber))
      .catch((error) => {
        console.error('Error opening phone dialer:', error);
        Alert.alert('Error', 'Failed to open phone dialer. Please try again later.');
      });
  };

  const handleSendMail = (template) => {
    setSelectedMailTemplate(template);
    const { subject, body } = emailTemplates[template];
    const currentCompany = companies[currentIndex];
    const hrName = currentCompany.hrName;
    const companyName = currentCompany.companyName;

    const emailBody = body
      .replace('[HR Name]', hrName)
      .replace('[Company Name]', companyName)
      ; // Replace 'Your Name' with actual user name if available

    const mailtoUrl = `mailto:${currentCompany.hrEmail}?cc=${email}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    Linking.openURL(mailtoUrl)
      .then(() => {
        setShowMailRemarkModal(false);
      })
      .catch((error) => {
        console.error('Error opening email client:', error);
        Alert.alert('Error', 'Failed to open email client. Please try again later.');
      });


    // if (Platform.OS === 'android') {
    //   ToastAndroid.showWithGravity(
    //     `Selected template is of ${template}`,
    //     ToastAndroid.SHORT,
    //     ToastAndroid.BOTTOM,
    //   );
    // } else {
    //   Alert.alert('Mail Template Selected', `Selected template is of ${template}`);
    // }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (companies.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>No current companies assigned to you, take a short break.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentCompany = companies[currentIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.companyName}>{currentCompany.companyName}</Text>
          <Text style={styles.companyInfo}>HR Name: {currentCompany.hrName}</Text>
          <Text style={styles.companyInfo}>Phone: {currentCompany.hrPhone}</Text>
          <Text style={styles.companyInfo}>Email: {currentCompany.hrEmail}</Text>

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
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
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
          <TouchableOpacity
            style={[styles.button, currentIndex === 0 && styles.disabledButton]}
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          >
            <Text style={[styles.buttonText, currentIndex === 0 && styles.disabledText]}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, currentIndex === companies.length - 1 && styles.disabledButton]}
            onPress={handleNext}
            disabled={currentIndex === companies.length - 1}
          >
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
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select a Mail Template</Text>
              <Picker
                selectedValue={selectedMailTemplate}
                style={styles.picker}
                onValueChange={(itemValue) => handleSendMail(itemValue)}
              >
                <Picker.Item label="Select a template" value="" />
                {Object.keys(emailTemplates).map((templateKey) => (
                  <Picker.Item key={templateKey} label={templateKey} value={templateKey} />
                ))}
              </Picker>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowMailRemarkModal(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  companyInfo: {
    fontSize: 16,
    marginVertical: 4,
  },
  label: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  disabledText: {
    color: '#666666',
  },
  submitButtonContainer: {
    padding: 16,
  },
  submitButton: {
    backgroundColor: '#28A745',
    padding: 16,
    borderRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TaskVolunteer;










// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Modal,
//   ToastAndroid,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Linking from 'react-native/Libraries/Linking/Linking';

// const TaskVolunteer = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [callRemark, setCallRemark] = useState('');
//   const [mailRemark, setMailRemark] = useState('');
//   const [inputCallRemark, setInputCallRemark] = useState('');
//   const [inputMailRemark, setInputMailRemark] = useState('');
//   const [showMailRemarkModal, setShowMailRemarkModal] = useState(false);
//   const [selectedMailTemplate, setSelectedMailTemplate] = useState('');
//   const [companies, setCompanies] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [companyId,setCompanyId]= useState('');

//   const callRemarks = ['Answered', 'Interested', 'Did not pick'];
//   const mailRemarks = ['Reply received', 'Awaiting reply', 'No response'];

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const cookie = await AsyncStorage.getItem('cookie');
//         if (!cookie) {
//           throw new Error('No cookie found');
//         }

//         const response = await fetch('http://192.168.1.4:5000/api/company/volunteer',{
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'cookie': cookie, // Use the cookie directly if it's formatted correctly
//           },
//         });

//         const data = await response.json();
//         setCompanies(data);
//         console.log(companies);
//       } catch (error) {
//         Alert.alert('Error', 'Failed to fetch companies');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, []);

//   const getCurrentDateTimeString = () => {
//     const now = new Date();

//     const date = now.getDate().toString().padStart(2, '0');
//     const month = (now.getMonth() + 1).toString().padStart(2, '0');
//     const year = now.getFullYear();
//     const hours = now.getHours().toString().padStart(2, '0');
//     const minutes = now.getMinutes().toString().padStart(2, '0');
//     const seconds = now.getSeconds().toString().padStart(2, '0');

//     const formattedDate = `${month}/${date}/${year}`;
//     const formattedTime = `${hours}:${minutes}:${seconds}`;

//     return `${formattedDate} ${formattedTime}`;
//   };

//   const handleNext = () => {
//     if (currentIndex < companies.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//       resetRemarks();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//       resetRemarks();
//     }
//   };

//   const resetRemarks = () => {
//     setCallRemark('');
//     setMailRemark('');
//     setInputCallRemark('');
//     setInputMailRemark('');
//   };

//   const handleSubmit = async () => {
//     const currentCompany = companies[currentIndex];
//     const dateTime = getCurrentDateTimeString();
//     console.log(currentCompany);
//     console.log(currentCompany._id);
//     setCompanyId(currentCompany._id);
//     try {
//       const result = await fetch(`http://192.168.1.4:5000/api/company/update`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           companyId,
//           callRemark,
//           mailRemark,
//           callTextRemark: inputCallRemark,
//           emailTextRemark: inputMailRemark,
//           status: 'Talked with',
//           dateTime,
//         }),
//       });
//       console.log(result);
//       Alert.alert('Success', 'Company status updated');

//       const updatedCompanies = companies.filter((_, index) => index !== currentIndex);
//       setCompanies(updatedCompanies);

//       if (updatedCompanies.length > 0) {
//         setCurrentIndex(0);
//         resetRemarks();
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update company status');
//     }
//   };

//   const handleMailNow = () => {
//     setShowMailRemarkModal(true);
//   };

//   const handleCall = () => {
//     const phoneNumber = currentCompany.hrPhone;
//     Linking.openURL(`tel:${phoneNumber}`)
//       .then(() => console.log('Calling', phoneNumber))
//       .catch((error) => {
//         console.error('Error opening phone dialer:', error);
//         Alert.alert('Error', 'Failed to open phone dialer. Please try again later.');
//       });
//   };

//   const handleSendMail = (template) => {
//     setSelectedMailTemplate(template);
//     if (Platform.OS === 'android') {
//       ToastAndroid.showWithGravity(
//         `Selected template is of ${template}`,
//         ToastAndroid.SHORT,
//         ToastAndroid.BOTTOM,
//       );
//     } else {
//       Alert.alert('Mail Template Selected', `Selected template is of ${template}`);
//     }
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.container}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (companies.length === 0) {
//     return (
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.container}>
//           <Text>No current companies assigned to you, take a short break.</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const currentCompany = companies[currentIndex];

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <View style={styles.card}>
//           <Text style={styles.companyName}>{currentCompany.companyName}</Text>
//           <Text style={styles.companyInfo}>HR Name: {currentCompany.hrName}</Text>
//           <Text style={styles.companyInfo}>Phone: {currentCompany.hrPhone}</Text>
//           <Text style={styles.companyInfo}>Email: {currentCompany.hrEmail}</Text>

//           <Text style={styles.label}>Call Remarks:</Text>
//           <Picker
//             selectedValue={callRemark}
//             style={styles.picker}
//             onValueChange={(itemValue) => setCallRemark(itemValue)}
//           >
//             <Picker.Item label="Select a call remark" value="" />
//             {callRemarks.map((remark, index) => (
//               <Picker.Item key={index} label={remark} value={remark} />
//             ))}
//           </Picker>

//           <Text style={styles.label}>Or Enter Call Remark:</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter call remark"
//             value={inputCallRemark}
//             onChangeText={(text) => setInputCallRemark(text)}
//           />

//           <View style={styles.actionContainer}>
//             <TouchableOpacity style={styles.actionButton} onPress={handleMailNow}>
//               <Text style={styles.actionButtonText}>Mail Now</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
//               <Text style={styles.actionButtonText}>Call Now</Text>
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.label}>Mail Remarks:</Text>
//           <Picker
//             selectedValue={mailRemark}
//             style={styles.picker}
//             onValueChange={(itemValue) => setMailRemark(itemValue)}
//           >
//             <Picker.Item label="Select a mail remark" value="" />
//             {mailRemarks.map((remark, index) => (
//               <Picker.Item key={index} label={remark} value={remark} />
//             ))}
//           </Picker>

//           <Text style={styles.label}>Or Enter Mail Remark:</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter mail remark"
//             value={inputMailRemark}
//             onChangeText={(text) => setInputMailRemark(text)}
//           />
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={[styles.button, currentIndex === 0 && styles.disabledButton]}
//             onPress={handlePrevious}
//             disabled={currentIndex === 0}
//           >
//             <Text style={[styles.buttonText, currentIndex === 0 && styles.disabledText]}>Previous</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, currentIndex === companies.length - 1 && styles.disabledButton]}
//             onPress={handleNext}
//             disabled={currentIndex === companies.length - 1}
//           >
//             <Text style={[styles.buttonText, currentIndex === companies.length - 1 && styles.disabledText]}>Next</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {showMailRemarkModal && (
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={showMailRemarkModal}
//           onRequestClose={() => setShowMailRemarkModal(false)}
//         >
//           <View style={styles.modalBackground}>
//             <View style={styles.mailModal}>
//               <Text style={styles.label}>Select Mail Template:</Text>
//               <ScrollView>
//                 <TouchableOpacity style={styles.mailTemplate} onPress={() => handleSendMail('Welcome Mail')}>
//                   <Text>Welcome Mail</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.mailTemplate} onPress={() => handleSendMail('Follow Up Mail')}>
//                   <Text>Follow Up Mail</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.mailTemplate} onPress={() => handleSendMail('Confirmation Mail')}>
//                   <Text>Confirmation Mail</Text>
//                 </TouchableOpacity>
//               </ScrollView>
//               <TouchableOpacity style={styles.sendButton} onPress={() => setShowMailRemarkModal(false)}>
//                 <Text style={styles.sendButtonText}>Send</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>
//       )}

//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default TaskVolunteer;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     flex: 1,
//     width: '90%',
//     padding: 20,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     backgroundColor: '#F0F5F5',
//     justifyContent: 'center',
//   },
//   companyName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   companyInfo: {
//     fontSize: 18,
//     marginBottom: 5,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginBottom: 5,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     width: '100%',
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   actionButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//     alignItems: 'center',
//     width: '48%',
//   },
//   actionButtonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   mailModal: {
//     width: '80%',
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   mailTemplate: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   sendButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: 10,
//     alignItems: 'center',
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   sendButtonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '90%',
//     marginTop: 20,
//   },
//   button: {
//     padding: 10,
//     backgroundColor: '#007bff',
//     borderRadius: 5,
//     width: '45%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   disabledButton: {
//     backgroundColor: '#AAAAAA',
//   },
//   disabledText: {
//     color: '#DDDDDD',
//   },
//   submitButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
// });
