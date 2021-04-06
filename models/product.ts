export default class Product {
  constructor(
    readonly id: string,
    readonly ownerId: string,
    readonly title: string,
    readonly imageUrl: string,
    readonly description: string,
    readonly price: number
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}
