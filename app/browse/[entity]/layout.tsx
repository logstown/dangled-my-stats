export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className='p-16'>{children}</div>
}
