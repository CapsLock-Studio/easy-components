import type { CSSInterpolation } from '../../../StyleContext';
import { Keyframes } from '../../../StyleContext';
import type { AliasToken } from '../../theme/internal';
import type { TokenWithCommonCls } from '../../theme/util/genComponentStyleHook';
export declare const moveDownIn: Keyframes;
export declare const moveDownOut: Keyframes;
export declare const moveLeftIn: Keyframes;
export declare const moveLeftOut: Keyframes;
export declare const moveRightIn: Keyframes;
export declare const moveRightOut: Keyframes;
export declare const moveUpIn: Keyframes;
export declare const moveUpOut: Keyframes;
type MoveMotionTypes = 'move-up' | 'move-down' | 'move-left' | 'move-right';
export declare const initMoveMotion: (token: TokenWithCommonCls<AliasToken>, motionName: MoveMotionTypes) => CSSInterpolation;
export {};
