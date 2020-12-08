'use strict';

import 'babel-polyfill';

import { h, app } from '../index';
import layout from '../layout';
import routes from '../router';
import xhr from '../xhr';
import utils from '../utils';

import collection from './builds/test';


const //

    { H1, Medium, MediumBis } = collection,

    Layout = layout(({ state, actions, view, container }) => ({

        view: (state, actions) => (
            <div>
                <h1>LAYOUT WHO={state.who}</h1>
                <div>{view(state, actions)}</div>
            </div>
        )

    }));

new Promise((resolve, reject) => {

    const { state, actions, view, container } = routes(({ state, actions, view, container }) => ({

        // les variables à inclure systématiquement dans le state
        state: {
            i: 0
        },

        // les fonctions à inclure aux actions
        actions: {
            sub: () => (state, actions) => {
                state.i = state.i - 1;
                //actions.sub_preview && actions.sub_preview()(state, actions)
            },
            add: () => (state, actions) => {
                state.i = state.i + 1;
                //actions.up_preview && actions.up_preview()(state, actions)

            }
        },

        // définition des routes
        routes: [
            {
                path: 'hello/:who',
                view: {
                    view: (state, actions) => (
                        <div class="Medium">
                            <H1 name="toto">it works</H1>
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
                view: () => import('./imported_view')//.then(({ view }) => view)
            },

        ],

        container: document.getElementById('app'),

        // callback pour toutes les routes
        callback: resolve

    }))();

    if (!view)
        reject({ state, actions, view, container });

}).then((Route) => {

    app(Layout(Route));

}).catch(params => {

    params.view = () => <div>La page demandée n'existe pas</div>;
    app(Layout(params));

})