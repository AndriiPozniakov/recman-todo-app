type TDefaultPreviewState = {
  type: 'default'
}

type TIOSPreviewState = {
  type: 'ios'
  container: HTMLElement
}

export type TPreviewState = TDefaultPreviewState | TIOSPreviewState
