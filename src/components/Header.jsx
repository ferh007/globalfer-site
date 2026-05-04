import { Menu, Phone, X } from 'lucide-react'
import { useState } from 'react'
import styles from '../styles/Header.module.css'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a className={styles.logo} href="#inicio" onClick={closeMenu}>
          <span className={styles.logoMark}>G</span>
          <span>Globalfer</span>
        </a>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a className={styles.mobileCta} href="#contato" onClick={closeMenu}>
            Solicitar orçamento
          </a>
        </nav>

        <a className={styles.headerCta} href="https://wa.me/5514997094240">
          <Phone size={18} />
          WhatsApp
        </a>

        <button
          className={styles.menuButton}
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header
