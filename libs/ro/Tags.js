"use strict";
class ITaggable {
}
exports.ITaggable = ITaggable;
class Tags {
    constructor() {
        this.words = [];
    }
    add(word) {
        let index = this.findIndex(word);
        if (index != -1)
            return;
        this.words.push(word);
    }
    findIndex(word) {
        return this.words.indexOf(word);
    }
    del(word) {
        let index = this.findIndex(word);
        if (index == -1)
            return;
        this.words.splice(index, 1);
    }
    clone() {
        let t = new Tags();
        t.words = this.words.slice(0);
        return t;
    }
}
exports.Tags = Tags;
//# sourceMappingURL=Tags.js.map