import { h } from 'hyperbien';
import { style } from 'hyperbien/style';

import stylesheet from './test.css';

export default style(This => ({
    H1: (props, children) => <h1>{children}: {props.name}</h1>,
    Medium: (props, children) => <h2 {...props}>{children}</h2>,
    MediumBis: (props, children) => <This.Medium {...props}>Medium Bis: {children}</This.Medium>
}))(
    stylesheet
);
