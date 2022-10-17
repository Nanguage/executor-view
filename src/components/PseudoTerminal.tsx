import React from 'react';
import Typography from '@mui/material/Typography';


export default function PseudoTerminal(props: {content: string}) {

  const endRef: React.RefObject<HTMLDivElement> | null = React.useRef(null)

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "auto" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [props.content])

  return (
    <div style={{
        background: "black",
        color: "white",
        padding: "10px",
        height: "300px",
        overflow: "scroll",
      }}>
      <Typography>
        <pre style={{
          margin: 0,
        }}>
          {props.content}
        </pre>
        <div ref={endRef}/>
      </Typography>
    </div>
  )
}
