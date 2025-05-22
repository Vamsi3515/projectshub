"use client"

export default function LoginLayer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="">    
      <main>
          {children}
      </main>
    </div>
  )
}