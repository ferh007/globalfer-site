import { services } from '../data/services.js'
import styles from '../styles/Services.module.css'

function Services() {
  return (
    <section className={styles.section} id="servicos">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Serviços</p>
          <h2>Atendimento completo para quem precisa de aço preparado</h2>
          <p>
            Da medida ao pedido final, a Globalfer ajuda a organizar a ferragem para obras residenciais, comerciais e estruturais.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article className={styles.card} key={service.title}>
                <div className={styles.iconBox}>
                  <Icon size={28} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Services
