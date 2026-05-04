import { CheckCircle2, MessageCircle, ShieldCheck, Timer, TrendingDown, Users } from 'lucide-react'
import styles from '../styles/WhyChooseUs.module.css'

const values = [
  { title: 'Medidas sob encomenda', icon: CheckCircle2 },
  { title: 'Agilidade no atendimento', icon: Timer },
  { title: 'Qualidade na montagem', icon: ShieldCheck },
  { title: 'Redução de desperdício na obra', icon: TrendingDown },
  { title: 'Praticidade para pedreiros, engenheiros e construtoras', icon: Users },
  { title: 'Atendimento direto e fácil pelo WhatsApp', icon: MessageCircle },
]

function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Por que escolher a Globalfer</p>
          <h2>Ferragem organizada, atendimento claro e mais praticidade para sua obra</h2>
          <p>
            Trabalhamos para entregar peças preparadas com atenção às medidas, qualidade na montagem e compromisso com a rotina de quem constrói.
          </p>
        </div>

        <div className={styles.list}>
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div className={styles.item} key={value.title}>
                <Icon size={22} />
                <span>{value.title}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
