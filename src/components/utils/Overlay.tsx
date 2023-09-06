type Props = {
    children: React.ReactNode;
}

const Overlay = ({children}: Props) => {
  return (
    <div className="fixed inset-0 flex flex-col gap-4 items-center">{children}</div>
  )
}

export default Overlay