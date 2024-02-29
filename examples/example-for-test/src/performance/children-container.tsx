import { PropsWithChildren, HTMLAttributes } from 'react'
export default function ChildrenContainer(props: PropsWithChildren<HTMLAttributes<any>>) {
  return (
    <div
      style={{
        width: 132,
        height: 150,
        border: '1px solid gray',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      {...props}
    >
      {props.children}
    </div>
  )
}
