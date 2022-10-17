


export class BaseComponent{
    attributes: any;
    constructor({
        attributes
    }) {
        this.attributes = attributes
    }

    mapComponentAttributes(attributesMap: Array<any>) {
        const attributesMapping = attributesMap;
        attributesMapping.forEach(key => {
            if (!this.attributes[key]) {
                this.attributes[key] = { value: '' };
            }
        });
        return this.attributes;
    }

}