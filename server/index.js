import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = Number(process.env.PORT || 3001)
const quoteEmailTo = process.env.QUOTE_EMAIL_TO || 'globalfer_marilia@yahoo.com.br'
const frontendUrl = process.env.FRONTEND_URL || 'http://127.0.0.1:5173'
const maxProducts = 30

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.resolve(__dirname, '..', 'dist')

app.use(cors({ origin: frontendUrl }))
app.use(express.json({ limit: '120kb' }))

const sanitize = (value) => String(value || '').trim()

const escapeHtml = (value) =>
  sanitize(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

const createTransporter = () => {
  const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS']
  const missingEnv = requiredEnv.filter((key) => !process.env[key])

  if (missingEnv.length > 0) {
    throw new Error(`Configuração de e-mail incompleta: ${missingEnv.join(', ')}`)
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

const validateQuote = (quote) => {
  const errors = []
  const name = sanitize(quote.name)
  const phone = sanitize(quote.phone)
  const city = sanitize(quote.city)
  const message = sanitize(quote.message)
  const items = Array.isArray(quote.items) ? quote.items : []

  if (!name) errors.push('Nome é obrigatório.')
  if (!phone) errors.push('Telefone / WhatsApp é obrigatório.')
  if (!city) errors.push('Cidade é obrigatória.')
  if (items.length === 0) errors.push('Adicione pelo menos um produto.')
  if (items.length > maxProducts) errors.push(`O limite é de ${maxProducts} produtos por orçamento.`)

  const cleanItems = items.map((item, index) => {
    const product = sanitize(item.product)
    const measurements = sanitize(item.measurements)

    if (!product) errors.push(`Produto ${index + 1}: selecione o tipo de produto.`)
    if (!measurements) errors.push(`Produto ${index + 1}: informe as medidas.`)

    return { product, measurements }
  })

  return {
    errors,
    data: { name, phone, city, message, items: cleanItems },
  }
}

const buildTextEmail = ({ name, phone, city, message, items }) => {
  const productLines = items
    .map(
      (item, index) =>
        `${index + 1}. Produto: ${item.product}\n   Medidas/detalhes: ${item.measurements}`,
    )
    .join('\n\n')

  return [
    'Nova solicitação de orçamento pelo site Globalfer.',
    '',
    `Nome: ${name}`,
    `Telefone / WhatsApp: ${phone}`,
    `Cidade: ${city}`,
    '',
    'Produtos solicitados:',
    productLines,
    '',
    'Mensagem:',
    message || 'Não informado.',
  ].join('\n')
}

const buildHtmlEmail = ({ name, phone, city, message, items }) => `
  <div style="font-family: Arial, sans-serif; color: #1f2933; line-height: 1.5;">
    <h2 style="margin: 0 0 16px; color: #101722;">Nova solicitação de orçamento</h2>
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>Telefone / WhatsApp:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Cidade:</strong> ${escapeHtml(city)}</p>

    <h3 style="margin-top: 24px; color: #101722;">Produtos solicitados</h3>
    ${items
      .map(
        (item, index) => `
          <div style="border: 1px solid #d8dee6; border-radius: 8px; padding: 14px; margin-bottom: 12px;">
            <p style="margin: 0 0 8px;"><strong>Produto ${index + 1}:</strong> ${escapeHtml(item.product)}</p>
            <p style="margin: 0;"><strong>Medidas/detalhes:</strong><br>${escapeHtml(item.measurements).replaceAll('\n', '<br>')}</p>
          </div>
        `,
      )
      .join('')}

    <h3 style="margin-top: 24px; color: #101722;">Mensagem</h3>
    <p>${escapeHtml(message || 'Não informado.').replaceAll('\n', '<br>')}</p>
  </div>
`

app.get('/api/health', (request, response) => {
  response.json({ ok: true })
})

app.post('/api/orcamento', async (request, response) => {
  const { errors, data } = validateQuote(request.body)

  if (errors.length > 0) {
    return response.status(400).json({ message: 'Revise os dados do orçamento.', errors })
  }

  try {
    const transporter = createTransporter()
    const subject = `Solicitação de orçamento - ${data.name}`

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: quoteEmailTo,
      replyTo: process.env.SMTP_USER,
      subject,
      text: buildTextEmail(data),
      html: buildHtmlEmail(data),
    })

    return response.json({ message: 'Solicitação enviada com sucesso.' })
  } catch (error) {
    console.error('Erro ao enviar orçamento:', error)

    if (error.code === 'EAUTH') {
      return response.status(500).json({
        message:
          'O Gmail recusou o login SMTP. Confira se SMTP_USER é o mesmo e-mail que gerou a senha de app e se SMTP_PASS é uma senha de app válida.',
      })
    }

    return response.status(500).json({
      message: 'Não foi possível enviar o orçamento agora. Tente novamente em instantes.',
    })
  }
})

app.use(express.static(distPath))

app.get('*', (request, response) => {
  response.sendFile(path.join(distPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`Servidor Globalfer rodando em http://127.0.0.1:${port}`)
})
