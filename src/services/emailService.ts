import nodemailer from 'nodemailer';

const sendResetEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetLink = `https://seusite.com/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Redefinição de senha',
    html: `<p>Clique no link para redefinir sua senha: <a href="${resetLink}">Redefinir Senha</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

export { sendResetEmail };
