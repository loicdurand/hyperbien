let that = {};

export default fn => (...args) => {

    args.map(arg => that = Object.assign(that, arg));
    that = Object.assign(that, fn(that));

    const // 

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
        ).test(path)),

        isFunc = o => ({}.toString.call(o)) === '[object Function]';

    if (match) {

        match.path.split(separator)
            .map((exp, i) => exp.charAt(0) == ':' && (that.state[exp.substr(1)] = path.split(separator)[i]));

        for (let prop in match.state)
            that.state[prop] = isFunc(match.state[prop]) ? match.state[prop](that.state) : match.state[prop];

        if (isFunc(match.view)) {

            match.view().then(match => {
                that.state = { ...match.state, ...that.state, ...match.view.state };
                that.actions = { ...match.actions, ...that.actions, ...match.view.actions };
                that.view = match.view.view;
                callback && callback(that);
            });

        } else {
            that = Object.assign(that, match.view);
            callback && callback(that);
        }

        that.view = true;
        return that;

    };

    return that;

};
