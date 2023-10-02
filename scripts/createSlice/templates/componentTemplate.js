const interfaceConst = 'interface'

module.exports = (componentName) => `
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './${componentName}.module.scss';

${interfaceConst} ${componentName}Props {
    className?: string;
}

export const ${componentName} = memo((props: ${componentName}Props) => {
    const { className } = props;
    const { t } = useTranslation();
    
    const cn = classNames(cls.${componentName}, {}, [className])
    
    return (
        <div className={cn}>
           {}
        </div>
    );
});`
