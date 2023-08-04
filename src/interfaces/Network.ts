import {
  AdjacencyMatrix,
  BrandedNumber,
  ConvertNetworkLookupToAdjMat,
  NetworkAsLookup,
  RectIn1x1Box,
} from "type-library";

type NodeID = BrandedNumber<"Node">;
type EdgeID = BrandedNumber<"Edge">;
type NetworkLayout = {};
export interface INetwork<TNode, TEdge> {
  nodes: TNode[];
  edges: TEdge[];

  fixedNodes: NodeID[];

  layout: NetworkLayout;

  setLayout: (newLayout: NetworkLayout) => INetwork<TNode, TEdge>;
  setNodes: (newNodes: TNode[]) => INetwork<TNode, TEdge>;
  setEdges: (newEdges: TEdge[]) => INetwork<TNode, TEdge>;

  selectedEdges: TEdge[];
  selectedNodes: TEdge[];

  potentialEdges: TEdge[];
  potentialNodes: TEdge[];

  constructor(network: NetworkAsLookup): void;

  onMouseMove: (relMousePos: RectIn1x1Box) => void;

  onHoverNode: (cell: NodeID) => void;
  onClickNode: (cell: NodeID) => void;
  onSelectNode: (node: NodeID) => void;

  //   TODO relates to layout?
  onMoveNodeAttempt: (cell: NodeID, potentialNewPosition: RectIn1x1Box) => void;

  //   TODO allow for a 'drag between nodes to add new edge' functionality
  onHoverEdge: (slice: EdgeID) => void;
  onClickEdge: (slice: EdgeID) => void;

  convertToAdjacencyMatrix: ConvertNetworkLookupToAdjMat<number>;
}
type CellID = BrandedNumber<"Cell">;
// a slice is either a column or a row - TODO represent this in types
type SliceID = BrandedNumber<"Slice">;

// TODO render library
// TODO tooltip library

// TODO represent non-adj mats as well (no assumption of symmetry)
export interface IAdjacencyMatrix<TCell, TNodeOrder extends NodeID[]> {
  numCells: number;
  //   TODO tie TCell to CellID
  cells: AdjacencyMatrix<TCell>;

  selectedCells: CellID[];
  selectedSlices: SliceID[];

  // allows an implementation where the tooltip position is tied to mouse position
  // once outside of the box for this component this shouldn't care hence box restriction
  onMouseMove: (relMousePos: RectIn1x1Box) => void;

  onHoverCell: (cell: CellID) => void;
  onClickCell: (cell: CellID) => void;

  onHoverSlice: (slice: SliceID) => void;
  onClickSlice: (slice: SliceID) => void;

  changeNodeOrder<TNewNodeOrder extends NodeID[]>(
    newOrder: TNewNodeOrder
  ): IAdjacencyMatrix<TNewNodeOrder>;
}

// TODO colormapper
