
export default class Page {

    constructor(meta, blocks){
        this.meta = meta
        this.blocks = blocks
    }

    getBlock(name){
        for(let block of this.blocks){
            if(block.name === name){
                return block.html
            }
        }
        return 'Block not found'
    }
}
