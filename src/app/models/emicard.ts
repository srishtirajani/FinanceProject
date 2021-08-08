export class EmiCard{
    constructor(
        public eid:number=0,
	    public cardNo:string='',
        public userId:number=0,
	    public validityPeriod:Date,
        public accBalance:number=0, 
        public totalCredit:string=''
    ){ }
}