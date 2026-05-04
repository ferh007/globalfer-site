import { MessageCircle, Phone, Plus, Send, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { products } from '../data/products.js'
import styles from '../styles/Contact.module.css'

const maxProducts = 30
const apiUrl = import.meta.env.VITE_API_URL || ''
const createQuoteItem = () => ({
  id: crypto.randomUUID(),
  product: '',
  measurements: '',
})

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [quoteItems, setQuoteItems] = useState([createQuoteItem()])

  const updateQuoteItem = (id, field, value) => {
    setQuoteItems((items) =>
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    )
  }

  const addQuoteItem = () => {
    setQuoteItems((items) => {
      if (items.length >= maxProducts) {
        return items
      }

      return [...items, createQuoteItem()]
    })
  }

  const removeQuoteItem = (id) => {
    setQuoteItems((items) => {
      if (items.length === 1) {
        return items
      }

      return items.filter((item) => item.id !== id)
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(false)
    setError('')
    setIsSending(true)

    const formData = new FormData(event.currentTarget)
    const payload = {
      name: formData.get('nome'),
      phone: formData.get('telefone'),
      city: formData.get('cidade'),
      message: formData.get('mensagem'),
      items: quoteItems.map((item) => ({
        product: item.product,
        measurements: item.measurements,
      })),
    }

    try {
      const response = await fetch(`${apiUrl}/api/orcamento`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Não foi possível enviar a solicitação.')
      }

      setSubmitted(true)
      event.currentTarget.reset()
      setQuoteItems([createQuoteItem()])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section className={styles.section} id="contato">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Solicite seu orçamento</p>
          <h2>Envie as medidas da sua ferragem e fale com a equipe Globalfer</h2>
          <p>
            Adicione os produtos desejados, informe as medidas de cada item e envie sua solicitação para nossa equipe.
          </p>
          <div className={styles.contactCards}>
            <a href="https://wa.me/5514997094240">
              <MessageCircle size={24} />
              <span>Chamar no WhatsApp</span>
            </a>
            <div>
              <Phone size={24} />
              <span>(14) 99709-4240</span>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label>
              Nome
              <input type="text" name="nome" placeholder="Seu nome" required />
            </label>
            <label>
              Telefone / WhatsApp
              <input type="tel" name="telefone" placeholder="(00) 00000-0000" required />
            </label>
          </div>

          <label>
            Cidade
            <input type="text" name="cidade" placeholder="Sua cidade" required />
          </label>

          <div className={styles.productsHeader}>
            <div>
              <h3>Produtos do orçamento</h3>
              <p>{quoteItems.length} de {maxProducts} produtos adicionados</p>
            </div>
            <button
              className={styles.addButton}
              type="button"
              onClick={addQuoteItem}
              disabled={quoteItems.length >= maxProducts || isSending}
            >
              <Plus size={18} />
              Adicionar produto
            </button>
          </div>

          <div className={styles.quoteItems}>
            {quoteItems.map((item, index) => (
              <div className={styles.quoteItem} key={item.id}>
                <div className={styles.quoteItemHeader}>
                  <strong>Produto {index + 1}</strong>
                  <button
                    className={styles.removeButton}
                    type="button"
                    onClick={() => removeQuoteItem(item.id)}
                    disabled={quoteItems.length === 1 || isSending}
                    aria-label={`Remover produto ${index + 1}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <label>
                  Tipo de produto
                  <select
                    value={item.product}
                    onChange={(event) => updateQuoteItem(item.id, 'product', event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecione uma opção
                    </option>
                    {products.map((product) => (
                      <option key={product.name} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Medidas do produto
                  <textarea
                    rows="3"
                    value={item.measurements}
                    onChange={(event) => updateQuoteItem(item.id, 'measurements', event.target.value)}
                    placeholder="Informe medidas, quantidade, bitola, formato ou observações deste produto"
                    required
                  />
                </label>
              </div>
            ))}
          </div>

          <label>
            Mensagem
            <textarea name="mensagem" rows="4" placeholder="Conte como a Globalfer pode ajudar" />
          </label>

          <button type="submit" disabled={isSending}>
            {isSending ? 'Enviando solicitação...' : 'Enviar Solicitação'}
            <Send size={18} />
          </button>

          {error && <p className={styles.error}>{error}</p>}

          {submitted && (
            <p className={styles.success}>
              Obrigado! Sua solicitação foi enviada. A equipe Globalfer entrará em contato em breve.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
