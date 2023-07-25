export default class Shipment {
  #sender;

  #recipient;

  #product;

  #coupon;

  constructor(sender, recipient, product) {
    this.#sender = sender;
    this.#recipient = recipient;
    this.#product = product;
  }

  get sender() {
    return this.#sender;
  }

  set sender(sender) {
    this.#sender = sender;
  }

  get recipient() {
    return this.#recipient;
  }

  set recipient(recipient) {
    this.#recipient = recipient;
  }

  get coupon() {
    return this.#coupon;
  }

  set coupon(coupon) {
    this.#coupon = coupon;
  }

  get product() {
    return this.#product;
  }

  set product(product) {
    this.#product = product;
  }
}
