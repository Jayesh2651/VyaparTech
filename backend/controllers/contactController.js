import db from "../db.js";
import nodemailer from "nodemailer";

export const submitContact = (req, res) => {
  const { name, business, phone, budget, message } = req.body;

  if (!name || !business || !phone || !message) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  const sql =
    "INSERT INTO contacts (name,business,phone,budget,message) VALUES (?,?,?,?,?)";

  db.query(sql, [name, business, phone, budget, message], async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Website Inquiry 🚀",
        html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Business:</b> ${business}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Budget:</b> ${budget}</p>
        <p><b>Message:</b> ${message}</p>
        `,
      });

      res.json({ message: "Message saved and email sent" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Email sending failed" });
    }
  });
};