import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Section>
          <h4>Contact</h4>
          <ul>
            <li>
              <p>소개팅</p>
            </li>

            <li>
              <p>미팅</p>
            </li>
          </ul>
        </Section>
        <Section>
          <h4>Information</h4>
          <p>이메일 : doogeunS2@gmail.com</p>
          <p>주소 : 서울특별시 광진구 능동로 120</p>
        </Section>
      </Container>

      <Copyright>
        <p>© 2023 Doogeun. All Rights Reserved.</p>
      </Copyright>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  background-color: #2a323b;
  color: #f5f5f5;
  padding: 1.5rem 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start; // Added this for vertical alignment
  max-width: 65rem;
  margin: auto;
`;

const Section = styled.div`
  color: #f5f5f5;
  max-width: 300px;
  margin: 1rem;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #f5f5f5;
    text-align: left; // Changed from center to left
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.5rem;
      text-align: left; // Changed from center to left
    }

    a,
    p {
      font-size: 1.1rem;
      line-height: 1.5;
      color: #f5f5f5;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Copyright = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  color: #f5f5f5;
  max-width: 65rem;
  margin: auto;
`;

export default Footer;
