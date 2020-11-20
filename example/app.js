'use strict';

import { h, app } from '../index';
import routes from '../router';
import style from '../style';
import xhr from '../xhr';

import imported_view from './imported_view';

routes({
    // les composants / objets à intégrer
    collection: style(This => ({
        Big: (props, children) => <h1>{children}: {props.name}</h1>,
        Medium: (props, children) => <h2 {...props}>{children}</h2>,
        MediumBis: (props, children) => <This.Medium {...props}>Medium Bis: {children}</This.Medium>
    }))`
        Big{
            color: blue;
        }
        Medium{
            color: red;
            border: 1px solid;
        }
    `,
    // le composant <Layout /> de la forme (props,children) => <Layout {...props}>{children}</Layout>
    layout: (state, actions) => (
        <div>
            {state.who && <h1>{actions.greet(state.who)}</h1>}
            <div>{actions}</div>
        </div>
    ),
    // les variables à inclure systématiquement dans le state
    state: {
        Utils: { h },
        i: 0,
    },
    // les fonctions à inclure aux actions
    actions: {
        greet: name => 'hello ' + name,
        sub: () => (state, actions) => {
            state.i = state.i - 1;
            'sub_preview' in actions && actions.sub_preview()(state, actions)
            return state;
        },
        add: () => (state, actions) => {
            state.i = state.i + 1;
            'up_preview' in actions && actions.up_preview()(state, actions);
            return state;
        }
    },
    // définition des routes
    routes: [
        {
            path: 'hello/:who',
            view: {
                view: (state, actions, { Big, Medium, MediumBis }) => (
                    <div>
                        <Big name="toto">coucou</Big>
                        <Medium id="result">{state.i}</Medium>
                        <MediumBis>hi</MediumBis>
                        <button class="btn red" onclick={actions.sub}>-1</button>
                        <button class="btn" onclick={actions.add}>+1</button>
                    </div>
                )
            }
        },
        // page d'accueil
        {
            path: 'index',
            view: imported_view,
        },

    ],
    // callback appelé pour toutes les routes
    callback: route => app(route)

});