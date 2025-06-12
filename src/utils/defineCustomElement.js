function defineCustomElement (name, constructor) {
    if (!customElements.get(name)) {
        customElements.define(name, constructor);
        return true;
    }

    return false;
}

export default defineCustomElement;