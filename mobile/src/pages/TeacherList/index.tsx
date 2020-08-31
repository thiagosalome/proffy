import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { Picker } from '@react-native-community/picker'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import PageHeader from '../../components/PageHeader';
import TearcherItem, { Teacher } from '../TearcherItem';

import api from '../../services/api'

import styles from './style';

interface FormValues {
  subject?: string;
  week_day?: string;
  time?: string;
}

const TeacherList: React.FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(true)
  const [favorites, setFavorites] = useState<number[]>([])
  const [values, setValues] = useState<FormValues>({})
  const [teachers, setTeachers] = useState([])

  function toggleFilter() {
    setFiltersVisible(!filtersVisible)
  }

  function handleChange (name: string, value: string) {
    setValues({
      ...values,
      [name]: value
    })
  }

  async function loadFavorites() {
    const response = await AsyncStorage.getItem('favorites')
    if(response) {
      const favoritedTeachers = JSON.parse(response)
      const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id)
      setFavorites(favoritedTeachersIds)
    }
  }

  async function searchTeachers() {
    loadFavorites()
  
    const response = await api.get('/classes', {
      params: {
        ...values
      }
    })

    setFiltersVisible(false)
    setTeachers(response.data)
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title='Proffys disponíveis'
        headerRight={(
          <BorderlessButton onPress={toggleFilter}>
            <Feather name='filter' size={20} color='#fff' />
          </BorderlessButton>
        )}
      >
        {
          filtersVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>
                Matéria
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={(text: string) => handleChange('subject', text)}
                placeholder='Qual a matéria?'
                placeholderTextColor='#c1bccc'
                autoFocus={true}
                value={values.subject}
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker
                      style={styles.picker}
                      onValueChange={(itemValue: string, itemIndex: number) => handleChange('week_day', itemValue)}
                      selectedValue={values.week_day}
                    >
                      <Picker.Item label='Domingo' value='0' />
                      <Picker.Item label='Segunda-feira' value='1' />
                      <Picker.Item label='Terça-feira' value='2' />
                      <Picker.Item label='Quarta-feira' value='3' />
                      <Picker.Item label='Quinta-feira' value='4' />
                      <Picker.Item label='Sexta-feira' value='5' />
                      <Picker.Item label='Sábado' value='6' />
                    </Picker>
                  </View>
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Qual Horário</Text>
                  <TextInput
                    style={styles.input}
                    value={values.time}
                    onChangeText={(text: string) => handleChange('time', text)}
                    placeholder='Qual horário?'
                    placeholderTextColor='#c1bccc'
                  />
                </View>
              </View>

              <RectButton onPress={searchTeachers} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>
                  Filtrar
                </Text>
              </RectButton>
            </View>
          )
        }
      </PageHeader>

      <FlatList
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
        data={teachers}
        renderItem={({ item }) => <TearcherItem teacher={item} favorited={favorites.includes(item.id)} />}
        keyExtractor={(item: Teacher) => String(item.id)}
      />
    </View>
  );
}

export default TeacherList;