import { ArrowUpRight } from 'lucide-react'
import { products } from '../data/products.js'
import styles from '../styles/Products.module.css'

const getAssetUrl = (path) => `${import.meta.env.BASE_URL}${path}`

function Products() {
  return (
    <section className={styles.section} id="produtos">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Produtos</p>
          <h2>Ferragens prontas para diferentes etapas da construção</h2>
          <p>
            Produção sob medida para facilitar a montagem no canteiro, reduzir perdas e manter a obra em movimento.
          </p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <article className={styles.card} key={product.name}>
              <div className={styles.imageWrap}>
                {product.image ? (
                  <img src={getAssetUrl(product.image)} alt={product.name} />
                ) : (
                  <span className={styles.imagePlaceholder} />
                )}
              </div>
              <div className={styles.cardTop}>
                <span className={styles.productIcon} />
                <h3>{product.name}</h3>
              </div>
              <p>{product.description}</p>
              <div className={styles.usage}>
                <strong>Uso comum:</strong>
                <span>{product.usage}</span>
              </div>
              <a href="#contato" className={styles.cardButton}>
                Solicitar orçamento
                <ArrowUpRight size={18} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
