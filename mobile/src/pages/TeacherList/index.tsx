import React from 'react';
import { View } from 'react-native';
import PageHeader from '../../components/PageHeader';

import styles from './style';

const TeacherList: React.FC = () => {
  return (
    <View style={styles.container}>
      <PageHeader title='Proffys disponíveis' />
    </View>
  );
}

export default TeacherList;