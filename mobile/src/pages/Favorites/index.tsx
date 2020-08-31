import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import PageHeader from '../../components/PageHeader';
import TearcherItem, { Teacher } from '../TearcherItem';


import styles from './style';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([])

  async function loadFavorites() {
    const response = await AsyncStorage.getItem('favorites')
    if(response) {
      const favoritedTeachers = JSON.parse(response)
      setFavorites(favoritedTeachers)
    }
  }

  useFocusEffect(() => {
    loadFavorites()
  })

  return (
    <View style={styles.container}>
      <PageHeader title='Meus proffys favoritos' />

      <FlatList
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
        data={favorites}
        renderItem={({ item }) => <TearcherItem teacher={item} favorited />}
        keyExtractor={(item: Teacher) => String(item.id)}
      />
    </View>
  );
}

export default Favorites;