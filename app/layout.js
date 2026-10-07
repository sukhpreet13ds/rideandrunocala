export const metadata = {
  title: 'Celebration of Life – Ride & Run for Breast Cancer | Ocala, FL',
  description:
    'A family-friendly day at the Florida Horse Park honoring breast cancer survivors and raising funds for breast cancer research. October 31, 2026, Ocala, Florida.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.css"
          integrity="sha512-x9WwyMYBnlXMNQ6kQ/Lyzu1NqIhLQKL5Oq6xByfXuRj7s9CskyCbLv/1IjqzJmXwFXWr0ov6jBV7Qbc0hh9nHg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
