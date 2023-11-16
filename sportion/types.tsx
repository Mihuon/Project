import * as Datetime from "react-datetime";
export type Reservation = {
    id: String;
    name:String;
    //TODO: zprovoznit DateTime
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
    id: String;
    name:String;
    cost:Number;
}
export type User = {
    id: String;
    name:String;
    surname:String;

}