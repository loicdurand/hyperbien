import { style, h } from 'hyperbien';

import './test.css';
import stylesheet from './stylesheet.def.js';

const // 

    Collection = style(This => ({
        H1: (props, children) => <h1>{children}: {props.name}</h1>,
        Medium: (props, children) => <h2 {...props}>{children}</h2>,
        MediumBis: (props, children) => <This.Medium {...props}>Medium Bis: {children}</This.Medium>
    }))(
        stylesheet
    );

export default Collection;