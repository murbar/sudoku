import styled from 'styled-components';

export default styled.button`
  font-size: 1em;
  font-weight: bold;
  border: none;
  padding: 0.75rem 1.5rem;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  margin: 1rem 1rem 1rem 0;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;
