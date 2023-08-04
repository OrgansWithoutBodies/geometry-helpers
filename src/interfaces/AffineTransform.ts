export class AffineTransform {
  // TOrigin extends number,
  // TTarget extends number,
  // TTransform extends SpaceTransformationTag<TOrigin, TTarget>
  // public static simpleTranslationTransform(translationVec: TranslationArray) {
  //   const transAffineAsArray: TranslationMatrix = [
  //     [1, 0, 0, translationVec[0]],
  //     [0, 1, 0, translationVec[1]],
  //     [0, 0, 1, translationVec[2]],
  //     [0, 0, 0, 1],
  //   ];
  //   new AffineTransform(transAffineAsArray);
  // }
  // public static simpleScaleTransform(scaleVec: ScaleArray) {
  //   // TODO this should throw type error atm
  //   const scaleAffineAsArray: ScaleMatrix = [
  //     [scaleVec[0], 0, 0, 0],
  //     [0, scaleVec[0], 0, 0],
  //     [0, 0, scaleVec[0], 0],
  //     [0, 0, 0, 1],
  //   ];
  //   new AffineTransform(scaleAffineAsArray);
  // }
  // constructor(affine: GenericMatrixAsArray) {}
  // // TTarget
  // public applyAffineToPoint(point: TOrigin) {}
  // new AffineTransform().chain(affine2).chain(affine3) = space transformation from origin to target of affine3
  // public chain<
  //   TNewTarget extends number,
  //   TSecondTransform extends SpaceTransformationTag<TTarget, TNewTarget>
  // >(
  //   otherAffine: TSecondTransform
  // ): ComposeTransformation<TTransform, TSecondTransform> {
  //   // move to center, scale, rotate, move to new center
  //   return 2 as any as ComposeTransformation<TTransform, TSecondTransform>;
  // }
}
// NetworkLookup
