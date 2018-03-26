
export default class Page {

    constructor(meta, blocks){
        this.meta = meta
        this.blocks = blocks
    }

    getBlock(name, totalToSkip = 0){
        let totalSkipped = 0
        for(let block of this.blocks){
            if(totalSkipped !== totalToSkip){
                totalSkipped++
            }
            if(block.name === name && totalSkipped === totalToSkip){
                return block.html
            }
        }
        return 'Block not found'
    }
}
