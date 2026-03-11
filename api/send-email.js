const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Método não permitido.' });
  }

  const { name, email, phone, service, location, message } = req.body;

  // Metadata
  const date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Recipients
  const to = 'contato.yadastudio@gmail.com, beckerluciano09@gmail.com';
  const subject = 'Orçamento Rápido - Site Becker';

  // Configuração do Transportador (SMTP)
  // NOTA: Para funcionar na Vercel, o usuário deve configurar estas variáveis de ambiente
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const bodyContent = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <div style="background: #012D46; color: #fff; padding: 15px; text-align: center; border-radius: 8px 8px 0 0;">
        <h2>Novo Lead: Becker Reformas</h2>
      </div>
      
      <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f4f4f4;">
        <span style="font-weight: bold; color: #012D46; display: block; font-size: 12px; text-transform: uppercase;">Nome Completo</span>
        <div style="font-size: 16px; margin-top: 5px;">${name}</div>
      </div>
      
      <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f4f4f4;">
        <span style="font-weight: bold; color: #012D46; display: block; font-size: 12px; text-transform: uppercase;">E-mail</span>
        <div style="font-size: 16px; margin-top: 5px;">${email}</div>
      </div>
      
      <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f4f4f4;">
        <span style="font-weight: bold; color: #012D46; display: block; font-size: 12px; text-transform: uppercase;">Telefone</span>
        <div style="font-size: 16px; margin-top: 5px;">${phone}</div>
      </div>
      
      <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f4f4f4;">
        <span style="font-weight: bold; color: #012D46; display: block; font-size: 12px; text-transform: uppercase;">Tipo de Serviço</span>
        <div style="font-size: 16px; margin-top: 5px;">${service}</div>
      </div>
      
      <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f4f4f4;">
        <span style="font-weight: bold; color: #012D46; display: block; font-size: 12px; text-transform: uppercase;">Localização da Obra</span>
        <div style="font-size: 16px; margin-top: 5px;">${location}</div>
      </div>
      
      <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f4f4f4;">
        <span style="font-weight: bold; color: #012D46; display: block; font-size: 12px; text-transform: uppercase;">Mensagem / Detalhes</span>
        <div style="font-size: 16px; margin-top: 5px;">${message}</div>
      </div>

      <div style="font-size: 11px; color: #999; margin-top: 30px; text-align: center;">
        <p><strong>Informações Técnicas:</strong></p>
        <p>IP: ${ip}</p>
        <p>Data/Hora: ${date}</p>
        <p>Enviado via Vercel Serverless Function</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Becker Reformas" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: bodyContent,
      replyTo: email,
    });

    return res.status(200).json({ status: 'success', message: 'Orçamento enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ status: 'error', message: 'Erro ao enviar e-mail.' });
  }
}
