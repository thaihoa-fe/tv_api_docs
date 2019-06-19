import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MenuItem from './MenuItem';
import Menu from './index';

const categories = [
  {
    text: 'Consent SMS',
    path: 'consent-sms',
  },
  {
    text: 'OTP consent',
    path: 'otp-consent',
    children: [
      {
        text: 'Login',
        path: 'login',
      },
      {
        text: 'Get Consent ID',
        path: 'get-consent-id',
        children: [
          {
            text: 'Get item 1',
            path: 'get-item-1',
          },
          {
            text: 'Get item 2',
            path: 'get-item-2',
          },
        ],
      },
      {
        text: 'Get Insight Credit',
        path: 'credit',
      },
    ],
  },
  {
    text: 'Contract SMS',
    path: 'contract-sms',
  },
];

storiesOf('Sidebar', module)
  .add('normal menu item', () => (
    <MenuItem text="Menu Item Without Icon" path="consent-sms" onClick={action('click')} />
  ))
  .add('has icon', () => (
    <MenuItem hasIcon text="Menu Item With Icon" path="consent-sms" onClick={action('click')} />
  ))
  .add('opening icon', () => (
    <MenuItem
      hasIcon
      isOpen
      text="Menu Item With Icon"
      path="consent-sms"
      onClick={action('click')}
    />
  ))
  .add('menu', () => <Menu onClick={action('click')} categories={categories} />);
