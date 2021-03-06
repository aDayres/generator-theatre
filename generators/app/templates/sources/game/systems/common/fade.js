import * as Ease from 'modules/ease.js';

function fade(entities) {

    Object.entries(entities).forEach(([name, entity]) => {

        const cameraComponent = entity.get('camera');
        const fadeComponent = entity.get('fade');

        if (fadeComponent.fade === null) {

            fadeComponent.fade = fadeComponent.opacity - cameraComponent.opacity;
        }

        const $source = fadeComponent.$easing;
        const $easing = (fadeComponent.$easing !== false ? this.snippets[$source.scope][$source.name]() : Ease.linear(1));

        const remaining = fadeComponent.duration - fadeComponent.elapsed;
        const delta = this.delta > remaining ? remaining : this.delta;

        const progress = (fadeComponent.elapsed + delta) / fadeComponent.duration;
        const faded = fadeComponent.fade * $easing(progress);

        cameraComponent.opacity += faded - fadeComponent.faded;
        fadeComponent.faded = faded;

        fadeComponent.elapsed += delta;

        if (fadeComponent.elapsed >= fadeComponent.duration
        && fadeComponent.$ending !== false) {

            const $source = fadeComponent.$ending;
            const $ending = this.snippets[$source.scope][$source.name];

            $ending(entity, this.delta - delta);
        }
    });
}

export {fade};
