function destroy() {

    console.log('destroy <%= title %> scene');
    console.log('-------');

    delete this.$camera;
    delete this.$controllers;
    delete this.$origins;
    delete this.$world;
}

export {destroy};
