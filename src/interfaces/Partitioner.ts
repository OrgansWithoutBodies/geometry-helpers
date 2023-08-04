import type {
  Partition,
  RectArea1,
  TileID,
  TileSummary,
  TileTree,
  Tree,
} from "type-library";

// TODO (longterm) - non-rect partitioner types
export interface RectPartitioner {
  // constructor: (tiles: TileSummary) => void;

  // note - if we fix the type arg of Rect to be PercNum - then
  resizeRect: (newRectSize: RectArea1) => RectPartitioner;

  tiles: TileSummary;
  rectPartition: Partition;
}

// tree of (potentially) nested tile objects
// this should only be in terms of PercSpace
// we apply whatever space transformations in the actual rendering

export type PartitionTree = Tree<Partition>;
// TODO
// type Partitioner = "";

export interface TreeMapPartioner<TPartitioner extends RectPartitioner> {
  // constructor: (tiles: TileTree) => void;

  // TODO maybe all 'change' methods should be a SpaceTransformer between different class-level generics?
  // then we can have some pretty nice transformation typesafety
  changeTiles: (tiles: TileTree) => TreeMapPartioner<TPartitioner>;
  // SpaceTransformer? its technically specified via the basis
  changePartitioner: (
    newPartitioner: RectPartitioner
  ) => TreeMapPartioner<RectPartitioner>;
  changeRootRect: (newRectSize: RectArea1) => TreeMapPartioner<TPartitioner>;

  // all child partitioners are the same as the root partitioner
  rootRectPartitioner: TPartitioner;
  partitioners: Record<TileID, TPartitioner>;

  rootSize: RectArea1;

  // the output type
  treePartition: PartitionTree;
}
// type WorldSpace = BrandedNumber<"World">;
// type TreeSpaceToWorldSpace = SpaceTransformationTag<PercNumber, WorldSpace>;

// TODO parent vs child brand?
// type ParentSpaceToChildSpace = SpaceTransformationTag<PercNumber, PercNumber>;
