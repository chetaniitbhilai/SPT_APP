import React, { Component } from 'react';
import { StyleSheet, View, Text ,Alert, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
const IP_ADDRESS='192.168.97.10';

export default class CList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['S. No.', 'Company Name', 'HR Name', 'HR Number', 'HR Email'],
      tableData: []
    };
    this.intervalId = null;
  }

  componentDidMount() {
    this.fetchHRData();
    this.intervalId = setInterval(this.fetchHRData, 1000); // Fetch data every 1 seconds
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); // Clear interval on component unmount
  }

  fetchHRData = async () => {
    try {
      const response = await fetch(`http://${IP_ADDRESS}:5000/api/getcdb`); // Replace with your computer IP
      const hrData = await response.json();

      // Format the data as needed for the table
      const formattedData = hrData.map((hr, index) => [
        (index + 1).toString(), // S. No.
        hr.HRcompany,
        hr.HRname,
        hr.HRphone,
        hr.HRemail
      ]);

      this.setState({ tableData: formattedData });
    } catch (error) {
      console.error('Error fetching HR data: ', error);
    }
  }


  render() {
    const state = this.state;
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>CSE Liasioning</Text>
        <Table borderStyle={{ borderWidth: 1, borderRadius: 10 }}>
          <Row data={state.tableHead} flexArr={[0.5, 1.5, 1.2, 1.2, 1.5]} style={styles.head} textStyle={styles.text1} />
          <TableWrapper style={styles.wrapper}>
            <Rows data={state.tableData} flexArr={[0.5, 1.5, 1.2, 1.2, 1.5]} style={styles.row} textStyle={styles.text2} />
          </TableWrapper>
        </Table>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold',padding:5 },
  head: { height: 50, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  row: { height: 50, borderBottomWidth: 1, borderColor: '#f1f8ff' },
  text1: { textAlign: 'center', fontWeight: 'bold', margin: 6 },
  text2: { textAlign: 'center', margin: 6 }
});
