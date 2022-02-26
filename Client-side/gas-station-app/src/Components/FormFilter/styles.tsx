import styled from 'styled-components';

export const FormFilterContainer = styled.div`
    border-bottom: solid;
    border-color: ${props => props.theme.colors.primary};
    display: flex;
    align-items: center;
    padding: 15px 15px 15px;
`;

export const ItemContainer = styled.div`
    display: flex;
    text-align: right;
    justify-content: space-between;
    padding: 5px;
`;