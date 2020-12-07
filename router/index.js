const // 

    isFunc = o => ({}.toString.call(o)) === '[object Function]',

    getFrom = args => {

        let //
            state = {}, actions = {}, view = (props, children) => <div>{children}</div>, container = document.getElementById('app') || document.body;

        if (args.length == 1) {
            const o = args[0];
            if (isFunc(o))
                view = o;
            else {
                state = 'state' in o ? o.state : state;
                actions = 'actions' in o ? o.actions : actions;
                view = 'view' in o ? o.view : view;
                container = 'container' in o ? o.container : container;

            }
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

        { state, actions, view, container } = getFrom(args),

        that = fn({
            state,
            actions,
            view,
            container
        }),

        {
            separator = '/',
            path = location.pathname.substr(1) || 'index',
            routes = [],
            callback = false
        } = that,

        match = routes.find(({ path: route_path }) => new RegExp(
            '^' + route_path.split(separator)
                .filter(Boolean)
                .map(exp => exp == '*' || exp.charAt(0) == ':' ? '.*' : exp.replace(/\*/g, '.*'))
                .join('/')
        ).test(path));

    that.state = Object.assign(that.state, state);
    that.actions = Object.assign(that.actions, actions);
    that.container = container;

    if (match) {

        match.path.split(separator)
            .map((exp, i) => exp.charAt(0) == ':' && (that.state[exp.substr(1)] = path.split(separator)[i]));

        for (let prop in match.state)
            if ({}.toString.call(match.state[prop]) === '[object Function]') {
                that.state[prop] = match.state[prop](that.state);
            } else
                that.state[prop] = match.state[prop];

        if (isFunc(match.view)) {

            match.view().then(match => {
                that.state = Object.assign(that.state, match.state || {});
                that.actions = Object.assign(match.actions || {}, that.actions);
                that.view = match.view;
                callback && callback(that);
            });

        } else {
            that.state = Object.assign(that.state, match.view.state || {});
            that.actions = Object.assign(match.view.actions || {}, that.actions);
            that.view = match.view.view;
            callback && callback(that);
        }

    };

    return {
        state: that.state,
        actions: that.actions,
        view: that.view,
        container: that.container
    };

};
