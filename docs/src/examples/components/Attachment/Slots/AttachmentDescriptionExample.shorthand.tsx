import React from 'react'
import { Attachment, Provider } from '@stardust-ui/react'

const slotLabelStyles = label => ({
  position: 'relative',
  border: '2px solid red',
  ':before': {
    position: 'absolute',
    content: `'${label}'`,
    letterSpacing: '0.7px',
    color: 'white',
    padding: '2px',
    background: 'red',
    fontSize: '10px',
    lineHeight: '12px',
    bottom: '-16px',
    left: '-2px',
    zIndex: 30,
    opacity: 1,
  },
})

const AttachmentDescriptionExampleShorthand = () => (
  <Provider
    theme={{
      componentStyles: {
        Attachment: { description: slotLabelStyles('description') as any },
      },
    }}
  >
    <Attachment header="Profile.jpg" description="80kb" />
  </Provider>
)

export default AttachmentDescriptionExampleShorthand
