import type { ICertificate } from "./cert";
import type { ICompany } from "./company";
import type { IFeedback } from "./feedback";
import type { IOrgan } from "./organ";
import type { ISystem } from "./system";

export type TColumns =
    keyof ICertificate |
    keyof ICompany |
    keyof ISystem |
    keyof IFeedback |
    keyof IOrgan;