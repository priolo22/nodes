

export class ITaggable {
    tags:Tags;
}

export class Tags {
    constructor() {
        this.words = [];
    }

    /**
     * sono gli id dei nodi dentro i quali sono gia' "entrati"
     */
    private words:string[];

    public add ( word:string ) {
        let index = this.findIndex(word);
        if ( index != -1 ) return;
        this.words.push(word);
    }

    public findIndex ( word:string ): number {
        return this.words.indexOf(word);
    }

    public del ( word:string ) {
        let index = this.findIndex(word);
        if ( index == -1 ) return;
        this.words.splice ( index, 1 );
    }
} 