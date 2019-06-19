import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import LoginPanel from './LoginPanel';

storiesOf('LoginPanel', module).add('normal', () => <LoginPanel onSubmit={action('login')} />);
