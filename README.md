# use-primary-color

- React Hooks
- Get the primary color of the image

## How to use

```typescript
import React, { FC } from 'react'

import usePrimaryColor from 'use-primary-color'

export const Test: FC = () => {
  const { primaryColor, ref } = usePrimaryColor()
  return (
    <div
      style={{
        width: '100%',
        height: '50vh',
        backgroundColor: primaryColor ? `rgb(${primaryColor})` : 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src="test.jpg" alt="test" ref={ref} />
    </div>
  )
}
```

## Demo

http://rythgs.co/demo/primarycolor/
