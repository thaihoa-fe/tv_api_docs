import React from 'react';
import { storiesOf } from '@storybook/react';

import Explorer from '.';

const apiConfig = {
  name: 'API Docs',
  version: '1.0',
  baseURL: 'https://reqres.in',
  categories: [{ title: 'OTP SMS', items: ['loginAPI'] }],
  apis: {
    loginAPI: {
      title: 'Login API',
      description:
        'Login to **Trusting Social** *server* with `user_name` and `password` to get `access_token`\n\n* You use this token to authenticate all other APIs by putting it in the request header `Authorization: Bearer {access_token}`.\n* The token will expire after *24 hours*. The expiry time is subject to change.\n* The `access_token` is in *JSON Web Token* format. You can decode it to use the embedded info [jwt](https://jwt.io/).\n\n```\nbrew install curl\n```',
      method: 'POST',
      endpoint: '/api/login',
      headers: [
        {
          key: 'Content-Type',
          defaultValue: 'application/json',
          description: 'Request content type',
        },
        {
          key: 'Response-Type',
          defaultValue: 'application/json',
          description: 'Response content type',
        },
      ],
      body: [
        {
          key: 'email',
          type: 'String',
          defaultValue: 'eve.holt@reqres.in',
          description: '1 to 63 chars long. Only lowercase letters, numbers and underscore.',
          required: true,
        },
        {
          key: 'password',
          type: 'String',
          defaultValue: 'KYn59kZ*8B(K^ntyxC',
          description: '7 to 63 chars long, all characters',
          required: true,
        },
      ],
    },
    get: {
      title: 'Demo GET',
      description: 'Demo GET method description',
      method: 'GET',
      endpoint: '/api/users/:id',
      headers: [
        {
          key: 'Content-Type',
          defaultValue: 'application/json',
          description: 'Request content type',
        },
        {
          key: 'Response-Type',
          defaultValue: 'application/json',
          description: 'Response content type',
        },
      ],
      parameters: [
        {
          key: 'id',
          defaultValue: '1',
          description: 'User ID',
        },
      ],
    },
    post: {
      title: 'Demo POST',
      description: 'Demo POST method description',
      method: 'POST',
      endpoint: '/api/users',
      headers: [
        {
          key: 'Content-Type',
          defaultValue: 'application/json',
          description: 'Request content type',
        },
        {
          key: 'Response-Type',
          defaultValue: 'application/json',
          description: 'Response content type',
        },
      ],
      body: [
        {
          key: 'name',
          type: 'String',
          defaultValue: 'Nha Hoang',
          description: '1 to 63 chars long. Only lowercase letters, numbers and underscore.',
          required: true,
        },
        {
          key: 'job',
          type: 'String',
          defaultValue: 'Software Engineer',
          description: '7 to 63 chars long, all characters',
          required: true,
        },
      ],
    },
    put: {
      title: 'Demo PUT',
      description: 'Demo PUT method description',
      method: 'PUT',
      endpoint: '/api/users/:id',
      headers: [
        {
          key: 'Content-Type',
          defaultValue: 'application/json',
          description: 'Request content type',
        },
        {
          key: 'Response-Type',
          defaultValue: 'application/json',
          description: 'Response content type',
        },
      ],
      parameters: [
        {
          key: 'id',
          defaultValue: '1',
          description: 'User ID',
        },
      ],
      body: [
        {
          key: 'name',
          type: 'String',
          defaultValue: 'Nha Hoang',
          description: '1 to 63 chars long. Only lowercase letters, numbers and underscore.',
          required: true,
        },
        {
          key: 'job',
          type: 'String',
          defaultValue: 'Software Engineer',
          description: '7 to 63 chars long, all characters',
          required: true,
        },
      ],
    },
    delete: {
      title: 'Demo DELETE',
      description: 'Demo DELETE method description',
      method: 'DELETE',
      endpoint: '/api/users/:id',
      headers: [
        {
          key: 'Content-Type',
          defaultValue: 'application/json',
          description: 'Request content type',
        },
        {
          key: 'Response-Type',
          defaultValue: 'application/json',
          description: 'Response content type',
        },
      ],
      parameters: [
        {
          key: 'id',
          defaultValue: '1',
          description: 'User ID',
        },
      ],
    },
  },
};

storiesOf('API Explorer', module)
  .add('login', () => {
    const { loginAPI } = apiConfig.apis;

    return (
      <Explorer
        title={loginAPI.title}
        description={loginAPI.description}
        baseURL={loginAPI.baseURL || apiConfig.baseURL}
        endpoint={loginAPI.endpoint}
        method={loginAPI.method}
        defaultParams={loginAPI.parameters}
        defaultHeaders={loginAPI.headers}
        defaultBody={loginAPI.body}
      />
    );
  })
  .add('get', () => {
    const { get: getAPI } = apiConfig.apis;

    return (
      <Explorer
        title={getAPI.title}
        description={getAPI.description}
        baseURL={getAPI.baseURL || apiConfig.baseURL}
        endpoint={getAPI.endpoint}
        method={getAPI.method}
        defaultParams={getAPI.parameters}
        defaultHeaders={getAPI.headers}
        defaultBody={getAPI.body}
      />
    );
  })
  .add('post', () => {
    const { post: postAPI } = apiConfig.apis;

    return (
      <Explorer
        title={postAPI.title}
        description={postAPI.description}
        baseURL={postAPI.baseURL || apiConfig.baseURL}
        endpoint={postAPI.endpoint}
        method={postAPI.method}
        defaultParams={postAPI.parameters}
        defaultHeaders={postAPI.headers}
        defaultBody={postAPI.body}
      />
    );
  })
  .add('put', () => {
    const { put: putAPI } = apiConfig.apis;

    return (
      <Explorer
        title={putAPI.title}
        description={putAPI.description}
        baseURL={putAPI.baseURL || apiConfig.baseURL}
        endpoint={putAPI.endpoint}
        method={putAPI.method}
        defaultParams={putAPI.parameters}
        defaultHeaders={putAPI.headers}
        defaultBody={putAPI.body}
      />
    );
  })
  .add('delete', () => {
    const { delete: deleteAPI } = apiConfig.apis;

    return (
      <Explorer
        title={deleteAPI.title}
        description={deleteAPI.description}
        baseURL={deleteAPI.baseURL || apiConfig.baseURL}
        endpoint={deleteAPI.endpoint}
        method={deleteAPI.method}
        defaultParams={deleteAPI.parameters}
        defaultHeaders={deleteAPI.headers}
        defaultBody={deleteAPI.body}
      />
    );
  });
