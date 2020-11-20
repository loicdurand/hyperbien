let _id = Math.floor(Math.random() * 1e6);

export default collection => decls => {

    const //
        isFunc = o => ({}.toString.call(o)) === '[object Function]',
        cpntRE = cpnt => new RegExp('[^\da-zA-Z#\.]' + cpnt + '{1}[^\da-zA-Z]', 'gm'),
        style = document.createElement("style"),
        output = {},
        Collection = isFunc(collection) ? collection(output) : collection,
        rules = [decls.toString()];

    for (let cpnt in Collection) {
        let id = 'C' + _id++;
        rules.push(rules.join('').replace(cpntRE(cpnt), m => m.replace(new RegExp(cpnt), '.' + id)));
        output[cpnt] = (props, children) => {
            const attrs = props === null ? { class: '' } : props;
            attrs.class = attrs.class || '';
            attrs.class += ' ' + id;
            return Collection[cpnt](attrs, children);
        };
    }

    style.rel = "stylesheet";
    style.innerText = rules.join('');
    document.head.appendChild(style);

    return output;

};