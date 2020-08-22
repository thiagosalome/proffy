import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import './styles.css'

const TeacherItem: React.FC = () => {
  return (
    <article className='teacher-item'>
      <header>
        <img src='https://s3.amazonaws.com/uifaces/faces/twitter/chris_frees/128.jpg' alt='Perfil' />
        <div>
          <strong>Thiago Salomé</strong>
          <span>Química</span>
        </div>
      </header>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        <br/><br/>
        Officia, tempora fuga deleniti ut porro aspernatur odio optio animi quibusdam minima quis quas veniam illo distinctio.
      </p>
      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type='button'>
          <img src={whatsappIcon} alt='WHatsapp'/>
          Entrar em contato
        </button>
      </footer>
    </article>
  )
}

export default TeacherItem;