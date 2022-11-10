interface IPointerize {
    element__root: HTMLElement;
    element__svg: SVGSVGElement | null;
    element__svg_container: HTMLDivElement | null;
    options__merged: IOptionsMerged;
    start(): void;
    stop(): void;
    hide(): void;
    show(): void;
}
interface IOptionsShapeRatio {
    type: 'size' | 'radius' | 'intensity';
    options: {
        type?: 'alternate' | 'accumulate';
        value: number;
    };
}
interface IOptionsShapeGuide {
    type: 'position' | 'pattern' | 'motion';
    options?: {
        preset?: 'circle';
        custom?: IElement;
        shapes?: IOptionsShape[];
        area?: 'fill' | 'stroke';
        ratios?: {
            tile?: number;
            gap?: {
                row: number;
                column: number;
            };
        };
    };
}
interface IOptionsShape {
    type: 'ellipse' | 'rect' | 'circle' | 'line' | 'polyline' | 'polygon' | 'path' | 'rectangle' | 'triangle' | 'square' | 'star' | 'image' | 'use';
    sides?: number;
    ratios?: IOptionsShapeRatio[];
    guides?: IOptionsShapeGuide[];
    svg_attributes?: {
        stroke?: string;
        'stroke-width'?: string;
        'stroke-opacity'?: string;
        'stroke-linecap'?: 'butt' | 'round' | 'square';
        'stroke-linejoin'?: 'arcs' | 'bevel' | 'miter' | 'miter-clip' | 'round';
        'stroke-dasharray'?: string;
        'stroke-dashoffset'?: string;
        'stroke-miterlimit'?: string;
        fill?: string;
        'fill-opacity'?: string;
        'fill-rule'?: 'nonzero' | 'evenodd';
        x?: string;
        y?: string;
        width?: string;
        height?: string;
        rx?: string;
        ry?: string;
        r?: string;
        cx?: string;
        cy?: string;
        x1?: string;
        y1?: string;
        x2?: string;
        y2?: string;
        points?: string;
        d?: string;
        transform?: string;
        'clip-path'?: string;
        'clip-rule'?: 'nonzero' | 'evenodd' | 'inherit';
        [key: string]: string | undefined;
    };
    animations?: IAnimationsOptions[];
    effects?: IEffectsOptions[];
}
interface IOptionsShapeMerged extends Omit<IOptionsShape, 'size' | 'ratio'> {
    size: number;
    ratios: {
        type: 'size' | 'radius' | 'intensity';
        options: {
            type?: 'alternate' | 'accumulate';
            value: number;
        };
    }[];
}
interface ICssAnimation {
    css_properties: {
        'animation-delay'?: string;
        'animation-direction'?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
        'animation-duration'?: string;
        'animation-fill-mode'?: 'none' | 'forwards' | 'backwards' | 'both';
        'animation-iteration-count'?: 'infinite' | string;
        'animation-name'?: string;
        'animation-play-state'?: 'running' | 'paused';
        'animation-timing-function'?: string;
        'transform-origin'?: string;
    };
    keyframes?: {
        keyframe_selector?: string;
        css_properties?: {
            [key: string]: string;
        };
    }[];
}
interface IAnimationsOptions extends Omit<ICssAnimation, 'css_properties'> {
    preset?: 'rotate';
    when?: string | string[];
    css_properties?: {
        'animation-delay'?: string;
        'animation-direction'?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
        'animation-duration'?: string;
        'animation-fill-mode'?: 'none' | 'forwards' | 'backwards' | 'both';
        'animation-iteration-count'?: 'infinite' | string;
        'animation-name'?: string;
        'animation-play-state'?: 'running' | 'paused';
        'animation-timing-function'?: string;
        'transform-origin'?: string;
    };
}
interface IEffectsOptions {
    preset?: 'glow';
    custom?: IElement;
}
interface IOptions {
    css_selector__root?: string;
    element__svg?: {
        svg_attributes?: {
            [key: string]: string;
        };
        css_properties?: {
            [key: string]: string;
        };
    };
    element__svg_container?: {
        css_properties?: {
            [key: string]: string;
        };
    };
    interactions?: IOptionsInteractions[];
    size?: {
        inner?: number;
        outer?: number;
    };
    preset?: string;
    shapes?: IOptionsShape[];
    animations?: IAnimationsOptions[];
    effects?: IEffectsOptions[];
    system_preferences?: {
        respect_reduced_motion: boolean;
    };
}
interface IOptionsInteractions {
    type: 'pointer__scale' | 'pointer';
    options?: {
        css_selector__root?: string;
        default_pointer?: boolean;
        start_criteria?: IStartCriteria | 'none';
        elements?: string[];
    };
}
interface IStartCriteria {
    criteria?: string;
    frequency?: 'once' | 'always';
}
interface IOptionsMerged extends Omit<IOptions, 'size' | 'shapes' | 'css_selector__root' | 'css_properties'> {
    css_selector__root: string;
    css_properties: {
        [key: string]: string | undefined;
    };
    size: {
        inner: number;
        outer: number;
    };
    shapes?: IOptionsShapeMerged[];
}
interface IElement {
    element: string;
    svg_attributes?: {
        [key: string]: string;
    };
    element_children?: IElement[];
}

declare class Pointerize implements IPointerize {
    #private;
    element__root: HTMLElement;
    options__merged: IOptionsMerged;
    element__svg: SVGSVGElement | null;
    element__svg_container: HTMLDivElement | null;
    id: string | undefined;
    constructor(options: IOptions);
    start(): void;
    stop(): void;
    hide(): void;
    show(): void;
}

export { Pointerize as default };
