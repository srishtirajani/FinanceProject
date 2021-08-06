export class Consumer {
    constructor (
      public cid : number =0,
      public userId : string = '',
      public cName : string,
      public DOB : Date,
      public emailId : string,
      public phoneNumber : string,
      public userName : string,
      public cAddress : string,
      public cPassword : string,
      public cardType : boolean,
      public bankName : string,
      public accNo : string,
      public ifscCode : string,
      public isVerfied : boolean = false
    ) {}
  }
