export class Product{
    pid:number=0;
    productName:string="";
    prodDetails:string="";
    price:number=0;
    img:string="";

    constructor(pid:number,productName:string,prodDetails:string,price:number,img:string){
        this.pid=pid;
        this.productName=productName;
        this.prodDetails=prodDetails;
        this.price=price;
        this.img=img;
    }
}
