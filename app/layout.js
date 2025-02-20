import "../styles/mars.css";
export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <title>Mars Visit Application</title>
        </head>
        <body>{children}</body>
      </html>
    );
  }