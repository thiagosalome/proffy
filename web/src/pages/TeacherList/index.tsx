/* eslint-disable camelcase */
import React, { useState, ChangeEvent, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'

import './styles.css'
import Select from '../../components/Select'
import api from '../../services/api'

interface FormValues {
  subject?: string;
  week_day?: string;
  time?: string;
}

const TeacherList: React.FC = () => {
  const [values, setValues] = useState<FormValues>({})
  const [teachers, setTeachers] = useState([])

  function handleChange (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const name = event.currentTarget.name
    const value = event.currentTarget.value
    setValues({
      ...values,
      [name]: value
    })
  }

  async function searchTeachers (event: FormEvent) {
    event.preventDefault()

    const response = await api.get('/classes', {
      params: {
        ...values
      }
    })

    setTeachers(response.data)
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            onChange={handleChange}
            value={values.subject}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Química', label: 'Química' }
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            onChange={handleChange}
            value={values.week_day}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' }
            ]}
          />
          <Input onChange={handleChange} type="time" name="time" label="Hora" />
          <button type='submit'>
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {
          teachers.map((teacher: Teacher) => (
            <TeacherItem key={teacher.id} teacher={teacher} />
          ))
        }
      </main>
    </div>
  )
}

export default TeacherList
