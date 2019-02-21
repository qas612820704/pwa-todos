import styled from '@emotion/styled';

export const ToggleBtn = styled.input`
  opacity: 0;
  width: 1em;
  height: 1em;
  border: solid 1px;
  border-radius: 50%;

  &:after {
    content: '🗸';
    opacity: 0;
  }
  &:checked &:after {
    opacity: 1;
  }

`;
ToggleBtn.defaultProps = {
  type: 'checkbox',
}
