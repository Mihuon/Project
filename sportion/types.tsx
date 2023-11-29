import * as Datetime from "react-datetime";
export type Reservation = {
    id: String;
    name:String;
    //TODO: zprovoznit DateTime
    // timeFrom:Datetime;
    // timeTo:Datetime;
    timeFrom:number;
    timeTo:number;
    place:String;
    charge:Number;
    paid:Boolean;
    confirmed:Boolean;
    profile:String;
}
export type Place = {
    id: String;
    name:String;
    cost:Number;
}
export type Profile = {
    uid:String;
    name:String;
    surname:String;
    credit:Number;
    admin:Boolean
}