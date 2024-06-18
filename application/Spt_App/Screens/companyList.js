import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

export default class CList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['S. No.', 'Company Name', 'HR Name', 'HR Number', 'HR Email'],
      tableData: [
        ['1', 'HR John', 'HR Jo', '1234567890', 'john@example.com'],
        ['2', 'Company B', 'HR Jane', '0987654321', 'jane@example.com'],
        ['3', 'HR Jack', 'HR Jim', '5678901234', 'jack@example.com'],
        ['4', 'Company D', 'HR Jill', '4321098765', 'jill@example.com'],
        ['5', 'HR Jake', 'HR Jess', '9876543210', 'jake@example.com'],
        ['6','','','',''],
        ['7','','','',''],
        ['8','','','',''],
      ]
    }
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CSE Liasioning</Text>
        <Table borderStyle={{ borderWidth: 1, borderRadius: 10 }}>
          <Row data={state.tableHead} flexArr={[0.5, 1.5, 1.2, 1.2, 1.5]} style={styles.head} textStyle={styles.text1} />
          <TableWrapper style={styles.wrapper}>
            <Rows data={state.tableData} flexArr={[0.5, 1.5, 1.2, 1.2, 1.5]} style={styles.row} textStyle={styles.text2} />
          </TableWrapper>
        </Table>
      </View>
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
