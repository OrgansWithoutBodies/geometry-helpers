import type {
  ComposeTransformation,
  GenericMatrixAsArray,
  ScaleArray,
  ScaleMatrix,
  SpaceTransformationTag,
  TranslationArray,
  TranslationMatrix,
} from "type-library";

export class AffineTransform<
  TSource extends number,
  TTarget extends number,
  TTransform extends SpaceTransformationTag<TSource, TTarget>
> {
  public static simpleTranslationTransform(translationVec: TranslationArray) {
    const transAffineAsArray: TranslationMatrix = [
      [1, 0, 0, translationVec[0]],
      [0, 1, 0, translationVec[1]],
      [0, 0, 1, translationVec[2]],
      [0, 0, 0, 1],
    ];
    new AffineTransform(transAffineAsArray);
  }

  public static simpleScaleTransform(scaleVec: ScaleArray) {
    const scaleAffineAsArray: ScaleMatrix = [
      [scaleVec[0], 0, 0, 0],
      [0, scaleVec[0], 0, 0],
      [0, 0, scaleVec[0], 0],
      [0, 0, 0, 1],
    ];
    new AffineTransform(scaleAffineAsArray);
  }

  constructor(affine: GenericMatrixAsArray) {}

  public chain<
    TNewTarget extends number,
    TSecondTransform extends SpaceTransformationTag<TTarget, TNewTarget>
  >(
    otherAffine: TSecondTransform
  ): ComposeTransformation<TTransform, TSecondTransform> {
    // move to center, scale, rotate, move to new center
    return 2 as any as SpaceTransformationTag<TSource, TNewTarget>;
  }
}
// NetworkLookup
