type ObjV1<TNum extends number> = { x: TNum };
type ObjV2<TNum extends number> = { x: TNum; y: TNum };
type ObjV3<TNum extends number> = { x: TNum; y: TNum; z: TNum };
type ObjV4<TNum extends number> = { x: TNum; y: TNum; z: TNum; w: TNum };

type DimensionalObj<TNum extends number> =
  | ObjV1<TNum>
  | ObjV2<TNum>
  | ObjV3<TNum>
  | ObjV4<TNum>;

type SerializedHull<TNum extends number, TDim extends DimensionalObj<TNum>> = {
  min: TDim;
  max: TDim;
};

type Deserialization<TSerializable, TClass> = (
  serializedVals: TSerializable
) => TClass;
type Serialization<TSerializable> = () => TSerializable;

// interface ISerializable<TSerializable> {
//   serialize: Serialization<TSerializable>;
//   // deserialize: Deserialization<any, Serializable<any>>;
//   clone(): Serializable<TSerializable>;
// }

// class Serializable<TSerializable> implements ISerializable<TSerializable> {
//   public serialize: Serialization<TSerializable>;
//   public static deserialize: Deserialization<any, Serializable<any>>;
//   public clone(): Serializable<TSerializable> {
//     return Serializable.deserialize(this.serialize());
//   }
// }
// TODO statics? https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface
export interface Hull<TNum extends number, TDim extends DimensionalObj<TNum>> {
  addPointToHull(point: TDim): Hull<TNum, TDim>;
  getCenterPoint(): TDim;
  getSize(): TDim;
  serialize(): SerializedHull<TNum, TDim>;
  clone(): Hull<TNum, TDim>;
  //   deserialize(serializedHull: SerializedHull<TNum, TDim>): Hull<TNum, TDim>;
}

// export class BaseHull<TNum extends number, TDim extends DimensionalObj<TNum>>
//   implements Partial<Hull<TNum, TDim>>
// {
//   constructor() {}

//   public static deserialize<
//     TNum extends number,
//     TDim extends DimensionalObj<TNum>
//   >(serializedHull: SerializedHull<TNum, TDim>): BaseHull<TNum, TDim> {
//     return new BaseHull<TNum, TDim>()
//       .addPointToHull(serializedHull.min)
//       .addPointToHull(serializedHull.max);
//   }
//   public clone(): BaseHull<TNum, TDim> {
//     return BaseHull.deserialize(this.serialize());
//   }
//   public serialize: Hull<TNum, TDim>["serialize"];
//   public addPointToHull: Hull<TNum, TDim>["addPointToHull"];
// }

export class Hull2D<TNum extends number> implements Hull<TNum, ObjV2<TNum>> {
  private readonly _MAX_INITIAL = Number.MIN_SAFE_INTEGER as TNum;
  private readonly _MIN_INITIAL = Number.MAX_SAFE_INTEGER as TNum;

  public static deserialize<TNum extends number>({
    min,
    max,
  }: SerializedHull<TNum, ObjV2<TNum>>): Hull2D<TNum> {
    return new Hull2D<TNum>({ min, max });
  }

  constructor(serializedHull: SerializedHull<TNum, ObjV2<TNum>> | undefined) {
    if (serializedHull) {
      this._min = serializedHull.min;
      this._max = serializedHull.max;
    }
  }

  private _max: ObjV2<TNum> = { x: this._MAX_INITIAL, y: this._MAX_INITIAL };
  private _min: ObjV2<TNum> = { x: this._MIN_INITIAL, y: this._MIN_INITIAL };

  public addPointToHull({ x, y }: ObjV2<TNum>): Hull2D<TNum> {
    const { min, max } = this.serialize();
    const newMin = {
      x: Math.min(min.x, x),
      y: Math.min(min.y, y),
    } as ObjV2<TNum>;
    const newMax = {
      x: Math.max(max.x, x),
      y: Math.max(max.y, y),
    } as ObjV2<TNum>;

    return Hull2D.deserialize<TNum>({ min: newMin, max: newMax });
  }
  public getCenterPoint(): ObjV2<TNum> {
    const { min, max } = this.serialize();
    return { x: (max.x + min.x) / 2, y: (max.y + min.y) / 2 } as ObjV2<TNum>;
  }
  public getSize(): ObjV2<TNum> {
    const { min, max } = this.serialize();
    return { x: max.x - min.x, y: max.y - min.y } as ObjV2<TNum>;
  }
  public serialize(): SerializedHull<TNum, ObjV2<TNum>> {
    return { min: this._min, max: this._max };
  }
  public clone(): Hull2D<TNum> {
    return Hull2D.deserialize(this.serialize());
  }
}
export class Hull3D<TNum extends number>
  extends Serializable<SerializedHull<TNum, ObjV3<TNum>>>
  implements Hull<TNum, ObjV3<TNum>>
{
  public static deserialize<TNum extends number>(
    serializedHull: SerializedHull<TNum, ObjV3<TNum>>
  ): Hull3D<TNum> {
    return new Hull3D<TNum>()
      .addPointToHull(serializedHull.min)
      .addPointToHull(serializedHull.max);
  }

  constructor() {
    super();
  }

  public serialize: Serialization<SerializedHull<TNum, ObjV3<TNum>>>;

  addPointToHull(point: ObjV3<TNum>): Hull<TNum, ObjV3<TNum>> {
    throw new Error("Method not implemented.");
  }
  getCenterPoint(): ObjV3<TNum> {
    throw new Error("Method not implemented.");
  }
  getSize(): ObjV3<TNum> {
    throw new Error("Method not implemented.");
  }
}
