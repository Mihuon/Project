import * as Datetime from "react-datetime";
export type Reservation = {
    id: Number;
    name:String;
    // timeFrom:Datetime;
    // timeTo:Datetime;
    timeFrom:number;
    timeTo:number;
    // place:Place;  
    place:String;
    charge:Number;
    paid:Boolean;
}

//TODO
export type Place = {
    id: Number;
    name:String;
    hourCost:Number;
}
export type User = {
    name:String;
}