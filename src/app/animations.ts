import {
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes, AnimationEntryMetadata
} from '@angular/core';

export const routerTransition: AnimationEntryMetadata =



    trigger('routerTransition', [

        state('void', style({ position: 'absolute', width: '100%', height: '100%', opacity: 0 })),
        state('*', style({ position: 'absolute', width: '100%', height: '100%', opacity: 1 })),

        transition(':enter', [
            style({ transform: 'translateY(20%)', opacity: 0 }),
            animate('0.8s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
        ]),

        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.8s ease-in-out', style({ transform: 'translateY(-20%)', opacity: 0 }))
        ])

    ]);
export const moveIn: AnimationEntryMetadata =

    trigger('moveIn', [
        state('void', style({ position: 'initial', width: '100%' })),
        state('*', style({ position: 'initial', width: '100%' })),
        transition(':enter', [
            style({ opacity: '0', transform: 'translateX(100px)' }),
            animate('1s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
        ]),
        transition(':leave', [
            style({ opacity: '1', transform: 'translateX(0)' }),
            animate('.8s ease-in-out', style({ opacity: '0', transform: 'translateX(-200px)' }))
        ])
    ]);



export const moveInLeft: AnimationEntryMetadata =

    trigger('moveInLeft', [

        state('void', style({})),
        state('*', style({})),

        transition(':enter', [
            style({ opacity: '0', transform: 'translateX(-100px)' }),
            animate('.6s .2s ease-in-out', style({ opacity: '1', transform: 'translateX(0)' }))
        ]),

        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.8s ease-in-out', style({ transform: 'translateY(-20%)', opacity: 0 }))
        ])
    ]);
