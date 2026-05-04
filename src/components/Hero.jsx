import { ArrowRight, CheckCircle2 } from 'lucide-react'
import styles from '../styles/Hero.module.css'

const companyImage = `${import.meta.env.BASE_URL}assets/globalfer-capa.jpg`

function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Ferragem armada para construção civil</p>
          <h1>Ferragem Armada Sob Medida para sua Obra</h1>
          <p className={styles.subtitle}>
            Soluções em aço para fundações, colunas, vigas, lajes e estruturas de concreto.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryButton} href="#contato">
              Solicitar Orçamento
              <ArrowRight size={20} />
            </a>
            <a className={styles.secondaryButton} href="#produtos">
              Ver Produtos
            </a>
          </div>
          <div className={styles.trustBar}>
            <span>
              <CheckCircle2 size={18} />
              Medidas sob encomenda
            </span>
            <span>
              <CheckCircle2 size={18} />
              Atendimento direto
            </span>
            <span>
              <CheckCircle2 size={18} />
              Produção organizada
            </span>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.companyPhoto}>
            <img src={companyImage} alt="Fachada da Globalfer com ferragens armadas sob medida" />
          </div>
          <div className={styles.visualPanel}>
            <strong>Aço preparado</strong>
            <small>para obras mais práticas</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
