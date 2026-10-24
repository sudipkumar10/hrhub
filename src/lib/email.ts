// Mock function to simulate sending emails
// In production, replace this with Resend, SendGrid, or Nodemailer
export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  console.log(`\n--- MOCK EMAIL ---`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body: ${text}`);
  console.log(`------------------\n`);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
}
