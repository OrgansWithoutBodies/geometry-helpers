import type {
  ObjectFixedArea,
  Partition,
  Rect,
  TileID,
  TileSummary,
  TileTree,
} from "type-library";

export interface RectPartitioner {
  constructor: (tiles: TileSummary) => void;

  // note - if we fix the type arg of Rect to be PercNum - then
  resizeRect: (
    newRectSize: ObjectFixedArea<1, Rect<number>>
  ) => RectPartitioner;

  tiles: TileSummary;
  rectPartition: Partition;
}

// tree of (potentially) nested tile objects
// TODO maybe should only be in terms of PercSpace?
// then we apply whatever space transformations in the actual rendering?
interface TreeMapPartioner<TRootSpace extends number> {
  constructor: (tiles: TileTree) => void;

  partitions: Record<TileID, Partition>;
  rootRectPartitioner: RectPartitioner;
  rootSize: Rect<TRootSpace>;
}
