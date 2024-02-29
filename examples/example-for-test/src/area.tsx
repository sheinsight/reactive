import type { PropsWithChildren } from 'react'

export const Area = ({ name, children }: PropsWithChildren<{ name: string }>) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid greenyellow',
        marginBottom: '40px',
        padding: '16px',
      }}
    >
      <h1>{name}</h1>
      <div
        style={{
          border: '1px solid darkorange',
          padding: '12px',
        }}
      >
        {children}
      </div>
    </div>
  )
}
