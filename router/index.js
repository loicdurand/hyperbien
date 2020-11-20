const isFunc = o => ({}.toString.call(o)) === '[object Function]';

class Router {

    constructor(options = {}) {

        const // 

            {
                separator = '/',
                collection = {},
                path = location.pathname.substr(1) || 'index',
                layout = (props, children, collection) => children,
                state = {},
                actions = {},
                container = document.getElementById('app') || document.body,
                routes = [],
                callback = false,
            } = options,

            match = routes.find(({ path: route_path }) => new RegExp(
                '^' + route_path.split(separator)
                    .filter(Boolean)
                    .map(exp => exp == '*' || exp.charAt(0) == ':' ? '.*' : exp.replace(/\*/g, '.*'))
                    .join('/')
            ).test(path));

        this.state = state;
        this.actions = actions;
        this.container = container;
        this.collection = collection;

        if (match) {

            match.view = !isFunc(match.view) ? match.view : match.view(this.state, this.actions, this.collection);

            match.path.split(separator)
                .map((exp, i) => exp.charAt(0) == ':' && (this.state[exp.substr(1)] = path.split(separator)[i]));

            for (let prop in match.state)
                if ({}.toString.call(match.state[prop]) === '[object Function]') {
                    this.state[prop] = match.state[prop](this.state);
                } else
                    this.state[prop] = match.state[prop];

            this.state = Object.assign(this.state, match.view.state || {});
            this.actions = Object.assign(match.view.actions || {}, this.actions);
            this.view = (props, children, collection) => layout(props, Object.assign(match.view.view(props, children, collection), this.actions));

            callback && callback(this);

        };

        return {
            state: this.state,
            actions: this.actions,
            view: this.view,
            container: this.container,
            collection
        };

    }

};

export default options => new Router(options);