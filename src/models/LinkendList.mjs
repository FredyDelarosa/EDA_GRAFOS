/* LinendList.mjs */
import Node from "./Node.mjs";
import Location from "./Location.mjs";

export default class LinkedList {
    #head;
    #count;

    constructor() {
        this.#head = null;
        this.#count = 0;
    }

    push(locationName, distance) {
        let location = new Location(locationName, distance);
        let node = new Node(location);
        if (this.#head === null) {
            this.#head = node;
        } else {
            let current = this.#head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.#count++;
    }

    size() {
        return this.#count;
    }

    isEmpty() {
        return this.#head === null;
    }

    getElementAt(index) {
        if (index >= 0 && index < this.#count) {
            let node = this.#head;
            for (let i = 0; i < index && node !== null; i++) {
                node = node.next;
            }
            return node;
        }
        return null;
    }

    getHead() {
        return this.#head;
    }

    toArray() {
        const elements = [];
        for (let current = this.#head; current !== null; current = current.next) {
            elements.push(current.value);
        }
        return elements;
    }
}
