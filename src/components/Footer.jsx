import { FacebookIcon, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import styles from '../styles/Footer.module.css'

const links = [
  { label: 'Início', href: '#inicio' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <a href="#inicio" className={styles.logo}>
            Globalfer
          </a>
          <p>Ferragem armada para construção civil</p>
        </div>

        <div>
          <h3>Links</h3>
          <nav className={styles.links}>
            {links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h3>Contato</h3>
          <ul className={styles.contactList}>
            <li>
              <Phone size={18} />
              (14) 99709-4240
            </li>
            <li>
              <Phone size={18} />
              (14) 3415-1049
            </li>
            <li>
              <Mail size={18} />
              globalfer_marilia@yahoo.com.br
            </li>
            <li>
              <MapPin size={18} />
              Avenida Sampaio Vidal, 45, Marília, SP, Brazil
            </li>
          </ul>
        </div>

        <div>
          <h3>Atendimento</h3>
          <div className={styles.socials}>
            <a href="https://wa.me/5514997094240">
              <MessageCircle size={19} />
              WhatsApp
            </a>
            <a href="https://www.facebook.com/ferragistaglobalfer/?locale=pt_BR">
              <FacebookIcon size={19} />
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Globalfer. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}

export default Footer
