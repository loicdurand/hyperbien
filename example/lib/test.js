import { style, h } from 'hyperbien';

import stylesheet from './test.css';

const // 

    Collection = style(This => ({
        H1: (props, children) => <h1>{children}: {props.name}</h1>,
        Medium: (props, children) => <h2 {...props}>{children}</h2>,
        MediumBis: (props, children) => <This.Medium {...props}>Medium Bis: {children}</This.Medium>
    }))(
        stylesheet
    );

export default Collection;