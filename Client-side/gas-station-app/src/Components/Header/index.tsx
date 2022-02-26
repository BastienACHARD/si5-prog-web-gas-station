import { FC, useContext} from 'react';
import Switch from 'react-switch';
import { shade } from 'polished';

import { Container } from './styles';
import { ThemeContext } from 'styled-components';

interface Props {
    toggleTheme(): void;
}

export const Header: FC<Props> = ({ toggleTheme }) => {
    const { colors, title } = useContext(ThemeContext);

    return (
        <Container>
            <h1>Gazify</h1>

            <Switch
            onChange={toggleTheme}
            checked={title === 'dark'}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={40}
            handleDiameter={20}
            offColor={shade(0.15, colors.primary)}
            onColor={colors.secondary}
            />
        </Container>
    );

};