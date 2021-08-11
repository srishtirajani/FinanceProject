export class PurchaseRecord{
    constructor(
        public prid:number=0,
	    public orderId:string='',
	    public cardNo:number,
	    public productId:number,
	    public userId:number,
	    public DOP:Date,
	    public productBalance:number,
	    public totalMonthsSelected:number,
		public LatestEMImonth:number=0
    ){}
}