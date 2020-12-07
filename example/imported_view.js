
import { h } from '../index';
import collection from './builds/test';

const { H1, Medium } = collection;

export const view = {

    state: {},

    actions: {},

    view: (state, actions) => (
        <div>
            <H1 name="toto">coucou</H1>
            <Medium id="result">{state.i}</Medium>
            <button class="btn red" onclick={actions.sub}>-1 ( affichera {state.i - 1})</button>
            <button class="btn" onclick={actions.add}>+1 ( affichera {state.i + 1})</button>
        </div>
    )

};