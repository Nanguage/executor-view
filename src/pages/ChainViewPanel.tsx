import Flow from "../components/jobs/Flow"

export default function ChainViewPanel(props: {}) {

  return (
    <div style={{
      width: "100%",
      height: "800px",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#ccc"
    }}>
      <Flow/>
    </div>
  )
}
