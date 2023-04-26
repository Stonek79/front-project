import {
    memo, ReactNode, useCallback, useEffect,
} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTheme } from '@/app/providers/ThemeProvider';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components/AnimationProvider';
import cls from './Drawer.module.scss'
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
    className?: string
    isOpen?: boolean
    children?: ReactNode
    onClose?: () => void
    lazy?: boolean
}

const height = window.innerHeight - 100;

const DrawerContent = memo((props: DrawerProps) => {
    const { Spring, Gesture } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
    const {
        className,
        isOpen,
        children,
        onClose,
        lazy,
    } = props
    const { theme } = useTheme()

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);

    const close = (velocity = 0) => {
        console.log(velocity, 'velocity')
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    };

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel();

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    console.log(height, y)
    const display = y.to((py) => (py < height ? 'block' : 'none'));

    return (
        <Portal>
            <div className={classNames(cls.Drawer, {}, [className, theme, 'app_drawer'])}>
                <Overlay onClick={close}>
                    <Spring.a.div
                        className={cls.sheet}
                        style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
                        {...bind()}
                    >
                        {children}
                    </Spring.a.div>
                </Overlay>
            </div>
        </Portal>
    );
});

const DrawerAsync = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
}

export const Drawer = (props: DrawerProps) => (
    <AnimationProvider>
        <DrawerAsync {...props} />
    </AnimationProvider>
)
