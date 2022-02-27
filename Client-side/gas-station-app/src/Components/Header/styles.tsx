import styled from 'styled-components';

export const Container = styled.div`
    height: 60px;
    background: ${props => props.theme.colors.primary};
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;

    button {
        background: ${props => props.theme.colors.primary};
        color: #FFF;
        display: flex;
        align-items: center;
        padding: 10px 40px 10px 40px;
        border: none;
        border-radius: 15px;
    }

    button:hover {
        background: ${props => props.theme.colors.secondary};
    }

    
`;
