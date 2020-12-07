const //

    getFrom = (args) => {

        let //
            state = {}, actions = {}, view = false, container = document.getElementById('app') || document.body;

        if (args.length == 1) {
            let o = args[0];
            state = 'state' in o ? o.state : state;
            actions = 'actions' in o ? o.actions : actions;
            view = 'view' in o ? o.view : view;
            container = 'container' in o ? o.container : container;
        } else {
            state = args[0] || state;
            actions = args[1] || actions;
            view = args[2] || view;
            container = args[3] || container;
        }

        return {
            state,
            actions,
            view,
            container
        };

    };

export default fn => (...args) => {

    const // 

        { state = {}, actions = {}, view, container } = getFrom(args),

        that = fn({
            state,
            actions,
            view,
            container
        });

    return {
        state: Object.assign(state, that.state || {}),
        actions: Object.assign(that.actions || {}, actions),
        view: that.view,
        container
    };

};