let that = {};

export default fn => (...args) => {

    args.map(arg => that = Object.assign(that, arg));
    that = Object.assign(that, fn(that));
    return that;

};