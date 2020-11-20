let _id = Math.floor(Math.random() * 1e6);

export default collection => decls => {

    const //
        isFunc = o => ({}.toString.call(o)) === '[object Function]',
        cpntRE = cpnt => new RegExp('(^' + cpnt + '|[^\da-zA-Z#\.]' + cpnt + '){1}[^\da-zA-Z]', 'gm'),
        style = document.createElement("style"),
        output = {},
        Collection = isFunc(collection) ? collection(output) : collection;

    // if you don't pre-build your components using my own "ld-bundler" library, skip directly to the ELSE statement
    if (typeof decls == 'object') {
        for (let cpnt in Collection)
            output[cpnt] = (props, children) => {
                const attrs = props === null ? { class: '' } : props;
                attrs.class = attrs.class || '';
                attrs.class += ' ' + id;
                return Collection[cpnt](attrs, children);
            };

        return output;

    } else {

        let //
            rules = decls.toString();

        for (let cpnt in Collection) {
            let id = 'C' + _id++;
            rules = rules.replace(cpntRE(cpnt), m => m.replace(new RegExp(cpnt), '.' + id))
            output[cpnt] = (props, children) => {
                const attrs = props === null ? { class: '' } : props;
                attrs.class = attrs.class || '';
                attrs.class += ' ' + id;
                return Collection[cpnt](attrs, children);
            };
        }

        style.rel = "stylesheet";
        style.innerText = rules;
        document.head.appendChild(style);

        return output;

    }

};