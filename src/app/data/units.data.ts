export * from "./units/units.models";
import { UnitSession } from "./units/units.models";
import { UNITS_QUEBEC } from "./units/units-quebec.data";
import { UNITS_ONTARIO_1 } from "./units/units-ontario-1.data";
import { UNITS_ONTARIO_2 } from "./units/units-ontario-2.data";
import { UNITS_ATLANTIC } from "./units/units-atlantic.data";
import { UNITS_WEST_1 } from "./units/units-west-1.data";
import { UNITS_WEST_2 } from "./units/units-west-2.data";
import { UNITS_INTERNATIONAL } from "./units/units-international.data";

export const UNITS_LIST: UnitSession[] = [
  ...UNITS_QUEBEC,
  ...UNITS_ONTARIO_1,
  ...UNITS_ONTARIO_2,
  ...UNITS_ATLANTIC,
  ...UNITS_WEST_1,
  ...UNITS_WEST_2,
  ...UNITS_INTERNATIONAL,
];
