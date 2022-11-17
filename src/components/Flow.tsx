import React from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Node,
  Edge,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

import useStore from '../store';
import { Job } from '../types';


interface JobNodeArgs {
  data: {
    job: Job
  }
}

const NodeSize = {
  'width': 250,
  'height': 75,
}


const JobNode = ({ data }: JobNodeArgs) => {

  const job = data.job

  let color
  if (job.status == "done") {
    color = "green"
  } else if (job.status == "failed") {
    color = "red"
  } else if (job.status == "running") {
    color = "orange"
  } else if (job.status == "pending") {
    color = "gray"
  } else {
    color = "black"
  }

  const handleStyle = {
    backgroundColor: color,
  }

  return (
    <>
      <Handle
        type="target" position={Position.Top}
        style={handleStyle}/>
      <div
        style={{
          color: color,
          borderColor: color,
          borderStyle: "solid",
          borderRadius: 10,
          borderWidth: 1,
          textAlign: "center",
          backgroundColor: "white",
          padding: 0,
          width: NodeSize.width,
          height: NodeSize.height,
        }}
      >
        <p style={{
          fontSize: 20,
          margin: 5,
        }}>
          {job.name}
        </p>
        <p style={{
          fontSize: 5,
          margin: 0,
        }}>
          {job.id}
        </p>
        <p style={{
          fontSize: 5,
          margin: 0,
        }}>
          {job.status}
        </p>
      </div>
      <Handle
        type="source" position={Position.Bottom}
        style={handleStyle}/>
    </>
  )
}


const nodeTypes = { jobNode: JobNode }


const layoutGraph = (nodes: Node[], edges: Edge[]) => {
  let g = new dagre.graphlib.Graph()
  g.setGraph({})
  g.setDefaultEdgeLabel(() => ({}));
  for (const node of nodes) {
    g.setNode(node.id, {label: node.id, width: NodeSize.width, height: NodeSize.height})
  }
  for (const edge of edges) {
    g.setEdge(edge.source, edge.target)
  }
  dagre.layout(g)
  for (const node of nodes) {
    const layoutedNode = g.node(node.id)
    node.position.x = layoutedNode.x
    node.position.y = layoutedNode.y
  }
}


export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { jobs, refreshJobs } = useStore((state) => state);

  React.useEffect(() => {
    refreshJobs()
  }, [])

  React.useEffect(() => {
    let job_nodes: Node[] = []
    let job_edges: Edge[] = []
    for (const job of jobs) {
      const job_node = {
        id: job.id,
        position: {x: 0, y: 0},
        type: "jobNode",
        data: {job: job},
      }
      job_nodes.push(job_node)
      if ((job.condition !== null) && (job.condition.type === "AfterAnother")) {
        const dep_job_id = job.condition.arguments.job_id
        const edge: Edge = {
          id: dep_job_id + "_" + job.id,
          source: dep_job_id,
          target: job.id,
        }
        job_edges.push(edge)
      }
    }
    layoutGraph(job_nodes, job_edges)
    setNodes(job_nodes)
    setEdges(job_edges)
  }, [JSON.stringify(jobs)])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView={true}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}
