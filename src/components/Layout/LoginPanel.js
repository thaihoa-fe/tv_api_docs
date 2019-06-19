import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import Form, { Field, ErrorMessage } from '@atlaskit/form';
import styled from 'styled-components';

import logo from '../../assets/logo.svg';

const Panel = styled.div`
  display: flex;
  width: 560px;
  max-width: 100%;
  margin: 0 auto;
  flex-direction: column;
  background: #fff;
  padding: 50px 70px 40px 70px;
  border-radius: 10;
`;

const FormTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  img {
    margin: 0;
    width: 180px;
  }
  div {
    font-weight: 400;
    font-size: 2em;
    border-left: 1px solid rgb(235, 236, 240);
    margin-left: 18px;
    padding-left: 18px;
  }
`;

const StyledField = styled.div`
  margin-bottom: 28px;
  label {
    text-transform: uppercase;
    margin-bottom: 8px;
  }
`;

function textfield(defaultThemeFn, themeProps) {
  const { input, container } = defaultThemeFn(themeProps);

  return {
    input: {
      ...input,
      boxSizing: 'content-box',
      fontSize: '20px',
      paddingLeft: '12px',
    },
    container,
  };
}

function LoginPanel({ onSubmit, formError, clearFormError }) {
  const handleChange = onChange => (...rest) => {
    clearFormError();
    onChange(...rest);
  };

  return (
    <Panel>
      <FormTitle>
        <img src={logo} alt="Trusting Social" />
        <div>API docs</div>
      </FormTitle>
      <Form onSubmit={onSubmit}>
        {({ formProps, submitting, dirty }) => (
          <form {...formProps}>
            <StyledField>
              <Field name="user_name" label="Username" defaultValue="" validate={val => !val}>
                {({ fieldProps, error }) => (
                  <>
                    <TextField
                      autoComplete="off"
                      {...fieldProps}
                      onChange={handleChange(fieldProps.onChange)}
                      theme={textfield}
                    />
                    {error && <ErrorMessage>Please enter username.</ErrorMessage>}
                  </>
                )}
              </Field>
            </StyledField>
            <StyledField>
              <Field name="password" label="Password" defaultValue="" validate={val => !val}>
                {({ fieldProps, error }) => {
                  return (
                    <>
                      <TextField
                        type="password"
                        {...fieldProps}
                        onChange={handleChange(fieldProps.onChange)}
                        theme={textfield}
                      />
                      {error && <ErrorMessage>Please enter password.</ErrorMessage>}
                    </>
                  );
                }}
              </Field>
            </StyledField>
            {formError && <ErrorMessage>{formError}</ErrorMessage>}
            <Button
              type="submit"
              appearance="primary"
              isLoading={submitting}
              isDisabled={!dirty || submitting}
              theme={(themeFn, themeProps) => {
                const { buttonStyles, spinnerStyles } = themeFn(themeProps);
                return {
                  buttonStyles: {
                    ...buttonStyles,
                    fontSize: '1.2em',
                    marginTop: '24px',
                    padding: '6px 30px',
                    boxSizing: 'content-box',
                    borderRadius: '50px',
                  },
                  spinnerStyles,
                };
              }}
            >
              SIGN IN
            </Button>
          </form>
        )}
      </Form>
    </Panel>
  );
}

LoginPanel.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formError: PropTypes.string,
  clearFormError: PropTypes.func.isRequired,
};

LoginPanel.defaultProps = {
  formError: '',
};

export default LoginPanel;
