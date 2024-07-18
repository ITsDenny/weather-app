import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WeatherDetail = ({ icon, label, value }) => {
  return (
    <SafeAreaView style={styles.detailContainer}>
      <Icon name={icon} size={24} color="#666" />
      <Text style={styles.detailText}>{label}: {value}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  detailText: {
    fontSize: 20,
    color: '#666',
    marginLeft: 10,
  },
});

export default WeatherDetail;
