'use strict';

import 'babel-polyfill';

import { assoc } from 'hyperbien';

import { h, app } from '../index';
import routes from '../router';
import style from '../style';
import xhr from '../xhr';
import utils from '../utils';

import imported_view from './imported_view';

import stylesheet from './app.css';

import Collection from './builds/test';

routes({
    // les composants / objets à intégrer
    collection,
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
                view: (state, actions, { H1, Medium, MediumBis }) => (
                    <div class="Medium">
                        <H1 name="toto">coucou</H1>
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