export class Consumer {
    constructor (
      public name : string,
      public dob : Date,
      public emailID : string,
      public phone : string,
      public username : string,
      public password : string,
      public cp : string,
      public address : string,
      public CardType : boolean,
      public bank : string,
      public savingsAccount : string,
      public IFSC : string
    ) {}
  }