import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import wariningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'
import api from '../../services/api'

interface FormValues {
  name?: string;
  avatar?: string;
  whatsapp?: string;
  bio?: string;
  subject?: string;
}

const TeacherForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({})
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' }
  ])
  const history = useHistory()

  function addNewScheduleItem () {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: '', to: '' }
    ])
  }

  function handleChange (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const name = event.currentTarget.name
    const value = event.currentTarget.value
    setValues({
      ...values,
      [name]: value
    })
  }

  function handleChangeSchedule (position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    setScheduleItems(updatedScheduleItems)
  }

  async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await api.post('/classes', {
        ...values,
        schedule: scheduleItems
      })

      alert('Cadastro realizado com sucesso.')
      history.push('/')
    } catch (error) {
      alert('Erro ao realizar cadastro.')
    }
  }

  return (

    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input onChange={handleChange} name="name" label="Nome completo" />
            <Input onChange={handleChange} name="avatar" label="Avatar" />
            <Input onChange={handleChange} name="whatsapp" type='tel' label="WhatsApp" />
            <Textarea onChange={handleChange} name="bio" label="Biografia" />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              onChange={handleChange}
              name="subject"
              label="Matéria"
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
            <Input onChange={handleChange} type='number' name='cost' label='Custo da sua hora por aula' />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis
              <button type='button' onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {
              scheduleItems.map((scheduleItem, index) => {
                return (
                  <div key={index} className='schedule-item'>
                    <Select
                      onChange={(event: ChangeEvent<HTMLSelectElement>) => handleChangeSchedule(index, 'week_day', event.currentTarget.value)}
                      name="week_day"
                      label="Dia da semana"
                      value={scheduleItem.week_day}
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
                    <Input
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeSchedule(index, 'from', event.currentTarget.value)}
                      name='from'
                      label='Das'
                      type='time'
                    />
                    <Input
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeSchedule(index, 'to', event.currentTarget.value)}
                      name='to'
                      label='Até'
                      type='time'
                    />
                  </div>
                )
              })
            }
          </fieldset>

          <footer>
            <p>
              <img src={wariningIcon} alt="Aviso importante" />
              importante!
              {' '}
              <br />
              Preencha todos os dados
            </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>

      </main>
    </div>
  )
}

export default TeacherForm
