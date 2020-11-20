import style from './style';

const //
    refs = [],
    create = new Event('create'),
    empty = elt => !(elt.innerHTML = '') && elt,
    isObj = o => o.constructor === ({}).constructor,
    isFunc = o => ({}.toString.call(o)) === '[object Function]',
    isNode = o => o && o.nodeType === Node.ELEMENT_NODE;

export const assoc = style;

export const h = (nodeName, props, ...children) => {

    props = props === null ? {} : props;

    if (isFunc(nodeName)) {
        const { nodeName: name, props: attrs, textContent } = nodeName(props, children);
        return h(name, Object.assign(props, attrs), textContent);
    }

    const elt = document.createElement(nodeName);

    for (let prop in props)
        if (isFunc(props[prop]))
            elt.addEventListener(prop.substr(2).toLowerCase(), props[prop]);
        else
            elt.setAttribute(prop, props[prop]);

    children.map(child => {
        child = Array.isArray(child) ? child.join('') : child;
        if (isNode(child))
            elt.appendChild(child);
        else if (child || child === 0)
            elt.appendChild(document.createTextNode(child));
    });

    refs.push(elt);

    return elt;

};

export const app = (options, actions = options.actions, view = options.view, container = options.container) => {

    const //
        acts = {},
        collection = options.collection,
        state = 'state' in options ? options.state : options;

    for (let action in actions) {
        if (isFunc(actions[action])) {
            acts[action] = param => {
                const returnsFn = actions[action](param);
                if (!isFunc(returnsFn))
                    return returnsFn;
                const result = returnsFn(state, actions);

                app({
                    state,
                    actions,
                    view,
                    container: empty(container),
                    collection
                });
                return result;
            }
        }
    }

    container.appendChild(view(state, acts, collection));

    refs.map((elt) => {
        elt.dispatchEvent(create);
    });
    refs.length = 0;

};