import { useContent } from '../context/ContentProvider'
import SectionHeading from './SectionHeading'
import './Contact.css'

export default function ContactsInfo() {
  const { content } = useContent()
  const section = content.settings.sections?.contacts
  const contacts = content.settings.contacts

  return (
    <section className="section contacts-info" id="contacts">
      <div className="container">
        <SectionHeading
          label={section?.label}
          title={section?.title}
          subtitle={section?.subtitle}
          center
        />
        <ul className="contacts-info__grid">
          <li>
            <strong>Телефон</strong>
            <a href={`tel:${contacts.phone_raw}`}>{contacts.phone}</a>
          </li>
          <li>
            <strong>Email</strong>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
          </li>
          <li>
            <strong>Офис</strong>
            <span>{contacts.address}</span>
          </li>
          <li>
            <strong>Режим работы</strong>
            <span>{contacts.hours}</span>
          </li>
          <li>
            <strong>Telegram</strong>
            <a href={contacts.telegram} target="_blank" rel="noopener noreferrer">
              Написать в Telegram
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
