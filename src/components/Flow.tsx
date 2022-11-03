import React from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

import useStore from '../store';
import { Job } from '../types';


interface JobNodeArgs {
  data: {
    job: Job
  }
}


const JobNode = ({ data }: JobNodeArgs) => {

  const job = data.job

  let color
  if (job.status == "failed") {
    color = "red"
  } else {
    color = "black"
  }

  return (
    <>
      <Handle type="source" position={Position.Top} />
      <div style={{
        color: color,
        borderColor: color,
        borderStyle: "solid",
        textAlign: "center",
        backgroundColor: "white",
        padding: 10,
      }}>
        <p>{job.name}</p>
        <p>{job.id}</p>
      </div>
      <Handle type="target" position={Position.Bottom} />
    </>
  )
}


const nodeTypes = { jobNode: JobNode }


export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { jobs } = useStore((state) => state);

  React.useEffect(() => {
    const job_nodes = jobs.map((job) => {

      return {
        id: job.id,
        position: {x: 0, y: 0},
        type: "jobNode",
        data: {job: job},
      }
    })
    setNodes(job_nodes)
  }, [JSON.stringify(jobs)])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}
