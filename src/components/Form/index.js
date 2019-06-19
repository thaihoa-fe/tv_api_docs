import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 1.5rem;
  margin: 20px 0 30px 0;
`;

export const Label = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

export const Field = styled.div`
  margin: 0 0 28px 0;
`;

export const Spacer = styled.span`
  display: inline-block;
  width: ${props => props.width || '8px'};
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  line-height: 0;
  margin-bottom: 10px;
`;
