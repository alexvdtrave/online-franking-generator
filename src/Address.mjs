 export default class Address {
  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }

  get addressLine() {
    return this._addressLine;
  }

  set addressLine(addressLine) {
    this._addressLine = addressLine;
  }

  get street() {
    return this._street;
  }

  set street(street) {
    this._street = street;
  }

  get houseNumber() {
    return this._houseNumber;
  }

  set houseNumber(houseNumber) {
    this._houseNumber = houseNumber;
  }

  get postalCode() {
    return this._postalCode;
  }

  set postalCode(postalCode) {
    this._postalCode = postalCode;
  }

  get city() {
    return this._city;
  }

  set city(city) {
    this._city = city;
  }

  get countryCode() {
    return this._countryCode;
  }

  set countryCode(countryCode) {
    this._countryCode = countryCode;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }
}
