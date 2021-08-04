enum cardType{
    gold,
    titanium
} 
enum isVerfied{
    verified,
    notVerified
}
export class Consumer{
    static id:number=1;
	userId:string="";
    // 'UID' + RIGHT('0000' + CAST(id AS VARCHAR(8)), 8) PERSISTED  PRIMARY KEY,
	cName:string=""; 
    DOB:Date=new Date(Date.now());
	emailId:string="";
	phoneNumber:string="";
	userName:string="";
	cAddress:string="";
	cPassword:string="";
    card_type:cardType=0;
	bankName:string="";
	accNo:string="";
	ifscCode:string="";
    is_verified:isVerfied=0;
    constructor(name?:string, dob?:Date, emailId?:string, phone?:string, uName?:string, addr?:string, pass?:string, bank?:string, accNo?:string, ifsc?:string){
        if(name!=null)
            this.cName = name;
        if(dob!=null)
            this.DOB = dob;
        if(emailId!=null)
            this.emailId = emailId;
        if(phone!=null)
            this.phoneNumber = phone;
        if(uName!=null)
            this.userName = uName;
        if(addr!=null)
            this.cAddress=addr;
        if(pass!=null)
            this.cPassword=pass;
        if(bank!=null)
            this.bankName=bank;
        if(accNo!=null)
            this.accNo=accNo;
        if(ifsc!=null)
            this.ifscCode=ifsc;
        this.card_type=0;
        this.is_verified=0;
    }
}