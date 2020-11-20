import { assoc, h } from 'hyperbien';

import style from './test.css';

const // 

    Collection = assoc(This => ({
        H1: (props, children) => <h1>{children}: {props.name}</h1>,
        Medium: (props, children) => <h2 {...props}>{children}</h2>,
        MediumBis: (props, children) => <This.Medium {...props}>Medium Bis: {children}</This.Medium>
    }))(
        style
    );

export default Collection;