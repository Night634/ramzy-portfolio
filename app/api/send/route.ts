import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Pastikan 'to' diisi email pribadi yang kamu pakai daftar Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['ramzy14032005@gmail.com'], // <-- GANTI DENGAN EMAIL ASLI KAMU
      subject: `Pesan Baru dari Portfolio: ${name}`,
      replyTo: email,
      html: `
        <h3>Pesan Baru dari Form Kontak Portfolio</h3>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email Pengirim:</strong> ${email}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log('Resend Success:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Gagal mengirim email' }, { status: 500 });
  }
}