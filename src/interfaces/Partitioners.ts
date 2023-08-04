import {
  Partition,
  RectArea1,
  TileID,
  TileSummary,
  TileTree,
} from "type-library";
import {
  PartitionTree,
  RectPartitioner,
  TreeMapPartioner,
} from "./Partitioner";

// TODO rename this  file

// https://en.wikipedia.org/wiki/Treemapping#Rectangular_treemaps
export class PivotBySizePartitioner implements RectPartitioner {
  resizeRect!: (newRectSize: RectArea1) => RectPartitioner;
  tiles!: TileSummary;
  rectPartition!: Partition;
}
export class SpiralPartitioner implements RectPartitioner {
  resizeRect!: (newRectSize: RectArea1) => RectPartitioner;
  tiles!: TileSummary;
  rectPartition!: Partition;
}

export class TreePartitioner<TPartitioner extends RectPartitioner>
  implements TreeMapPartioner<TPartitioner>
{
  // ["constructor"]: (tiles: TileTree) => void;
  changeTiles!: (tiles: TileTree) => TreeMapPartioner<TPartitioner>;
  changePartitioner!: (
    newPartitioner: RectPartitioner
  ) => TreeMapPartioner<RectPartitioner>;
  changeRootRect!: (newRectSize: RectArea1) => TreeMapPartioner<TPartitioner>;
  rootRectPartitioner!: TPartitioner;
  partitioners!: Record<TileID, TPartitioner>;
  rootSize!: RectArea1;
  treePartition!: PartitionTree;
}
