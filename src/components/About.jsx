import { Building2, ShieldCheck } from 'lucide-react'
import styles from '../styles/About.module.css'

const companyImage = `${import.meta.env.BASE_URL}assets/globalfer-capa.jpg`

function About() {
  return (
    <section className={styles.section} id="sobre">
      <div className={styles.container}>
        <div className={styles.imageBlock}>
          <img src={companyImage} alt="Globalfer ferragens armadas sob medida" />
          <div className={styles.badge}>
            <ShieldCheck size={26} />
            <span>Compromisso com a obra</span>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Sobre a Globalfer</p>
          <h2>Uma fornecedora preparada para simplificar o trabalho no canteiro</h2>
          <p>
            A Globalfer atua no fornecimento de ferragem armada para construção civil, oferecendo soluções práticas e sob medida para obras de diferentes portes. Nosso objetivo é facilitar o trabalho no canteiro, entregando peças preparadas com qualidade, organização e compromisso.
          </p>
          <div className={styles.metrics}>
            <div>
              <Building2 size={24} />
              <strong>Obras de diferentes portes</strong>
              <span>Atendimento para clientes residenciais, engenheiros, pedreiros e construtoras.</span>
            </div>
            <div>
              <ShieldCheck size={24} />
              <strong>Processo organizado</strong>
              <span>Pedidos tratados com clareza para apoiar o planejamento da construção.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
