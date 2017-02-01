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
}
exports.Tags = Tags;
//# sourceMappingURL=Tags.js.map