
export default ({ Utils: { h } }, actions, { Big, Medium }) => ({

    state: {
        sub_preview: -1,
        up_preview: 1
    },

    actions: {
        sub_preview: () => (state, actions) => {
            state.sub_preview = state.i - 1;
            state.up_preview = state.i + 1;
            return state;
        },
        up_preview: () => (state, actions) => {
            state.sub_preview = state.i - 1;
            state.up_preview = state.i + 1;
            return state;
        }
    },

    view: (state, actions) => (
        <div>
            <Big name="toto">coucou</Big>
            <Medium id="result">{state.i}</Medium>
            <button class="btn red" onclick={actions.sub}>-1 ( affichera {state.sub_preview})</button>
            <button class="btn" onclick={actions.add}>+1 ( affichera {state.up_preview})</button>
        </div>
    )
});