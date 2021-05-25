const { builtinModules } = require("module");

class Node {

    constructor() {
        this.branches = {};
    }

    get_words_recursive(prefix, idx = 0) {

        // If the end of the prefix is reached, call another method to get all stored words from that node on.
        if(idx >= prefix.length) return this.get_all_words_of_node(prefix);

        // Go through all nodes to reach end of prefix.
        const char = prefix[idx];

        // If the prefix is nonexistent then return an empty list.
        if( !(char in this.branches ) ) return [];
        
        return this.branches[char].get_words_recursive(prefix, idx + 1);
    }

    get_all_words_of_node(word = '', list = []) {

        // Loop through all branches and recursivley the method to get all words of those nodes.
        for(let key of Object.keys(this.branches)) {
            const node = this.branches[key];
            node.get_all_words_of_node(word + key, list);
        }

        // If a node marks the end of a word then push it to the list.
        if(this.mark_word_end) list.push(word);

        return list;
    }

    add_word_recursive(word, idx = 0) {

        // Get current char.
        const char = word[idx];
        
        // If char is not present create a new Node.
        if( !(char in this.branches) )
            this.branches[char] = new Node();

        // Call the add_word_recursive function on the node the corresponding character.
        if(idx < word.length) 
            this.branches[char].add_word_recursive(word, idx + 1);
        else
            this.mark_word_end = true;
    }

}

class Trie {

    static Node = Node

    constructor() {
        this.root = new Node();
    }

    add_words(words) {
        words.forEach( word => this.add_word(word) );
    }

    add_word(word) {
        this.root.add_word_recursive(word.toLowerCase());
    }

    get_words(prefix) {
        return this.root.get_words_recursive(prefix.toLowerCase());
    }
}

module.exports = {
    Trie
}