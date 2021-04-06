import moment from "moment";
import CartItem from "./cartItem";

export default class Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: Date;

  constructor(id: string, items: CartItem[], totalAmount: number, date: Date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}
