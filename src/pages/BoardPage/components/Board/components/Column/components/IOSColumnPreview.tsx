interface IOSColumnPreviewProps {
  title: string
}

export const IOSColumnPreview = (props: IOSColumnPreviewProps) => {
  return (
    <div className="h-12 w-[272px] border-grey-500 bg-grey-400 p-4">
      {props.title}
    </div>
  )
}
