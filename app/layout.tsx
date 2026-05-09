import "./globals.css"

export const metadata = {
  title: "Whisk Video Editor",
  description: "Whisk Render Service",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}