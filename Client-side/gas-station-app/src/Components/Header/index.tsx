import { FC, useContext} from 'react';
import Switch from 'react-switch';
import { shade } from 'polished';

import { Container } from './styles';
import { ThemeContext } from 'styled-components';

interface Props {
    toggleTheme(): void;
    toggleMap(): void;
    toggleGraph(): void;
}

export const Header: FC<Props> = ({ toggleTheme, toggleMap, toggleGraph }) => {
    const { colors, title } = useContext(ThemeContext);

    return (
        <Container>
            <h1>Gazify</h1>
            
            <button onClick={toggleMap}><h1>Map</h1></button>
            <button onClick={toggleGraph}><h1>Statistiques</h1></button>

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