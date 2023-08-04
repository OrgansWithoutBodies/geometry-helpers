import { BrandedString, OrderableEvent, PercNumber } from "type-library";

type EventID = BrandedString<"Event">;

// TODO 'viewWindow'? maybe better in rendering side
// TODO transition between viewWindows (also rendering)
// TODO validators library
export interface IOrderedEvents<TEvent extends OrderableEvent> {
  setEvents: (events: TEvent[]) => IOrderedEvents<TEvent>;

  // TODO this should be [0,1] i think?
  maxValue: TEvent["orderingValue"] & PercNumber;
  minValue: TEvent["orderingValue"] & PercNumber;

  selectedEvents: TEvent[];

  onHoverEvent: (event: EventID) => void;
  onClickEvent: (event: EventID) => void;
}

// TODO generic immutable class/interface?
export type DateEvent = OrderableEvent;
// TODO DateRange?
export interface ITimeline<TEvent extends OrderableEvent>
  extends IOrderedEvents<TEvent> {}

// export class Timeline implements ITimeline<DateEvent> {
//   constructor(dateEvents: DateEvent[]) {}
//   setEvents: (events: OrderableEvent[]) => IOrderedEvents<OrderableEvent>;
//   public maxValue: number & PercNumber;
//   public minValue: number & PercNumber;
//   selectedEvents: OrderableEvent[];
//   onHoverEvent: (event: EventID) => void;
//   onClickEvent: (event: EventID) => void;
// }
