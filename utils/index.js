const isNode = o => o && o.nodeType === Node.ELEMENT_NODE;

export default {

    is: {
        null: o => o === null,
        undefined: o => o === undefined,
        string: o => o.constructor === 'test'.constructor,
        number: o => !isNaN(o),
        array: o => o.constructor === [].constructor,
        obj: o => o.constructor === ({}).constructor,
        func: o => ({}.toString.call(o)) === '[object Function]',
        node: isNode,
    },

    /**
     * string functions
     */

    addZeros: (str, maxlen = 2) => {
        str = '' + str;
        while (str.length < maxlen)
            str = "0" + str;
        return str;
    },

    escapeHTML: text => text.replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    })[m]),

    noAccent: str => {

        const // 
            accents = [
                /[\300-\306]/g, /[\340-\346]/g, // A, a
                /[\310-\313]/g, /[\350-\353]/g, // E, e
                /[\314-\317]/g, /[\354-\357]/g, // I, i
                /[\322-\330]/g, /[\362-\370]/g, // O, o
                /[\331-\334]/g, /[\371-\374]/g, // U, u
                /[\321]/g, /[\361]/g, // N, n
                /[\307]/g, /[\347]/g, // C, c
            ]
            , noaccents = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

        for (var i = 0; i < accents.length; i++)
            str = str.replace(accents[i], noaccents[i]);

        return str;
    },

    capitalize: str => {
        if (str == '')
            return str;
        return str.split(/\s/).map(txt => {
            // capitalise la 1ère lettre de chaque mot
            let capAfterSpaces = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            // capitalise la 1ère lettre suivant un tiret ou un apostrophe
            return capAfterSpaces.replace(/[-'].{1}/, m => m.toUpperCase())
        }).join(' ');

    },

    pluralize: (nb, sing, plur) => (isNaN(nb) || +nb > 1) ? plur || (sing + 's') : sing,

    unicId: () => Math.random().toString(36).substr(2, 9),

    /**
     * DOM functions
     */

    empty: target => {
        target = isNode(target) ? target : document.querySelector(target);
        if (target)
            target.innerHTML = "";
        return target;
    },

    insertAfter: (referenceNode, newNode) => {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },

    onReady: async selector => {
        while (document.querySelector(selector) === null)
            await new Promise(resolve => requestAnimationFrame(resolve))
        return document.querySelector(selector);
    },

    getParent: (elt, match) => {
        while (!elt.matches(match) && elt.parentElement.nodeName != 'BODY' && elt.parentElement.parentElement)
            elt = elt.parentElement;
        return elt;
    }

};