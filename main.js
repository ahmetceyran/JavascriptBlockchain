const SHA256 = require('crypto-js/SHA256');

class block{
    constructor(index,timestamp,adet,urunad,birimfiyat,previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.adet=adet;
        this.urunad=urunad;
        this.birimfiyat=birimfiyat;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();

    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.adet) + this.urunad + this.birimfiyat).toString();
    }
}

class blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new block(0,"01/01/2022","Genesis Block","0",0,"0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}


let coin = new blockchain();
coin.addBlock(new block(1,"01/01/2022",1,"Buzdolabi",7500));
coin.addBlock(new block(2,"01/02/2022",2,"Elektrikli Supurge",2500));
coin.addBlock(new block(3,"07/02/2022",1,"Bulaşık Makinesi",5000));
coin.addBlock(new block(4,"15/07/20220",1,"Klima",10000));

console.log(JSON.stringify(coin, null, 5));