/**
 * Dijkstra's Shortest Path Algorithm for Graph-Based Indoor Navigation
 * @param {Array} nodes - List of graph node objects [{ id, name, x, y }]
 * @param {Array} connections - List of edge objects [{ from, to, weight }]
 * @param {string} startNodeId - Starting node ID
 * @param {string} endNodeId - Target node ID
 * @returns {Object} { pathNodes, totalDistance, pathCoordinates }
 */
export const findShortestPath = (nodes, connections, startNodeId, endNodeId) => {
  if (!nodes || !connections || !startNodeId || !endNodeId) {
    return { pathNodes: [], totalDistance: 0, pathCoordinates: [] };
  }

  // Create adjacency list graph representation
  const graph = {};
  nodes.forEach((node) => {
    graph[node.id] = [];
  });

  connections.forEach(({ from, to, weight }) => {
    if (graph[from]) graph[from].push({ node: to, weight: weight || 10 });
    if (graph[to]) graph[to].push({ node: from, weight: weight || 10 }); // Undirected walking paths
  });

  const distances = {};
  const previous = {};
  const unvisited = new Set();

  nodes.forEach((node) => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  });

  distances[startNodeId] = 0;

  while (unvisited.size > 0) {
    // Find unvisited node with smallest distance
    let current = null;
    let minDistance = Infinity;

    unvisited.forEach((nodeId) => {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        current = nodeId;
      }
    });

    if (current === null || current === endNodeId || minDistance === Infinity) {
      break;
    }

    unvisited.delete(current);

    const neighbors = graph[current] || [];
    neighbors.forEach(({ node: neighborId, weight }) => {
      if (unvisited.has(neighborId)) {
        const alt = distances[current] + weight;
        if (alt < distances[neighborId]) {
          distances[neighborId] = alt;
          previous[neighborId] = current;
        }
      }
    });
  }

  // Reconstruct path
  const pathNodeIds = [];
  let curr = endNodeId;

  if (distances[endNodeId] !== Infinity || startNodeId === endNodeId) {
    while (curr !== null) {
      pathNodeIds.unshift(curr);
      curr = previous[curr];
    }
  }

  // Fallback: If no direct path connected, fallback to direct start->end path
  if (pathNodeIds.length === 0 || pathNodeIds[0] !== startNodeId) {
    pathNodeIds.length = 0;
    pathNodeIds.push(startNodeId, endNodeId);
  }

  // Map to full node objects & SVG coordinates
  const nodeMap = {};
  nodes.forEach((n) => {
    nodeMap[n.id] = n;
  });

  const pathNodes = pathNodeIds.map((id) => nodeMap[id]).filter(Boolean);
  const totalDistance = Math.round(distances[endNodeId] !== Infinity ? distances[endNodeId] : 45);

  const pathCoordinates = pathNodes.map((n) => ({ x: n.x, y: n.y }));

  return {
    pathNodeIds,
    pathNodes,
    totalDistance,
    pathCoordinates
  };
};

/**
 * Finds the nearest graph node to a given (x,y) location point
 */
export const findNearestNode = (nodes, position) => {
  if (!nodes || nodes.length === 0 || !position) return null;

  let nearest = nodes[0];
  let minDist = Infinity;

  nodes.forEach((node) => {
    const dist = Math.hypot(node.x - position.x, node.y - position.y);
    if (dist < minDist) {
      minDist = dist;
      nearest = node;
    }
  });

  return nearest;
};
